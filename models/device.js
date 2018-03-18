"use strict";

module.exports = function(sequelize, DataTypes) {
    var Model = sequelize.define("Device", {
        deviceId: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },

        platform: {
            type: DataTypes.STRING,
            allowNull: false
        }

    }, {
        classMethods: {
            associate: function(models) {

            }
        }
    });

    return Model;
};
