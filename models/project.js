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

        /*numero: {
            type: DataTypes.STRING,
            allowNull: true
        },*/

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
            type: DataTypes.INTEGER,
            allowNull: true
        },

        reference: {
            type: DataTypes.STRING,
            allowNull: true,

            searchable: true
        },

        phase_INDH: {
            type: DataTypes.INTEGER,
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
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },

        part_INDH: {
            type: DataTypes.DECIMAL(5, 2),
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

        date_visite_royale: {
            type: DataTypes.DATE,
            allowNull: true,

            validate: {
                isDate: true 
            }
        },

        objet_visite_royale: {
            type: DataTypes.STRING,
            allowNull: true
        },

        date_ouverture_plis: {
            type: DataTypes.DATE,
            allowNull: true,

            validate: {
                isDate: true 
            }
        },

        date_implantation: {
            type: DataTypes.DATE,
            allowNull: true,

            validate: {
                isDate: true 
            }
        },

        date_arret_travaux: {
            type: DataTypes.DATE,
            allowNull: true,

            validate: {
                isDate: true 
            }
        },

        date_reprise_travaux: {
            type: DataTypes.DATE,
            allowNull: true,

            validate: {
                isDate: true 
            }
        },

        date_reception_provisoire: {
            type: DataTypes.DATE,
            allowNull: true,

            validate: {
                isDate: true 
            }
        },

        date_reception_definitive: {
            type: DataTypes.DATE,
            allowNull: true,

            validate: {
                isDate: true 
            }
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
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },

        montant_emis: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },

        tx_avancement_physique: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true
        },

        tx_avancement_financier: {
            type: DataTypes.DECIMAL(5, 2),
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
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },

        contribution_porteur: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },

        

        contribution_beneficiaires: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },

        part_indh_percent: {
            type: DataTypes.DECIMAL(5, 2),
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
            type: DataTypes.DECIMAL(10, 2),
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
                var imgs = this.getDataValue('images');
                return typeof imgs === 'object' ? JSON.parse(imgs) : [];
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
            allowNull: true
        },

        est_eligible: {
            type: DataTypes.BOOLEAN,
            allowNull: true
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
        },

        situation_realisations: {
            type: DataTypes.STRING,
            allowNull: true
        },

        
        has_benef_cibles: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        comment_benefs: {
            type: DataTypes.STRING,
            allowNull: true
        },
        
        est_fonctionnel: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        
        has_maintenance: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        has_visibilite: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
    
        has_etudes: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        has_assiette_fonciere_apuree: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        
        has_respect_circuit_approbation: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        
        has_usage_grille_notation: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        
        has_avis_service_technique: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        
        has_respect_montage_initial: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        type_centre: {
            type: DataTypes.STRING,
            allowNull: true
        },
        
        etat_batiment: {
            type: DataTypes.STRING,
            allowNull: true
        },
        etat_etancheite: {
            type: DataTypes.STRING,
            allowNull: true
        },
        etat_plomberie: {
            type: DataTypes.STRING,
            allowNull: true
        },
        etat_equipements: {
            type: DataTypes.STRING,
            allowNull: true
        },
        qualite_hygiene: {
            type: DataTypes.STRING,
            allowNull: true
        },
        securite_centre: {
            type: DataTypes.STRING,
            allowNull: true
        },
        etat_plomberie: {
            type: DataTypes.STRING,
            allowNull: true
        },

        etat_personnel_encadrement: {
            type: DataTypes.STRING,
            allowNull: true
        },

        effectif_encadrement: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        ressources_financieres: {
            type: DataTypes.STRING,
            allowNull: true
        },
        
        has_eau: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        has_electricite: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        has_assainissement: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        has_accessibilite: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        has_registre_beneficiaires: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        has_espaces_repos: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        
        etat_installation: {
            type: DataTypes.STRING,
            allowNull: true
        },

        qualite_travaux: {
            type: DataTypes.STRING,
            allowNull: true
        },

        has_mesures_maintenance: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        desserte: {
            type: DataTypes.STRING,
            allowNull: true
        },
        
        etat_vehicule: {
            type: DataTypes.STRING,
            allowNull: true
        },

        has_carnet_bord: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        has_registre_evacuation: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        has_police_assurance: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        
        etat_materiels: {
            type: DataTypes.STRING,
            allowNull: true
        },

        utilisation_equipements: {
            type: DataTypes.STRING,
            allowNull: true
        },
        
        qualite_prestations: {
            type: DataTypes.STRING,
            allowNull: true
        },

        tarification: {
            type: DataTypes.STRING,
            allowNull: true
        },

        tarif: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true
        },

        comment_tarif: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        
        taux_utilisation: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true
        },
        
        age: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true
        },

        est_viable: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        has_revenus: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        has_maintien_benefs_initiaux: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        
        CA_prevu: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },

        CA_reel: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },

        explication_ecart_CA: {
            type: DataTypes.STRING,
            allowNull: true
        },
        
        difficultes_rencontrees: {
            type: DataTypes.STRING,
            allowNull: true
        },
        
        /*emplois_permanents_total: {
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
        },*/
        
        has_accompagnement: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        
        est_satisfait: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        degre_satisfaction: {
            type: DataTypes.STRING,
            allowNull: true
        },
        
        problemes_projet: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        problemes_porteur: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        
        tx_pertinence: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true
        },

        tx_efficacite: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true
        },
        tx_efficience: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true
        },
        tx_durabilite: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true
        },


        durabilite_q1_renforcement_capacites: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        durabilite_q2_role_DAS_renforcement_capacites: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        durabilite_q3_possibilite_paiement: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        durabilite_q4_mesures_financieres_continuite: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        durabilite_q5_impact_culture: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        durabilite_q6_mesures_environementales: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        durabilite_q7_mesures_renforcement_role_femmes: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

       
        efficacite_q1_progres_accomplis: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        efficacite_q2_qualite: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        efficacite_q3_resultats_continus: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        efficacite_q4_favorise_actions_partenaires: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        efficacite_q5_appreciation_benefs: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },


        efficience_q1_modalites_meo_propices: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        efficience_q2_gestion_efficace: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        efficience_q3_ressources_appropriees: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        efficience_q4_respect_quotesparts: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        efficience_q5_disponibilite_ressources: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        efficience_q6_retards_importants: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        efficience_q7_revisions_plan: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        efficience_q7_1_revisions_plan_efficaces: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        efficience_q8_economie_realisations: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        efficience_q9_suivi_adequat: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        pertinence_q1_besoins: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        pertinence_q2_approprie_porteur: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        pertinence_q3_engagement: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        pertinence_q4_coordination: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        pertinence_q5_complementarite: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        pertinence_q6_adaptabilite: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        pertinence_q7_definition_kpi: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        pertinence_q8_disponibilite_infos: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        pertinence_q9_genderisation_kpi: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        pertinence_q10_valeurs_references: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        pertinence_q11_valeurs_cibles: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        porteur_ajuste: {
            type: DataTypes.STRING,
            allowNull: true
        },

        MOA_ajuste: {
            type: DataTypes.STRING,
            allowNull: true
        }
        

    }, {
        timestamps: false,

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
                    attributes: {
                        include: [
                            [sequelize.literal('(SELECT COUNT(*) FROM projects WHERE projects.porteur_ajuste = Project.porteur_ajuste)'), 'porteur_projectscount'],
                            [sequelize.literal('(SELECT COUNT(*) FROM projects WHERE projects.porteur_ajuste = Project.porteur_ajuste AND projects.statut = "Opérationnel")'), 'porteur_projectscount_operationnels'],
                            [sequelize.literal('(SELECT COUNT(*) FROM projects WHERE projects.porteur_ajuste = Project.porteur_ajuste AND projects.en_cours = TRUE)'), 'porteur_projectscount_encours'],
                            [sequelize.literal('(SELECT COUNT(*) FROM projects WHERE projects.porteur_ajuste = Project.porteur_ajuste AND projects.en_souffrance = TRUE)'), 'porteur_projectscount_ensouffrance'],

                            [sequelize.literal('(SELECT SUM(part_INDH) FROM projects WHERE projects.porteur_ajuste = Project.porteur_ajuste)'), 'porteur_INDH_contributions'],
                            [sequelize.literal('(SELECT GROUP_CONCAT(annee ORDER BY id ASC SEPARATOR " | ")  FROM projects WHERE projects.porteur_ajuste = Project.porteur_ajuste)'), 'porteur_annees_projets'],
                            [sequelize.literal('(SELECT GROUP_CONCAT(statut ORDER BY id ASC SEPARATOR " | ")  FROM projects WHERE projects.porteur_ajuste = Project.porteur_ajuste)'), 'porteur_statuts_projets']
                        ]
                    },

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
