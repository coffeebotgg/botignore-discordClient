import { config } from "dotenv";
config();

export default {
	token: process.env.TOKEN || "TOKEN",
	port: process.env.PORT || 3000,
	prod: process.env.NODE_ENV === "production" ? true : false,
	host: process.env.HOST ? `${process.env.HOST}` : "http://localhost:3000",
	apiKey: process.env.API_KEY ?? "API_KEY",
	mongoURI: process.env.MONGO_URL ?? "MONGO_URI",
};
