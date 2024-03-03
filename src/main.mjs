import checkPackageJSON from "./steps/checkPackageJSON.mjs"
import cleanDistFolder from "./steps/cleanDistFolder.mjs"
import readConfigFile from "./steps/readConfigFile.mjs"
import searchAndReplace from "./steps/searchAndReplace.mjs"
import path from "node:path"
import processFile from "./steps/processFile.mjs"

export default async function() {
	const package_json = await checkPackageJSON()
	await cleanDistFolder()

	const config = await readConfigFile(package_json)

	if ("preprocessing" in config) {
		await searchAndReplace(config.preprocessing)
	}

	if ("processing" in config) {
		for (const file of config.processing) {
			const normalized_file = path.normalize(file)

			if (!normalized_file.startsWith("src/")) {
				throw new Error(`file must start with 'src/'.`)
			} else if (normalized_file === "src/package.mjs") {
				throw new Error(`disallowed file name 'package.mjs'.`)
			}

			let output_file = "./dist/" + normalized_file.slice("src/".length)

			await processFile(`./${normalized_file}`, output_file)
		}
	}

	await processFile("./src/index.mjs", "./dist/package.mjs")

	if ("postprocessing" in config) {
		await searchAndReplace(config.postprocessing)
	}
}
