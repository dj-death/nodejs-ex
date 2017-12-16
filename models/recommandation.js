"use strict";


module.exports = function(sequelize, DataTypes) {
    var Model = sequelize.define("Recommandation", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            validate: {
                isUUID: 4
            }
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false,
            searchable: true,

            validate: {
                notEmpty: true
            }
        },

        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            searchable: true,

            validate: {
                notEmpty: true,
                len: 6
            }
        },

        note: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        // le destinataire
        destination: {
            type: DataTypes.STRING,
            allowNull: true,
            searchable: true,

            validate: {
                notEmpty: true
            }
        },

        importance: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },


        urgency: {
            type: DataTypes.STRING,
            allowNull: true,

            validate: {
                notEmpty: true
            }
        },

        done: {
            type: DataTypes.BOOLEAN, 
            defaultValue: false
        }


    }, {
        tableName: 'recommandations',
        
        classMethods: {
            associate: function(models) {
                Model.belongsTo(models.Visit, { as: 'visit' });

                Model.addScope('nested', {
                    include: [
                        { model: models.Visit, as: 'visit' }
                    ]
                });
            }
        }
    });

    return Model;
};
