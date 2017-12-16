"use strict";

var models = require("../models");
var sequelize = models.sequelize;
var Promise = sequelize.Promise;

function pick(items, index) {
    var count = items.length;
    if (index === undefined) {
        index = Math.floor(Math.random() * count);
    }

    return items[index % count];
}

module.exports = {
    sync: function() {
        console.info('create not existed tables...');

        return sequelize.transaction(function(t) {
            return sequelize.sync({ force: false, transaction: t })
        }).then(function () {
            console.info('Table creation: DONE');
        });
    
    },

    reset: function() {
        console.info('Populating database with example data...');
        return sequelize.transaction(function(t) {
            return sequelize.sync({ force: true, transaction: t }).then(function () {
                return Promise.all([
                    /*models.Action.destroy({ truncate: true, transaction: t }),
                    models.Person.destroy({ truncate: true, transaction: t })*/
                ]);
            }).then(function() {
                return Promise.all([
                    models.Predict.bulkCreate(require('../data/Predicts.json'), { transaction: t }),

                    //models.Project.bulkCreate(require('../data/Projects.json'), { transaction: t }),
                    //models.Product.bulkCreate(require('../data/Products.json'), { transaction: t }),
                    //models.Partner.bulkCreate(require('../data/Partners.json'), { transaction: t }),
                    //models.Risk.bulkCreate(require('../data/Risks.json'), { transaction: t }),

                    Promise.map(require('../data/People.json'), function(data) {
                        return models.Person.create(data, { include: [{ model: models.Action, as: 'actions' }], transaction: t });
                    })
                ])
            });
        }).then(function() {
            return sequelize.transaction(function(t) {
                return Promise.all([
                    models.Action.findAll(),
                    models.Person.findAll(),
                    //models.Project.findAll(),
                    //models.Product.findAll(),
                    //models.Partner.findAll(),
                    //models.Risk.findAll()
                ]).spread(function(actions, persons, projects, products, partners, risks) {
                    return Promise.all([
                        // associate Action -> Person (recipient)
                        Promise.map(actions, function(action) {
                            return action.setRecipient(pick(persons), { transaction: t });
                        }),

                        /*Promise.map(projects, function(project) {
                            return projects.setProduct(pick(products), { transaction: t });
                        })*/
                    ])
                });
            });
        }).then(function() {
            console.info('Populating database: DONE');
        })
    }
};
