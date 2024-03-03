export default function(line) {
	process.stderr.write(
		`\u001b[1;33m(warning)\u001b[0;0m npm-package-bundler: ${line}\n`
	)
}
