import fs from "fs";
// this should create a file that only exists in memory until it is sent to the user
function bufferFile(data: string, uid: string) {
	const file = Buffer.from(data);

	fs.writeFile(`./src/temp/${uid}.gitignore`, file, (err) => {
		if (err) {
			console.error(err);
		}
	});
}

export default bufferFile;
