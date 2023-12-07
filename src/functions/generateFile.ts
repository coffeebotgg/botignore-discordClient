import StatusCodes from "../constants/statusCodes";
import { IGenerateResponse } from "../interfaces/response.interface";
import { IHashTableData } from "../interfaces/hashtable.interface";
import { globSync } from "glob";
import fs from "fs";
import { rootDir } from "../../config";
import logger from "../utils/logger";

import { GitignoreModels } from "../database/resolvers";

const convertToFile = async (preview: IHashTableData): Promise<string> => {
	let generatedFile = "";

	// gitignore files
	const gitignoreFiles = globSync(`${rootDir}/src/**/*.gitignore`);
	const selected = Object.values(preview.selections).flat();

	await Promise.all(
		selected.map(async (file) => {
			const gitignoreFile = gitignoreFiles.find((gitignoreFile) => {
				const GitfileName = gitignoreFile.split("/").pop();
				const filename = file.split("/").pop();
				return GitfileName?.includes(filename as string);
			});

			// if not found
			if (!gitignoreFile) {
				logger.error(`File not found: ${file}`);
				return;
			}

			// read file
			const fileContent = fs.readFileSync(gitignoreFile, "utf-8");

			// get gitignore name after the last \
			const gitName = gitignoreFile.split("/").pop();

			// append to generatedFile
			generatedFile += `=============================================\n# ${gitName}\n=============================================\n\n`;
			generatedFile += fileContent + "\n\n";
		})
	);

	// console.log(generatedFile);
	return generatedFile;
};

const generateFile = async (
	uid: string
): Promise<IGenerateResponse<number>> => {
	// fetch from redis
	const preview = (await GitignoreModels.get(
		uid
	)) as unknown as IHashTableData;
	// if not found
	if (!preview) {
		const response: IGenerateResponse<404> = {
			code: 404,
			response: {
				code: StatusCodes.NotFound,
				message: "Preview not found",
			},
		};
		return response;
	}

	const file = await convertToFile(preview);

	// if found
	const response: IGenerateResponse<200> = {
		code: 200,
		response: {
			code: StatusCodes.OK,
			file: file,
		},
	};
	return response;
};

export default generateFile;
