"use strict";

module.exports = function(sequelize, DataTypes) {
    var Model = sequelize.define("evaluations", {
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

        est_benef_cibles: {
            type: DataTypes.BOOLEAN,
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
        timestamps: false,

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
                Model.belongsTo(models.Visit, { as: 'visit' });
            }
        }
    });

    return Model;
};
