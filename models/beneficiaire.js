"use strict";

module.exports = function(sequelize, DataTypes) {
    var Model = sequelize.define("Beneficiaire", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            validate: {
                isUUID: 4
            }
        },

        categorie: {
            type: DataTypes.STRING,
            allowNull: true
        },

        type: {
            type: DataTypes.STRING,
            allowNull: true
        },

        pop_benef_homme: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        pop_benef_femme: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        pop_benef_jeune: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        pop_benef_total: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
        
    },{
        tableName: 'beneficiaires',
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