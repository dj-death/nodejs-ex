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
				if (typeof value == 'object') {
					try {
						var coords = JSON.stringify(value);
						
						this.setDataValue('location', coords);
					} catch (e) {
						console.log(e);
					}
				}
  
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

        reference: {
            type: DataTypes.STRING,
            allowNull: true,

            searchable: true
        },

        annee: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
		
        programme: {
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

        commune_sans_intercom: {
            type: DataTypes.STRING,
            allowNull: true
        },
    
        consistance: {
            type: DataTypes.TEXT,
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

                // http://stackoverflow.com/a/37817966
                Model.addScope('nested', {
                    include: [{
                        model: models.Product,
                        as: 'product'
                    }, {
                        model: models.Project,
                        as: 'parent'
                    }]
                });
            }
        }
    });

    return Model;
};
