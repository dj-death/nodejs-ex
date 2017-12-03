"use strict";

module.exports = function(sequelize, DataTypes) {
    var Model = sequelize.define("Contribution", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            validate: {
                isUUID: 4
            }
        },

        type_partenaire: {
            type: DataTypes.STRING,
            allowNull: false,
            searchable: true,

            validate: {
                notEmpty: true
            }
        },

        denomination_partenaire: {
            type: DataTypes.STRING,
            allowNull: false,
            searchable: true,
            
            validate: {
                notEmpty: true
            }
        },

        part: {
            type: DataTypes.DECIMAL(13, 4),
            allowNull: true
        },

        nature_contribution: {
            type: DataTypes.STRING,
            allowNull: true
        },


        est_porteur: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        est_beneficiaire: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

        has_contrat_programme: {
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