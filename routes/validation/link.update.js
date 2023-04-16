const joi = require("joi");

const schema = joi.object({
	name: joi.string().min(1).max(20),
	link: joi.string(),
	icon: joi.string().allow(null),
});

module.exports = (req, res, next) => {
	const { error } = schema.validate(req.body);
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}
	next();
};
