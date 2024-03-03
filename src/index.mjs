import main from "./main.mjs"

export default async function(project_root) {
	const saved_pwd = process.cwd()

	process.chdir(project_root)

	try {
		await main()
	} finally {
		process.chdir(saved_pwd)
	}
}
