"use strict";

module.exports = function(sequelize, DataTypes) {
    var Model = sequelize.define("Indicator", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            validate: {
                isUUID: 4
            }
        },

        has_convention_exploitation_maintenance: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        has_avis_services_techniques: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        has_convention_clause_perennite: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        duree_clause_perennite: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        has_competence_commune: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        competence_commune_comment: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        has_gestion_deleguee_installations: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        has_contractualisation_MOA_gestionnaire: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        est_conforme_CPS: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        has_convention_assistance_marche: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
        
    },{
        classMethods: {
            associate: function(models) {
                Model.belongsTo(models.Project, { as: 'project', constraints: true });

                /*Model.addScope('nested', {
                    include: [
                        { model: models.Project, as: 'project' }
                    ]
                });*/
            }
        }
    });

    return Model;
};