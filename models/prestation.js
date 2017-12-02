"use strict";

module.exports = function(sequelize, DataTypes) {
    var Model = sequelize.define("prestations", {
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
            allowNull: false
        },

        objet: {
            type: DataTypes.STRING,
            allowNull: false
        },

        quantite: {
            type: DataTypes.DECIMAL,
            allowNull: true
        }

    },{
        classMethods: {
            associate: function(models) {
                Model.belongsTo(models.Project, { as: 'project', constraints: true });
            }
        }
    });

    return Model;
};
