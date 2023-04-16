const router = require("express").Router();
const db = require("../database/db");
const Social = db.Social;
const validateSocialInput = require("./validation/social.create");
const sequelizeErrorHandler = require("./handlers/sequelize.error");
const loginRequired = require("./middlewares/loginRequired");
const { SOCIALS } = require("../config");

const socialUpdateOrCreate = async (req, res) => {
	const { type, link } = req.body;

	Social.findOne({ where: { type, profileId: req.user.id } })
		.then((social) => {
			if (social) {
				// update social
				social
					.update({ link })
					.then((social) => {
						res.status(200).json(social);
					})
					.catch((err) => {
						res.status(400).json({
							error: sequelizeErrorHandler(err),
						});
					});
			} else {
				Social.create({ type, link, profileId: req.user.id })
					.then((social) => {
						res.status(201).json(social);
					})
					.catch((err) => {
						res.status(400).json({
							error: sequelizeErrorHandler(err),
						});
					});
			}
		})
		.catch((err) => {
			res.status(400).json({ error: sequelizeErrorHandler(err) });
		});
};

router.post("/", loginRequired, validateSocialInput, socialUpdateOrCreate);
router.put("/", loginRequired, validateSocialInput, socialUpdateOrCreate);

router.delete("/:type", loginRequired, async (req, res) => {
	Social.destroy({ where: { type: req.params.type, profileId: req.user.id } })
		.then((social) => {
			if (!social) {
				return res.status(404).json({ error: "Social not found" });
			}
			res.status(200).json({
				message: "Social link to " + req.params.type + " deleted",
			});
		})
		.catch((err) => {
			res.status(400).json({ error: sequelizeErrorHandler(err) });
		});
});

router.get("/available", (req, res) => {
	res.status(200).json({ available: SOCIALS });
});

module.exports = router;
