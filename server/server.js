const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

//app
const app = express();

//DataBase
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: true,
	})
	.then(() => console.log("DB CONNECTED"))
	.catch((err) => console.log("DB CONNECTION ERR", err));

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

//route
app.get("/api", (req, res) => {
	res.json({
		data: "wowo, slowly gettin there",
	});
});

//port
const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`RUNNING ON ${port}`);
});
