import { createClient, RedisClientOptions } from "redis";
import env from "../utils/env.process";
import logger from "../utils/logger";

export default class RedisClient {
	private client: ReturnType<typeof createClient>;

	constructor() {
		this.client = createClient({
			socket: {
				host: env.redis.host,
				port: env.redis.port,
			},
			password: env.redis.password,
			username: env.redis.username,
		} as RedisClientOptions);

		this.client.on("connect", () => {
			logger.cache("📂 Connected to Redis");
		});

		this.client.on("error", (error) => {
			logger.error(`📂 Redis error: ${error}`);
		});

		this.client.on("end", () => {
			logger.cache("📂 Disconnected from Redis");
		});

		this.client.on("reconnecting", () => {
			logger.cache("📂 Reconnecting to Redis");
		});
	}

	async connect(): Promise<void> {
		await this.client.connect();
	}

	async disconnect(): Promise<void> {
		await this.client.disconnect();
	}

	async getById(id: string): Promise<any> {
		try {
			logger.cache(`📂 Getting gitignore:${id} from cache`);
			const value = await this.client.json.get(`gitignore:${id}`);

			if (!value) return null;

			return value;
		} catch (error) {
			logger.error(
				`📂 Error getting gitignore:${id} from cache: ${error}`
			);
			return null;
		}
	}

	async set(id: string, data: any, expiration?: number): Promise<void> {
		try {
			const now = Math.floor(Date.now() / 1000);
			if (!data.created_at) data.created_at = now;
			if (!data.expires_at && expiration)
				data.expires_at = now + expiration;

			await this.client.json.set(`gitignore:${id}`, "$", data);
			if (expiration)
				await this.client.expire(`gitignore:${id}`, expiration);
		} catch (error) {
			logger.error(`📂 Error setting gitignore:${id} in cache: ${error}`);
		}
	}

	async delete(id: string): Promise<void> {
		try {
			await this.client.del(`gitignore:${id}`);
		} catch (error) {
			logger.error(
				`📂 Error deleting gitignore:${id} from cache: ${error}`
			);
		}
	}
}
