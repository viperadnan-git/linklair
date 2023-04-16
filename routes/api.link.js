const db = require("../database/db");
const Link = db.Link;
const router = require("express").Router();
const sequelizeErrorHandler = require("./handlers/sequelize.error");
const validateLinkInput = require("./validation/link.create");
const loginRequired = require("./middlewares/loginRequired");
const validateLinkUpdateInput = require("./validation/link.update");

router.post("/", loginRequired, validateLinkInput, (req, res) => {
	Link.findOne({
		where: { name: req.body.name, profileId: req.user.id },
	})
		.then((link) => {
			if (link) {
				return res.status(400).json({ error: `Link with name '${req.body.name}' already exists` });
			}
			Link.create({
				...req.body,
				profileId: req.user.id,
			})
				.then((link) => {
					res.status(201).json(link);
				})
				.catch((err) => {
					res.status(400).json({ error: sequelizeErrorHandler(err) });
				});
		})
});

router.delete("/:id", loginRequired, (req, res) => {
	Link.destroy({ where: { id: req.params.id, profileId: req.user.id } })
		.then((link) => {
			if (!link) {
				return res.status(404).json({ error: "Link not found" });
			}
			res.status(200).json({ message: "Link deleted" });
		})
		.catch((err) => {
			res.status(400).json({ error: sequelizeErrorHandler(err) });
		});
});

router.put("/:id", loginRequired, validateLinkUpdateInput, (req, res) => {
	Link.findOne({ where: { id: req.params.id, profileId: req.user.id } })
		.then((link) => {
			if (!link) {
				return res.status(404).json({ error: "Link not found" });
			}
			link.update({
				...req.body,
			})
				.then((link) => {
					res.status(200).json(link);
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
