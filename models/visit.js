"use strict";

module.exports = function(sequelize, DataTypes) {
    var Model = sequelize.define("Visit", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            validate: {
                isUUID: 4
            }
        },

        meta: {
            type: DataTypes.TEXT,
            searchable: true,
            allowNull: true
        },


        calendarId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        motive: {
            type: DataTypes.STRING,
            allowNull: true
        },

        quartier_douar: {
            type: DataTypes.STRING,
            allowNull: true,
            searchable: true
        },

        visitedSites: {
            type: DataTypes.STRING,
            allowNull: true,
            searchable: true
        },

        metPeople: {
            type: DataTypes.STRING,
            allowNull: true,
            searchable: true
        },

        observations: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        status: {
            type: DataTypes.INTEGER,
            defaultValue: 2, 
            allowNull: false
        },

        title: {
            type: DataTypes.STRING,
            allowNull: true
        },

        description: {
            type: DataTypes.STRING,
            allowNull: true
        },

        startDate: {
            type: DataTypes.DATE,
            allowNull: false,

            validate: {
                isDate: true 
            }
        },

        endDate: {
            type: DataTypes.DATE,
            allowNull: false,

            validate: {
                isDate: true 
            }
        },

        allDay: {
            type: DataTypes.BOOLEAN, 
            allowNull: true
        },


        is_done: {
            type: DataTypes.BOOLEAN, 
            defaultValue: false
        },

        has_report: {
            type: DataTypes.BOOLEAN, 
            defaultValue: false
        },

        has_notes: {
            type: DataTypes.BOOLEAN, 
            defaultValue: false
        },

        has_PV: {
            type: DataTypes.BOOLEAN, 
            defaultValue: false
        },

        risks_list: {
            type: DataTypes.TEXT,
            allowNull: true,
            get: function () {
                return JSON.parse(this.getDataValue('risks_list'));
            },
            set: function (value) {
                return this.setDataValue('risks_list', JSON.stringify(value));
            }

        },

        situation_realisations: {
            type: DataTypes.STRING,
            allowNull: true
        },

        capacite_accueil: {
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

        est_eligible: {
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
        
        etat_capacite_accueil: {
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
            type: DataTypes.DECIMAL,
            allowNull: true
        },

        comment_tarif: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        
        taux_utilisation: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        
        age: {
            type: DataTypes.DECIMAL,
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
            type: DataTypes.DECIMAL,
            allowNull: true
        },

        CA_reel: {
            type: DataTypes.DECIMAL,
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
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        tx_efficacite: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        tx_efficience: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        tx_durabilite: {
            type: DataTypes.DECIMAL,
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
        }


    }, {
		
		freezeTableName: true,
		tableName: 'visits',
		
        classMethods: {
            associate: function(models) {
                Model.belongsTo(models.Mission, { as: 'mission', constraints: false });
                Model.belongsTo(models.Person, { as: 'assignee' , constraints: false });
                Model.belongsTo(models.Person, { as: 'modifiedBy', constraints: false });
                Model.belongsTo(models.Product, { as: 'product'});

                Model.addScope('nested', {
                    attributes: {
                        include: [
                            [sequelize.literal('(SELECT COUNT(*) FROM recommandations WHERE recommandations.visit_id = Visit.id)'), 'recommandationscount'],
                            [sequelize.literal('(SELECT COUNT(*) FROM projects WHERE projects.est_sousprojet = FALSE AND projects.product_id = (SELECT products.id FROM products WHERE products.id = Visit.product_id))'), 'projectscount']
                        ]
                    },

                    include: [
                        { model: models.Person, as: 'assignee' },
                        { model: models.Person, as: 'modifiedBy' },
                        { model: models.Mission, as: 'mission' },
                        {
                            model: models.Product,
                            as: 'product',

                            attributes: {
                                include: [[sequelize.literal('(SELECT COUNT(*) FROM projects WHERE projects.est_sousprojet = FALSE AND projects.product_id = product.id)'), 'projectscount']]
                            },

                            include: [{
                                model: models.Project,
                                as: 'projects'
                            }]
                        }
                    ]
                });
            }
        }
    });

    return Model;
};
