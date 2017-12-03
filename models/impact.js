"use strict";

module.exports = function(sequelize, DataTypes) {
    var Model = sequelize.define("Impact", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            validate: {
                isUUID: 4
            }
        },

        has_impact_aires_naturelles: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        
        has_impact_aires_culturelles: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        
        has_impact_acces_population: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        
        has_impact_pesticides: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        
        has_impact_barrage: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        has_impact_sols: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        has_impact_eaux: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        has_impact_air: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        has_impact_dechets: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        has_impact_sante_securite: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        has_impact_groupes_nonimpliques: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        has_impact_reinstallation_pop: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        has_impact_expropriation: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        
        has_impact_categorie_0S: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        has_impact_categorie_1S: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        has_impact_categorie_2S: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        has_impact_categorie_3S: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        has_impact_categorie_0E: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        has_impact_categorie_1E: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        has_impact_categorie_2E: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        
        has_impact_categorie_3E: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        
        mesures_attenuation: {
            type: DataTypes.TEXT,
            allowNull: true
        }

    },{
		freezeTableName: true,
		tableName: 'impacts',
		
        classMethods: {
            associate: function(models) {
                Model.belongsTo(models.Project, { as: 'project', constraints: true });
            }
        }
    });

    return Model;
};
