import {
	Client,
	Partials,
	GatewayIntentBits,
	Collection,
	REST,
	Routes,
	EmbedBuilder,
	Channel,
	ChannelType,
	ActionRowBuilder,
} from "discord.js";
import env from "../utils/env.process";
import logger from "../utils/logger";
import EventHandler from "../handlers/event.handler";

export default class DiscordClient extends Client {
	private static instance: DiscordClient;
	public commands: Collection<string, any> = new Collection();
	public applications: Collection<string, any> = new Collection();

	constructor() {
		super({
			intents: [
				GatewayIntentBits.DirectMessageReactions,
				GatewayIntentBits.DirectMessageTyping,
				GatewayIntentBits.DirectMessages,
				GatewayIntentBits.GuildEmojisAndStickers,
				GatewayIntentBits.GuildIntegrations,
				GatewayIntentBits.GuildInvites,
				GatewayIntentBits.GuildMembers,
				GatewayIntentBits.GuildMessageReactions,
				GatewayIntentBits.GuildMessageTyping,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.GuildPresences,
				GatewayIntentBits.GuildScheduledEvents,
				GatewayIntentBits.GuildVoiceStates,
				GatewayIntentBits.GuildWebhooks,
				GatewayIntentBits.Guilds,
				GatewayIntentBits.MessageContent,
			],
			partials: [
				Partials.Channel,
				Partials.GuildMember,
				Partials.GuildScheduledEvent,
				Partials.Message,
				Partials.Reaction,
				Partials.ThreadMember,
				Partials.User,
			],
			shards: "auto",
		});
	}

	public async start(): Promise<void> {
		try {
			logger.client("⏳ Starting client...");
			this.login(env.token);

			this.commands = new Collection();
			this.applications = new Collection();

			// call event handler
			await new EventHandler().loadEvents(this);
		} catch (error: any) {
			logger.error(error);
			process.exit(1);
		}
	}

	public static getInstance(): DiscordClient {
		if (!DiscordClient.instance) {
			DiscordClient.instance = new DiscordClient();
		}

		return DiscordClient.instance;
	}

	public static addCommand(command: any): void {
		const client = DiscordClient.getInstance();
		client.commands.set(command.default.data.name, command.default);
	}

	public static addApplication(application: any): void {
		const client = DiscordClient.getInstance();
		client.applications.set(application.default.name, application.default);
	}

	public static getCommands(): Collection<string, any> {
		const client = DiscordClient.getInstance();
		return client.commands;
	}

	public static getApplications(): Collection<string, any> {
		const client = DiscordClient.getInstance();
		return client.applications;
	}
}
