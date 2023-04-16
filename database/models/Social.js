const { DataTypes } = require("sequelize");
const { SOCIALS } = require("../../config");

module.exports = (sequelize) => {
	const Social = sequelize.define("social", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		type: {
			type: DataTypes.CHAR(20),
			allowNull: false,
			validate: {
				isIn: [SOCIALS],
			},
		},
		link: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isUrl: true,
			},
		},
	});
	return Social;
};
