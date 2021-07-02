import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import router from "./routes/api.routes.js";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, (error) => {
	if (error) {
		console.log("ERROR:", error);
	}
	console.log(`App listening on port: ${PORT}`);
});
