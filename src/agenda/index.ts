import Agenda from "agenda";
import Env from "../utils/env.process";
import Database from "../database";
import { rootDir } from "../../config";

export default class AgendaJobs {
	private agenda: Agenda;

	constructor() {
		const certificatePath = `${rootDir}/cert/vanilla.pem`;
		this.agenda = new Agenda({
			db: {
				address: Env.mongoURI,
				collection: "agendaJobs",
				options: {
					tlsCertificateKeyFile: certificatePath,
				},
			},
		});
	}

	protected async resetCollection() {
		const unixTime = Math.floor(Date.now() / 1000);
		// delete all from gitignore where expires_at is less than unixTime
		await Database.bulkDelete("gitignore", {
			expires_at: { $lt: unixTime },
		});
	}

	public async start() {
		await this.agenda.start();

		await this.defineJob();
		await this.scheduleJob();
	}

	public async stop() {
		await this.agenda.stop();
	}

	public async defineJob() {
		this.agenda.define("reset collection", async (job, done) => {
			this.resetCollection();
			done();
		});
	}

	public async scheduleJob() {
		await this.agenda.every("1 hour", "reset collection");
	}

	public async cancelJob() {
		await this.agenda.cancel({ name: "reset collection" });
	}
}
