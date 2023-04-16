const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./database/db");
const app = express();
const config = require("./config");
const PORT = process.env.PORT || config.PORT || 3001;
const HOST = process.env.HOST || config.HOST || "0.0.0.0";

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
	console.log(`${req.method} ${req.url}`);
	next();
});

app.use("/api", require("./routes/api"));

	app.use(express.static(path.join(__dirname, "client", "build")));
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "client", "build", "index.html"));
	});

db.sequelize
	.sync()
	.then(() => {
		console.log("Database connected");
	})
	.catch((err) => {
		console.log(err);
	});

app.listen(PORT, HOST, () => {
	console.log(`Server running on http://${HOST}:${PORT}`);
});
