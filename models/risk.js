"use strict";

module.exports = function(sequelize, DataTypes) {
    var Model = sequelize.define("risks", {
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

            validate: {
                notEmpty: true
            }
        },

        mtype: {
            type: DataTypes.STRING,
            allowNull: false,
            searchable: true,
            
            validate: {
                notEmpty: true
            }
        },

        parentId: {
            type: DataTypes.STRING,
            allowNull: true,
            searchable: true,
            
            validate: {
                notEmpty: true
            }
        }

    }, {
        classMethods: {
            associate: function(models) {
                Model.belongsToMany(models.Product, {through: models.RiskProducts, as: 'products'});

                // http://stackoverflow.com/a/37817966
                Model.addScope('nested', {
                    attributes: {
                        include: [
                            [sequelize.literal('(SELECT COUNT(*) FROM RiskProducts WHERE RiskProducts.risk_id = Risk.id)'), 'productscount']
                        ]
                    },
                    include: [{
                        model: models.Product,
                        as: 'products'
                    }]
                });
            }
        }
    });

    return Model;
};
