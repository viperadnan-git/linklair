const { Sequelize } = require("sequelize");
const { DB } = require("../config");

const db = {};
const sequelize = new Sequelize(DB);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Profile = require("./models/Profile")(sequelize);
db.Social = require("./models/Social")(sequelize);
db.Link = require("./models/Link")(sequelize);

db.Profile.hasMany(db.Social);
db.Social.belongsTo(db.Profile);

db.Profile.hasMany(db.Link);
db.Link.belongsTo(db.Profile);

module.exports = db;
