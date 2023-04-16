const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	const Link = sequelize.define("link", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.CHAR(20),
			allowNull: false,
			validate: {
				len: [1, 20],
			},
		},
		link: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		icon: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	});

	return Link;
};
