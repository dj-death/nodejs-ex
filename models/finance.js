"use strict";

module.exports = function(sequelize, DataTypes) {
    var Model = sequelize.define("Finance", {
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

        frais_personnel: {
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
		freezeTableName: true,
		tableName: 'finances',
		
        classMethods: {
            associate: function(models) {
                Model.belongsTo(models.Partner, { as: 'partner' });

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
