import invokeRollup from "../lib/invokeRollup.mjs"
import logLine from "../lib/logLine.mjs"

export default async function(input_file, output_file) {
	logLine(`processFile '${input_file}' --> ${output_file}`)

	await invokeRollup(input_file, output_file)
}
