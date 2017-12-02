"use strict";

module.exports = function(sequelize, DataTypes) {
    var Model = sequelize.define("partners", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            validate: {
                isUUID: 4
            }
        },

        code: {
            type: DataTypes.STRING,
            allowNull: true,
            searchable: true,
            unique: {
                msg: 'Une organisation avec ce code existe déjà.'
            }
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            searchable: true,
            unique: {
                msg: 'Une organisation avec ce nom existe déjà.'
            },
            validate: {
                notEmpty: true
            }
        },

        president: {
            type: DataTypes.STRING,
            allowNull: true,
            searchable: true
        },

        commune: {
            type: DataTypes.STRING,
            allowNull: true
        },

        address: {
            type: DataTypes.STRING,
            allowNull: true
        },

        location: {
            type: DataTypes.TEXT,
            allowNull: true,
            get: function () {
                return JSON.parse(this.getDataValue('location'));
            },
            set: function (value) {
                return this.setDataValue('location', JSON.stringify(value));
            }
        },

        phone: {
            type: DataTypes.STRING,
            allowNull: true,
            searchable: true
        },

        email: {
            type: DataTypes.STRING,
            allowNull: true
        },

        website: {
            type: DataTypes.STRING,
            allowNull: true
        },

        date_creation: {
            type: DataTypes.DATE,
            allowNull: true,

            validate: {
                isDate: true 
            }
        },

        liste_membres: {
            type: DataTypes.STRING,
            allowNull: true
        },

        liste_membres_join: {
            type: DataTypes.TEXT,
            searchable: true,
            allowNull: true
        },

        parite: {
            type: DataTypes.STRING,
            allowNull: true
        },

        effectif: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        effectif_bureau: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        effectif_femmes_bureau: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        effectif_jeunes_bureau: {
            type: DataTypes.INTEGER,
            allowNull: true
        },


        domaine: {
            type: DataTypes.STRING,
            allowNull: true
        },

        est_rup: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        has_reseau: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        nom_reseau: {
            type: DataTypes.STRING,
            searchable: true,
            allowNull: true
        },

        nb_commissions: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        statut_juridique: {
            type: DataTypes.STRING,
            allowNull: true
        },

        champ_intervention: {
            type: DataTypes.STRING,
            allowNull: true
        },

        niveau_intervention: {
            type: DataTypes.STRING,
            allowNull: true
        },


        has_alternance_membres: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null
        },


        has_dossier_reglementaire: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null
        },

        does_respect_tenue_AG: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null
        },

        date_derniere_AG: {
            type: DataTypes.DATE,
            allowNull: true,

            validate: {
                isDate: true 
            }
        },


        has_cartes_adherants: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null
        },

        has_budgetisation: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null
        },

        has_elaboration_bilan: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null
        },

        has_certification_comptes: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null
        },

        has_audit: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null
        },

        has_accompagnement_formation: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null
        },


        has_qualite_systeme_gestion: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null
        },

        has_rapports: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null
        },

        has_disponibilite_moyens: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null
        },

        type_siege: {
            type: DataTypes.STRING,
            allowNull: true
        },
        

        has_autofinancement: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null
        },

        has_cotisations_adherants: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null
        },

        has_subventions_publiques: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null
        },

        has_dons_locaux: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null
        },


        has_dons_internationaux: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null
        },


        has_benevoles: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null
        },

        has_salaries_permanents: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null
        },

        has_salaries_occasionels: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null
        },

        comment: {
            type: DataTypes.TEXT,
            allowNull: true
        }

    },{
        classMethods: {
            associate: function(models) {
                Model.hasMany(models.Product, { as: 'products'});

                // http://stackoverflow.com/a/37817966
                Model.addScope('nested', {
                    attributes: {
                        include: [
                            [sequelize.literal('(SELECT COUNT(*) FROM Products WHERE Products.partner_id = Partner.id)'), 'productscount'],
                            [sequelize.literal('(SELECT COUNT(*) FROM Projects WHERE Projects.porteur = Partner.name)'), 'projectscount'],
                            [sequelize.literal('(SELECT COUNT(*) FROM Projects WHERE Projects.porteur = Partner.name AND Projects.statut = "Opérationnel")'), 'nb_projects_operationnels'],
                            [sequelize.literal('(SELECT COUNT(*) FROM Projects WHERE Projects.porteur = Partner.name AND Projects.en_cours = TRUE)'), 'nb_projects_encours'],
                            [sequelize.literal('(SELECT COUNT(*) FROM Projects WHERE Projects.porteur = Partner.name AND Projects.en_souffrance = TRUE)'), 'nb_projects_ensouffrance'],

                            [sequelize.literal('(SELECT SUM(part_INDH) FROM Projects WHERE Projects.porteur = Partner.name)'), 'INDH_contributions']
                        ]
                    },

                    include: [{
                        model: models.Product,
                        as: 'products',
                        include: [{
                            model: models.Project,
                            as: 'projects'
                        }]
                    }]
                });
            }
        }
    });

    return Model;
};
