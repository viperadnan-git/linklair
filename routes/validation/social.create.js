const joi = require("joi");
const { SOCIALS } = require("../../config");

const schema = joi.object({
	type: joi
		.string()
		.valid(...SOCIALS)
		.required(),
	link: joi.string().uri().required(),
});

module.exports = (req, res, next) => {
	const { error } = schema.validate(req.body);
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}
	next();
};
