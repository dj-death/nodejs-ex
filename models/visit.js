"use strict";

module.exports = function(sequelize, DataTypes) {
    var Model = sequelize.define("visits", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            validate: {
                isUUID: 4
            }
        },

        meta: {
            type: DataTypes.TEXT,
            searchable: true,
            allowNull: true
        },


        calendarId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        motive: {
            type: DataTypes.STRING,
            allowNull: true
        },

        quartier_douar: {
            type: DataTypes.STRING,
            allowNull: true,
            searchable: true
        },

        visitedSites: {
            type: DataTypes.STRING,
            allowNull: true,
            searchable: true
        },

        metPeople: {
            type: DataTypes.STRING,
            allowNull: true,
            searchable: true
        },

        observations: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        status: {
            type: DataTypes.INTEGER,
            defaultValue: 2, 
            allowNull: false
        },

        title: {
            type: DataTypes.STRING,
            allowNull: true
        },

        description: {
            type: DataTypes.STRING,
            allowNull: true
        },

        startDate: {
            type: DataTypes.DATE,
            allowNull: false,

            validate: {
                isDate: true 
            }
        },

        endDate: {
            type: DataTypes.DATE,
            allowNull: false,

            validate: {
                isDate: true 
            }
        },

        allDay: {
            type: DataTypes.BOOLEAN, 
            allowNull: true
        },


        is_done: {
            type: DataTypes.BOOLEAN, 
            defaultValue: false
        },

        has_report: {
            type: DataTypes.BOOLEAN, 
            defaultValue: false
        },

        has_notes: {
            type: DataTypes.BOOLEAN, 
            defaultValue: false
        },

        has_PV: {
            type: DataTypes.BOOLEAN, 
            defaultValue: false
        },

        risks_list: {
            type: DataTypes.TEXT,
            allowNull: true,
            get: function () {
                return JSON.parse(this.getDataValue('risks_list'));
            },
            set: function (value) {
                return this.setDataValue('risks_list', JSON.stringify(value));
            }

        }


    }, {
        classMethods: {
            associate: function(models) {
                Model.belongsTo(models.Mission, { as: 'mission', constraints: false });
                Model.belongsTo(models.Person, { as: 'assignee' , constraints: false });
                Model.belongsTo(models.Person, { as: 'modifiedBy', constraints: false });
                Model.belongsTo(models.Product, { as: 'product'});

                Model.addScope('nested', {
                    attributes: {
                        include: [
                            [sequelize.literal('(SELECT COUNT(*) FROM Recommandations WHERE Recommandations.visit_id = Visit.id)'), 'recommandationscount'],
                            [sequelize.literal('(SELECT COUNT(*) FROM Projects WHERE Projects.est_sousprojet = FALSE AND Projects.product_id = (SELECT Products.id FROM Products WHERE Products.id = Visit.product_id))'), 'projectscount']
                        ]
                    },

                    include: [
                        { model: models.Person, as: 'assignee' },
                        { model: models.Person, as: 'modifiedBy' },
                        { model: models.Mission, as: 'mission' },
                        {
                            model: models.Product,
                            as: 'product',

                            attributes: {
                                include: [[sequelize.literal('(SELECT COUNT(*) FROM Projects WHERE Projects.est_sousprojet = FALSE AND Projects.product_id = Product.id)'), 'projectscount']]
                            },

                            include: [{
                                model: models.Project,
                                as: 'projects'
                            }]
                        }
                    ]
                });
            }
        }
    });

    return Model;
};
