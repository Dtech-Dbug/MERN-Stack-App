const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
//route autohandling
const fs = require("fs");

//routes
//const authRouter = require("./routes/auth");

//app
const app = express();

//DataBase
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => console.log("DB CONNECTED"))
	.catch((err) => console.log("DB CONNECTION ERR", err));

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

//route
//app.use("/api", authRouter);
fs.readdirSync("./routes").map((route) =>
	app.use("/api", require("./routes/" + route))
);

//port
const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`RUNNING ON ${port}`);
});
