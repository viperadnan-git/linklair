const router = require("express").Router();

router.post("/login", require("./api.login"));
router.use("/profile", require("./api.profile"));
router.use("/social", require("./api.social"));
router.use("/link", require("./api.link"));

module.exports = router;
