import Database from "./index";
import logger from "../utils/logger";

const GitignoreModels = {
	get: async (uid: string) => {
		try {
			const data = Database.read("gitignore", uid);
			return data;
		} catch (error) {
			logger.error(error);
		}
	},

	set: async (uid: string, data: object) => {
		try {
			Database.write(data, "gitignore", uid);
		} catch (error) {
			logger.error(error);
		}
	},

	delete: async (uid: string) => {
		try {
			Database.delete("gitignore", uid);
		} catch (error) {
			logger.error(error);
		}
	},
};

export { GitignoreModels };
