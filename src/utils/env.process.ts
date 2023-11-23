import { config } from "dotenv";
config();

export default {
	token: process.env.TOKEN || "TOKEN",
	port: process.env.PORT || 3000,
	prod: process.env.NODE_ENV === "production" ? true : false,
	host: process.env.HOST
		? `${process.env.HOST}:${process.env.PORT || 3000}`
		: "http://localhost:3000",
};
