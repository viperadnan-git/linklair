const joi = require("joi");

const schema = joi.object({
	name: joi.string().min(3).max(30).required(),
	email: joi.string().email().required(),
	password: joi
		.string()
		.min(8)
		.max(20)
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/
		)
		.required()
		.messages({
			"string.pattern.base":
				"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
		}),
	username: joi.string().min(5).max(20).required(),
	bio: joi.string().max(100).allow(null),
	avatar: joi.string().max(100).allow(null),
});

module.exports = (req, res, next) => {
	const { error } = schema.validate(req.body);
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}
	next();
};
