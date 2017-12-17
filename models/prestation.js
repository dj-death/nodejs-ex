"use strict";

module.exports = function(sequelize, DataTypes) {
    var Model = sequelize.define("Prestation", {
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
        tableName: 'prestations',
        classMethods: {
            associate: function(models) {
                Model.belongsTo(models.Project, { as: 'project', constraints: false });
            }
        }
    });

    return Model;
};
