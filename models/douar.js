"use strict";

module.exports = function(sequelize, DataTypes) {
    var Model = sequelize.define("Douar", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            validate: {
                isUUID: 4
            }
        },

        nom_fr: {
            type: DataTypes.STRING,
            allowNull: false,
            searchable: true
        },
       
       
        nom_ar: {
            type: DataTypes.STRING,
            allowNull: true,
            searchable: true
        },
       
        type: {
            type: DataTypes.STRING,
            allowNull: true
        },
       
        est_collectivite_trad: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        nom_collectivite_trad: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
       
        population: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        population_jeune: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        tx_analphabetisme: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true
        },
       
        type_habitat: {
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
       
        distance_centre: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true
        },

        distance_universite: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true
        },
       
        has_potentiel_agriculture: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        has_potentiel_elevage: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        has_potentiel_commerce: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
       
        has_potentiel_artisanat: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        has_potentiel_autre: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
       
        mode_access_route: {
            type: DataTypes.STRING,
            allowNull: true
        },

        mode_access_electricite: {
            type: DataTypes.STRING,
            allowNull: true
        },

        mode_access_eau: {
            type: DataTypes.STRING,
            allowNull: true
        },

        mode_access_assainissement: {
            type: DataTypes.STRING,
            allowNull: true
        },
       
       
        has_ets_scolaires: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },


        has_prescolaire: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        has_ecole: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        has_college: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        has_lycee: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },


        has_dispensaire: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        has_centre_sante: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        has_hopital: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        has_centre_hemodialyse: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        has_module_accouchement: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        has_ambulance: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        has_pharmacie: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },



        has_ets_sante: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        has_ets_jeunesse: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        has_MDJ: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        has_centre_multifonctions: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        has_terrain_sport: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        has_foyer: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },



        has_EPS: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        has_centre_ages: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        has_centre_handicapes: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        has_centre_trisomiques: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        has_centre_autistes: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        has_centre_reinsertion: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }


    }, {
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
                Model.belongsTo(models.Person, { as: 'recipient', constraints: false });

                Model.belongsTo(models.Person);
                Model.addScope('nested', {
                    include: [{
                        model: models.Person,
                        as: 'recipient'
                    }]
                });
            }
        }
    });

    return Model;
};
