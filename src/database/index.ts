import logger from "../utils/logger";
import { MongoClient } from "mongodb";
import env from "../utils/env.process";
import process from "process";
import { rootDir } from "../../config";

export default class Database {
	public static instance: Database | null = null;
	private static connection: MongoClient;

	public static getInstance() {
		if (!Database.instance) {
			const certificatePath = `${rootDir}/cert/vanilla.pem`;
			Database.instance = new Database();
			Database.connection = new MongoClient(env.mongoURI as string, {
				tlsCertificateKeyFile: certificatePath,
			});

			Database.connection.connect();
		}

		return Database.instance;
	}

	public static async write(data: object, collection: string, key?: string) {
		try {
			this.getInstance();

			// upsert
			await Database.connection
				.db("botignore")
				.collection(collection)
				.updateOne({ id: key }, { $set: data }, { upsert: true });

			this.disconnect();
		} catch (error) {
			logger.error(error);
		}
	}

	public static async read(
		collection: string,
		key?: string | null,
		query?: object | null
	) {
		try {
			this.getInstance();

			const data = await Database.connection
				.db("botignore")
				.collection(collection)
				.findOne(key ? { id: key } : query || {});

			this.disconnect();

			return data;
		} catch (error) {
			logger.error(error);
		}
	}

	public static async delete(collection: string, key: string) {
		try {
			this.getInstance();

			await Database.connection
				.db("botignore")
				.collection(collection)
				.deleteOne({ id: key });

			this.disconnect();
		} catch (error) {
			logger.error(error);
		}
	}

	public static async bulkDelete(collection: string, query: object) {
		try {
			this.getInstance();

			await Database.connection
				.db("botignore")
				.collection(collection)
				.deleteMany(query);

			this.disconnect();
		} catch (error) {
			logger.error(error);
		}
	}

	public static async getCount(collection: string) {
		try {
			this.getInstance();

			const count = await Database.connection
				.db("botignore")
				.collection(collection)
				.countDocuments();

			this.disconnect();

			return count;
		} catch (error) {
			logger.error(error);
		}
	}

	public static async readAll(collection: string) {
		try {
			this.getInstance();

			const data = await Database.connection
				.db("botignore")
				.collection(collection)
				.find({})
				.toArray();

			this.disconnect();

			return data;
		} catch (error) {
			logger.error(error);
		}
	}

	public static async disconnect() {
		await Database.connection.close();
		Database.instance = null;
	}
}
