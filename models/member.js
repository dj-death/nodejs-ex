"use strict";

var errors = require('../utils/errors.js');

module.exports = function(sequelize, DataTypes) {
    var Model = sequelize.define("Member", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            validate: {
                isUUID: 4
            }
        },

        CIN: {
            type: DataTypes.STRING,
            allowNull: false,
            searchable: true,
            validate: {
                notEmpty: true
            }
        },

        firstname: {
            type: DataTypes.STRING,
            allowNull: true,
            searchable: true
        },

        lastname: {
            type: DataTypes.STRING,
            allowNull: true,
            searchable: true
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false,
            searchable: true,
            validate: {
                notEmpty: true
            }
        },

        occupation: {
            type: DataTypes.STRING,
            allowNull: true,
            searchable: true
        }
        
        
    }, {
        tableName: 'members',
        classMethods: {
            associate: function(models) {
                Model.belongsTo(models.Partner, { as: 'partner' , constraints: false });

                Model.addScope('nested', {
                    include: [
                        { model: models.Partner, as: 'partner' }
                    ]
                });
            }
        }
    });

    return Model;
};
