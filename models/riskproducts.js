"use strict";

module.exports = function(sequelize, DataTypes) {
    var Model = sequelize.define("RiskProducts", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            validate: {
                isUUID: 4
            }
        }
    }, {
		freezeTableName: true,
		tableName: 'riskproducts'
	});

    return Model;
};
