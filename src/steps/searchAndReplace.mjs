import path from "node:path"
import fs from "node:fs/promises"

async function searchAndReplace(file, items, output) {
	let file_contents = (await fs.readFile(
		path.join(process.cwd(), file)
	)).toString()

	for (const search in items) {
		const replace = items[search]

		file_contents = file_contents.split(search).join(replace)
	}

	await fs.writeFile(
		path.join(process.cwd(), output), file_contents
	)
}

export default async function(entries) {
	for (const entry of entries) {

		const required_keys = ["file", "items", "output"]

		for (const required_key of required_keys) {
			if (!(required_key in entry)) {
				throw new Error(`Missing required key '${required_key}'.`)
			}
		}

		const {file, items, output} = entry

		await searchAndReplace(file, items, output)
	}
}
