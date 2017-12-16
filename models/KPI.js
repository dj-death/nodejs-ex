"use strict";

module.exports = function(sequelize, DataTypes) {
    var Model = sequelize.define("KPI", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            validate: {
                isUUID: 4
            }
        },

        exercice: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        value: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },

        target: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },

        source: {
            type: DataTypes.STRING,
            allowNull: true
        },

        comment: {
            type: DataTypes.TEXT,
            allowNull: true
        }

        
    },{
        tableName: 'kpis',
        classMethods: {
            associate: function(models) {
                Model.belongsTo(models.Product, { as: 'product' });

                Model.addScope('nested', {
                    include: [
                        { model: models.Product, as: 'product' }
                    ]
                });
            }
        }
    });

    return Model;
};
