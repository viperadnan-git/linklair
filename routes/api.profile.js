const router = require("express").Router();
const db = require("../database/db");
const Profile = db.Profile;
const validateProfileInput = require("./validation/profile.create");
const validateProfileUpdateInput = require("./validation/profile.update");
const sequelizeErrorHandler = require("./handlers/sequelize.error");
const loginRequired = require("./middlewares/loginRequired");

router.post("/", validateProfileInput, (req, res) => {
	Profile.create(req.body)
		.then((profile) => {
			res.status(201).json(profile);
		})
		.catch((err) => {
			res.status(400).json({ error: sequelizeErrorHandler(err) });
		});
});

router.get("/:username", (req, res) => {
	Profile.findOne({
		where: { username: req.params.username },
		attributes: { exclude: ["password"] },
		include: [
			{
				model: db.Social,
				attributes: ["type", "link"],
			},
			{
				model: db.Link,
				attributes: ["name", "link", "icon"],
			},
		],
	})
		.then((profile) => {
			if (!profile) {
				return res.status(404).json({ error: "Profile not found" });
			}
			res.status(200).json(profile);
		})
		.catch((err) => {
			res.status(400).json({ error: sequelizeErrorHandler(err) });
		});
});

router.put("/", loginRequired, validateProfileUpdateInput, (req, res) => {
	Profile.findOne({ where: { id: req.user.id } })
		.then((profile) => {
			if (!profile) {
				return res.status(404).json({ error: "Profile not found" });
			}
			profile
				.update(req.body)
				.then((profile) => {
					res.status(200).json(profile);
				})
				.catch((err) => {
					res.status(400).json({ error: sequelizeErrorHandler(err) });
				});
		})
		.catch((err) => {
			res.status(400).json({ error: sequelizeErrorHandler(err) });
		});
});

module.exports = router;
