"use strict";

module.exports = function(sequelize, DataTypes) {
    var Model = sequelize.define("Mission", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            validate: {
                isUUID: 4
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            searchable: true,
            unique: {
                msg: 'Une mission avec ce nom existe déjà',
            },
            validate: {
                notEmpty: true
            }
        },

        motive: {
            type: DataTypes.STRING,
            allowNull: true,
            searchable: true
        },

        start_date: {
            type: DataTypes.DATE,
            allowNull: false,

            validate: {
                isDate: true 
            }
        },

        end_date: {
            type: DataTypes.DATE,
            allowNull: false,

            validate: {
                isDate: true 
            }
        },

        status: {
            type: DataTypes.INTEGER,
            defaultValue: 2, 
            allowNull: false
        }

    },{
        tableName: 'missions',
        classMethods: {
            associate: function(models) {
                // http://stackoverflow.com/a/37817966
                Model.addScope('nested', {
                    attributes: {
                        include: [
                            [sequelize.literal('(SELECT COUNT(*) FROM visits WHERE visits.mission_id = Mission.id)'), 'visitscount'],
                            [sequelize.literal('(SELECT COUNT(*) FROM projects WHERE projects.est_sousprojet = FALSE AND projects.product_id IN (SELECT products.id FROM Products WHERE products.id IN (SELECT visits.product_id FROM visits WHERE visits.mission_id = Mission.id )))'), 'projectscount']
                        ]
                    }
                 });
            }
        }
    });

    return Model;
};
