import {rollup} from "rollup"
import resolve from "@rollup/plugin-node-resolve"
import includeStaticResourcePlugin from "rollup-include-static-resource-plugin"
import logLine from "./logLine.mjs"

export default async function(entry, output) {
	const rollup_options = {
		input: entry,

		output: {
			file: output,
			format: "es"
		},

		plugins: [includeStaticResourcePlugin(), resolve()],

		onLog(level, error) {
			logLine(`[${level}] rollup says ${error.message}`)
		}
	}

	logLine(`rollup -> ${entry} -> ${output}`)

	const bundle = await rollup(rollup_options)

	await bundle.write(rollup_options.output)
}
