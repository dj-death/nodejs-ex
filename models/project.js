"use strict";

module.exports = function(sequelize, DataTypes) {
    var Model = sequelize.define("Project", {
        id: {
            type: DataTypes.INTEGER, //DataTypes.UUID,
            //defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            /*validate: {
                isUUID: 4
            }*/

            searchable: true
        },

        code_projet_pere: {
            type: DataTypes.STRING,
            allowNull: true
        },

        // sous-projet
        parent_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        numero: {
            type: DataTypes.STRING,
            allowNull: true
        },

        commune: {
            type: DataTypes.STRING,
            allowNull: true
        },

        quartier_douar: {
            type: DataTypes.STRING,
            allowNull: true
        },

        localisation: {
            type: DataTypes.STRING,
            allowNull: true
        },

        nature_commune: {
            type: DataTypes.STRING,
            allowNull: true
        },

        reference: {
            type: DataTypes.STRING,
            allowNull: true,

            searchable: true
        },

        phase_INDH: {
            type: DataTypes.STRING,
            allowNull: true
        },

        exercice: {
            type: DataTypes.STRING,
            allowNull: true
        },

        annee: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        origine: {
            type: DataTypes.STRING,
            allowNull: true
        },

        programme: {
            type: DataTypes.STRING,
            allowNull: true
        },
    
        rubrique: {
            type: DataTypes.STRING,
            allowNull: true
        },

        intitule: {
            type: DataTypes.STRING,
            allowNull: true,

            searchable: true
        },

        montant_global: {
            type: DataTypes.DECIMAL(13, 4),
            allowNull: true
        },

        part_INDH: {
            type: DataTypes.DECIMAL(13, 4),
            allowNull: true
        },

        est_projet: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        est_sousprojet: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        est_AGR: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        type_AGR: {
            type: DataTypes.STRING,
            allowNull: true
        },

        rubrique_AGR: {
            type: DataTypes.STRING,
            allowNull: true
        },

        est_PCD: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        est_EPS: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        est_infrastructure: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        date_lancement: {
            type: DataTypes.DATE,
            allowNull: true,

            validate: {
                isDate: true 
            }
        },

        duree_projet: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        type_MOA: {
            type: DataTypes.STRING,
            allowNull: true
        },

        MOA: {
            type: DataTypes.STRING,
            allowNull: true
        },

        MOA_deleg: {
            type: DataTypes.STRING,
            allowNull: true
        },

        coop_internationale: {
            type: DataTypes.STRING,
            allowNull: true
        },

        montant_engage: {
            type: DataTypes.DECIMAL(13, 4),
            allowNull: true
        },

        montant_emis: {
            type: DataTypes.DECIMAL(13, 4),
            allowNull: true
        },

        tx_avancement_physique: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },

        tx_avancement_financier: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },

        statut: {
            type: DataTypes.STRING,
            allowNull: true
        },

        observation_statut: {
            type: DataTypes.STRING,
            allowNull: true
        },

        en_cours: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },

        en_souffrance: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },

        motif_souffrance: {
            type: DataTypes.STRING,
            allowNull: true
        },

        mesures_relance: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        responsable_relance: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        planning_relance: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        porteur: {
            type: DataTypes.STRING,
            allowNull: true,

            searchable: true
        },

        type_porteur: {
            type: DataTypes.STRING,
            allowNull: true
        },

        classe_porteur: {
            type: DataTypes.STRING,
            allowNull: true
        },

        nature_contribution_porteur: {
            type: DataTypes.TEXT,
            allowNull: true
        },


        /*

        theme_formation: {
            type: DataTypes.STRING,
            allowNull: true
        },
        
        theme_communication: {
            type: DataTypes.STRING,
            allowNull: true
        },*/

        service_technique: {
            type: DataTypes.STRING,
            allowNull: true
        },

        capacite_accueil: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        secteur_activite: {
            type: DataTypes.STRING,
            allowNull: true
        },

        secteur_activite_principal: {
            type: DataTypes.STRING,
            allowNull: true
        },

        categorie: {
            type: DataTypes.STRING,
            allowNull: true
        },

        appreciation_CPDH: {
            type: DataTypes.STRING,
            allowNull: true
        },

        date_reunion_CPDH: {
            type: DataTypes.DATE,
            allowNull: true,

            validate: {
                isDate: true 
            }
        },

        validation_reunion_CPDH: {
            type: DataTypes.STRING,
            allowNull: true
        },

        /*
        nombre_projet_action: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        nombre_projet: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        nombre_action: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        nombre_projet1: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        nombre_action1: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        nombre_unite: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        nombre_projet2: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        nombre_action2: {
            type: DataTypes.INTEGER,
            allowNull: true
        },*/

        type: {
            type: DataTypes.STRING,
            allowNull: true
        },


        objectifs: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        date_emission: {
            type: DataTypes.DATE,
            allowNull: true,

            validate: {
                isDate: true 
            }
        },


        classe_partenaire: {
            type: DataTypes.STRING,
            allowNull: true
        },

        participation_partenaires: {
            type: DataTypes.DECIMAL(13, 4),
            allowNull: true
        },

        contribution_porteur: {
            type: DataTypes.DECIMAL(13, 4),
            allowNull: true
        },

        

        contribution_beneficiaires: {
            type: DataTypes.DECIMAL(13, 4),
            allowNull: true
        },

        part_indh_percent: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },

        date_achevement_probable: {
            type: DataTypes.DATE,
            allowNull: true,

            validate: {
                isDate: true 
            }
        },

        date_achevement: {
            type: DataTypes.DATE,
            allowNull: true,

            validate: {
                isDate: true 
            }
        },

        date_appel_a_projet: {
            type: DataTypes.DATE,
            allowNull: true,

            validate: {
                isDate: true 
            }
        },

        assoc_gestionnaire: {
            type: DataTypes.STRING,
            allowNull: true,

            searchable: true
        },

        activites_assoc_gestionnaire: {
            type: DataTypes.STRING,
            allowNull: true
        },

        est_porteur_gestionnaire: {
            type: DataTypes.STRING,
            allowNull: true
        },

        commune_sans_intercom: {
            type: DataTypes.STRING,
            allowNull: true
        },
    
        consistance: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        activites: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        categories_beneficiaires: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        // word file location
        convention: {
            type: DataTypes.STRING,
            allowNull: true
        },

        convention_no: {
            type: DataTypes.STRING,
            allowNull: true
        },

        convention_montant: {
            type: DataTypes.DECIMAL(13, 4),
            allowNull: true
        },


        date_convention: {
            type: DataTypes.DATE,
            allowNull: true,

            validate: {
                isDate: true 
            }
        },

        date_validation_convention: {
            type: DataTypes.DATE,
            allowNull: true,

            validate: {
                isDate: true 
            }
        },

        date_execution: {
            type: DataTypes.DATE,
            allowNull: true,

            validate: {
                isDate: true 
            }
        },

        
        
        images: {
            type: DataTypes.TEXT,
            allowNull: true,
            get: function () {
                return JSON.parse(this.getDataValue('images'));
            },
            set: function (value) {
                return this.setDataValue('images', JSON.stringify(value));
            }
        },

        comment: {
            type: DataTypes.TEXT,
            allowNull: true
        },



        emplois_permanents_total: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        emplois_permanents_homme: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        emplois_permanents_femme: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        emplois_permanents_jeune: {
            type: DataTypes.INTEGER,
            allowNull: true
        },


        emplois_occasionnels_total: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        emplois_occasionnels_homme: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        emplois_occasionnels_femme: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        emplois_occasionnels_jeune: {
            type: DataTypes.INTEGER,
            allowNull: true
        },


        pop_benef_total_prevu: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        pop_benef_homme_prevu: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        pop_benef_femme_prevu: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        pop_benef_jeune_prevu: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        pop_benef_menage_prevu: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        pop_benef_total_reel: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        pop_benef_homme_reel: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        pop_benef_femme_reel: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        pop_benef_jeune_reel: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        est_issu_DP: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        est_valide: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true
        },

        est_eligible: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true
        },

        est_en_activite: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        has_problemes_fonctionnement: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        problemes_fonctionnement: {
            type: DataTypes.STRING,
            allowNull: true
        }

        

        

    }, {
        timestamps: false,
		
		freezeTableName: true,
		tableName: 'projects',

        hooks: {
			afterUpdate: function (instance, options) {
				var result = [],
					changed = instance.changed(),
					i = 0, len = changed.length, key;
				
				for (; i < len; i++) {
					key = changed[i];
					
					result.push({
						property: key,
						previous: instance.previous(key),
						current: instance.get(key)
					});
				}
				
				instance.modifiedFields = result;
				
				return true;
			}
		},

        classMethods: {
            associate: function(models) {
                Model.belongsTo(models.Product, { as: 'product', constraints: false });
                Model.belongsTo(models.Project, { as: 'parent', constraints: false });

                Model.hasOne(models.Impact, { as: 'impact'});
                Model.hasOne(models.Indicator, { as: 'indicator'});

                Model.hasMany(models.Prestation, { as: 'prestations'});
                Model.hasMany(models.Beneficiaire, { as: 'beneficiaires'});
                Model.hasMany(models.Contribution, { as: 'contributions'});

                // http://stackoverflow.com/a/37817966
                Model.addScope('nested', {
                    include: [{
                        model: models.Product,
                        as: 'product'
                    }, {
                        model: models.Project,
                        as: 'parent'
                    }, {
                        model: models.Impact,
                        as: 'impact'
                    }, {
                        model: models.Indicator,
                        as: 'indicator'
                    }, {
                        model: models.Prestation,
                        as: 'prestations'
                    }, {
                        model: models.Beneficiaire,
                        as: 'beneficiaires'
                    }, {
                        model: models.Contribution,
                        as: 'contributions'
                    }]
                });
            }
        }
    });

    return Model;
};
