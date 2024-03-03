import path from "node:path"

export default async function(package_json) {
	const config = (await import(
		path.join(process.cwd(), "npm-package-bundler.mjs")
	)).default

	if (typeof config === "function") {
		return await config(package_json)
	}

	return config
}
