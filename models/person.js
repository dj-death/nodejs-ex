"use strict";

var errors = require('../utils/errors.js');

module.exports = function(sequelize, DataTypes) {
    var Model = sequelize.define("people", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            validate: {
                isUUID: 4
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            searchable: true,
            unique: {
                msg: 'This email is already taken.'
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'This username is already taken.'
            },
            validate: {
                len: 6
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            searchable: true,
            validate: {
                notEmpty: true
            }
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            searchable: true,
            validate: {
                notEmpty: true
            }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true,
            searchable: true
        },

        programme: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        role: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 4,
            validate: {
                notEmpty: true
            }
        }
        
    }, {
        defaultScope: {
            attributes: {
                exclude: ['password']
            }
        },

        classMethods: {
            associate: function(models) {
                Model.hasMany(models.Action, { as: 'actions' });
                Model.hasMany(models.Visit, { as: 'visits' });

                Model.addScope('nested', {
                    attributes: {
                        exclude: ['password']
                    }
                });
            },

            lookup: function(identifier) {
                return this.findOne({
                    where: {
                        $or: [
                            { id: identifier },
                            { username: identifier },
                            { email: identifier }
                        ]
                    }
                }).then(function(row) {
                    if (!row) {
                        throw errors.generate('Unknown person with id/username/email: ' + identifier);
                    }

                    return row;
                });
            }
        }
    });

    return Model;
};
