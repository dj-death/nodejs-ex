"use strict";

module.exports = function(sequelize, DataTypes) {
    var Model = sequelize.define("productfinances", {
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

        CA_prevu: {
            type: DataTypes.DECIMAL(13, 4),
            allowNull: true
        },

        CA_reel: {
            type: DataTypes.DECIMAL(13, 4),
            allowNull: true
        },

        resultat_net_reel: {
            type: DataTypes.DECIMAL(13, 4),
            allowNull: true
        },

        resultat_net_prevu: {
            type: DataTypes.DECIMAL(13, 4),
            allowNull: true
        },

        BFR: {
            type: DataTypes.DECIMAL(13, 4),
            allowNull: true
        },

        capitaux_propres: {
            type: DataTypes.DECIMAL(13, 4),
            allowNull: true
        },

        dettes_MLT: {
            type: DataTypes.DECIMAL(13, 4),
            allowNull: true
        },

        dettes_CT: {
            type: DataTypes.DECIMAL(13, 4),
            allowNull: true
        },

        immobilisations: {
            type: DataTypes.DECIMAL(13, 4),
            allowNull: true
        },

        creances: {
            type: DataTypes.DECIMAL(13, 4),
            allowNull: true
        },

        stocks: {
            type: DataTypes.DECIMAL(13, 4),
            allowNull: true
        },

        tresorerie: {
            type: DataTypes.DECIMAL(13, 4),
            allowNull: true
        },

        total_subventions: {
            type: DataTypes.DECIMAL(13, 4),
            allowNull: true
        },

        loyer: {
            type: DataTypes.DECIMAL(13, 4),
            allowNull: true
        },

        total_depenses: {
            type: DataTypes.DECIMAL(13, 4),
            allowNull: true
        },

        total_recettes: {
            type: DataTypes.DECIMAL(13, 4),
            allowNull: true
        },

        solde: {
            type: DataTypes.DECIMAL(13, 4),
            allowNull: true
        }

    },{
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
