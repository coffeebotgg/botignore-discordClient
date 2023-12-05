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
			logger.client(`📂 Connected to Redis`);
		});

		this.client.on("error", (error) => {
			logger.error(`📂 Redis error: ${error}`);
		});

		this.client.on("end", () => {
			logger.client(`📂 Disconnected from Redis`);
		});

		this.client.on("reconnecting", () => {
			logger.client(`📂 Reconnecting to Redis`);
		});
	}

	async connect(): Promise<void> {
		await this.client.connect();
	}

	async disconnect(): Promise<void> {
		await this.client.disconnect();
	}

	async getById(id: string): Promise<any> {
		logger.client(`📂 Getting gitignore:${id} from cache`);
		const value = await this.client.json.get(`gitignore:${id}`);

		if (!value) return null;

		return value;
	}

	async set(id: string, data: any, expiration?: number): Promise<void> {
		const now = Math.floor(Date.now() / 1000);
		if (!data.created_at) data.created_at = now;
		if (!data.expires_at && expiration) data.expires_at = now + expiration;

		await this.client.json.set(`gitignore:${id}`, `$`, data);
		if (expiration) await this.client.expire(`gitignore:${id}`, expiration);
	}

	async delete(id: string): Promise<void> {
		await this.client.del(`gitignore:${id}`);
	}
}
