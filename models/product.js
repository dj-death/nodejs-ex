"use strict";

module.exports = function(sequelize, DataTypes) {
    var Model = sequelize.define("Product", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            validate: {
                isUUID: 4
            }
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            searchable: true,
            unique: {
                msg: 'Un produit avec ce nom existe déjà.'
            },
            validate: {
                notEmpty: true
            }
        },

        director: {
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
            allowNull: true
        },

        email: {
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

        capacite_accueil: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        type: {
            type: DataTypes.STRING,
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

        type_AGR: {
            type: DataTypes.STRING,
            allowNull: true
        },


        mode_gestion: {
            type: DataTypes.STRING,
            allowNull: true
        },

        statut: {
            type: DataTypes.STRING,
            allowNull: true
        },

        niveau_perennite: {
            type: DataTypes.STRING,
            allowNull: true
        },

        staff: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        activite1_gestionnaire: {
            type: DataTypes.STRING,
            allowNull: true
        },
        
        activite2_gestionnaire: {
            type: DataTypes.STRING,
            allowNull: true
        },

        activite3_gestionnaire: {
            type: DataTypes.STRING,
            allowNull: true
        },

        tarif_moyen: {
            type: DataTypes.DECIMAL(13, 4),
            allowNull: true
        },

        tarifs_comment: {
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

        pop_benef_menage_reel: {
            type: DataTypes.INTEGER,
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

        consistance: {
            type: DataTypes.TEXT,
            allowNull: true
        }

    }, {
		freezeTableName: true,
		tableName: 'products',
		
        timestamps: false,

        classMethods: {
            associate: function(models) {
                Model.belongsTo(models.Partner, { as: 'partner', constraints: false });
                Model.hasMany(models.Project, { as: 'projects'});
                Model.hasMany(models.Visit, { as: 'visits'});

                Model.belongsToMany(models.Risk, {through: models.RiskProducts, as: 'risks'});

                // http://stackoverflow.com/a/37817966
                Model.addScope('nested', {
                    attributes: {
                        include: [
                            [sequelize.literal('(SELECT COUNT(*) FROM projects WHERE projects.est_sousprojet = FALSE AND projects.product_id = product.id)'), 'projectscount'],
                            [sequelize.literal('(SELECT SUM(montant_global) FROM projects WHERE projects.est_sousprojet = FALSE AND projects.product_id = product.id)'), 'montant_global'],
                            [sequelize.literal('(SELECT SUM(part_INDH) FROM projects WHERE projects.est_sousprojet = FALSE AND projects.product_id = product.id)'), 'part_INDH'],
                            [sequelize.literal('(SELECT COUNT(*) FROM visits WHERE visits.product_id = product.id)'), 'visitscount']
                             
                            //[sequelize.literal('(SELECT GROUP_CONCAT(objectifs SEPARATOR "<hr/>") as consistance FROM Projects WHERE Projects.est_sousprojet = FALSE AND Projects.product_id = Product.id GROUP BY product_id)'), 'consistance']
                        ]
                    },
                    include: [{
                        model: models.Project,
                        as: 'projects'
                    }, {
                        model: models.Visit,
                        as: 'visits'
                    }, { 
                        model: models.Partner, 
                        as: 'partner' 
                    }, {
                        model: models.Risk,
                        as: 'risks'
                    }]
                });
            }
        }
    });

    return Model;
};
