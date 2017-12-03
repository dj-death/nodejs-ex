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
		freezeTableName: true,
		tableName: 'missions',
		
        classMethods: {
            associate: function(models) {
                // http://stackoverflow.com/a/37817966
                Model.addScope('nested', {
                    attributes: {
                        include: [
                            [sequelize.literal('(SELECT COUNT(*) FROM Visits WHERE Visits.mission_id = Mission.id)'), 'visitscount'],
                            [sequelize.literal('(SELECT COUNT(*) FROM Projects WHERE Projects.est_sousprojet = FALSE AND Projects.product_id IN (SELECT Products.id FROM Products WHERE Products.id IN (SELECT Visits.product_id FROM Visits WHERE Visits.mission_id = Mission.id )))'), 'projectscount']
                        ]
                    }
                 });
            }
        }
    });

    return Model;
};
