const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config");

module.exports = (req, res, next) => {
	const token = req.header("Authorization")
		? req.header("Authorization").replace("Bearer ", "")
		: req.query.token;
	if (!token) {
		return res.status(401).json({ error: "Unauthorized" });
	}
	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		req.user = decoded;
		next();
	} catch (e) {
		return res.status(401).json({ error: "Unauthorized" });
	}
};
