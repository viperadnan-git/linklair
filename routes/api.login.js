const db = require("../database/db");
const Profile = db.Profile;
const jwt = require("jsonwebtoken");
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config");

module.exports = (req, res) => {
	let { username, password } = req.body;
	username = username.trim().toLowerCase();
	password = password.trim();

	Profile.findOne({
		where: {
			// match username with either email or username
			[Op.or]: [{ username }, { email: username }],
		},
	})
		.then((profile) => {
			if (!profile) {
				return res.status(404).json({ error: "User not found" });
			}

			if (!bcrypt.compareSync(password, profile.password)) {
				return res.status(401).json({ error: "Invalid password" });
			}

			const token = jwt.sign(
				{
					id: profile.id,
					username: profile.username,
					email: profile.email,
					avatar: profile.avatar,
				},
				JWT_SECRET,
				{ expiresIn: "8h" }
			);

			res.status(200).json({ token, username: profile.username });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: "Server error" });
		});
};
