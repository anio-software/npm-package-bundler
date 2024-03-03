import fs from "node:fs/promises"
import printWarning from "../lib/printWarning.mjs"

export default async function() {
	const package_json_str = await fs.readFile("./package.json")
	const package_json = JSON.parse(package_json_str)

	if (!("main" in package_json)) {
		printWarning(`package.json#main is missing`)
	} else if (package_json.main !== "./dist/package.mjs") {
		printWarning(`package.json#main is not ./dist/package.mjs`)
	}

	if (!("scripts" in package_json)) {
		printWarning(`package.json#scripts is missing`)
	} else if (!("prepare" in package_json.scripts)) {
		printWarning(`package.json#scripts.prepare is missing`)
	}

	if (!("files" in package_json)) {
		printWarning(`package.json#files is missing`)
	} else if (!package_json.files.includes("./dist/package.mjs")) {
		printWarning(`./dist/package.mjs is not in package.json#files`)
	}

	return package_json
}
