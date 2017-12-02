"use strict";

module.exports = function(sequelize, DataTypes) {
    var Model = sequelize.define("predicts", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            validate: {
                isUUID: 4
            }
        },

        category: {
            type: DataTypes.STRING,
            allowNull: true
        },

        sentence: {
            type: DataTypes.STRING,
            allowNull: false,

            validate: {
                notEmpty: true
            }
        },

        predict: {
            type: DataTypes.STRING,
            allowNull: true
        }

    }, {
        classMethods: {

        }
    });

    return Model;
};
