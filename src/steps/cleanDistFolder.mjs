import fs from "node:fs/promises"
import logLine from "../lib/logLine.mjs"
import path from "node:path"

export default async function() {
	const entries = await fs.readdir("./dist")

	for (const entry of entries) {
		if (entry === ".gitkeep") continue

		logLine(`removing dist/${entry}`)

		await fs.rm(path.join("dist", entry), {
			recursive: true
		})
	}
}
