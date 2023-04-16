const joi = require("joi");

const schema = joi.object({
	username: joi.string().min(4).max(20).required(),
	password: joi.string().min(8).max(20).required(),
});

module.exports = (req, res, next) => {
	const { error } = schema.validate(req.body);
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}
	next();
};
