#!/usr/bin/env node
import index from "./index.mjs"
import process from "node:process"

if (process.argv.length !== 3) {
	process.stderr.write(`Usage: npm-package-bundler <project-root>\n`)
	process.exit(2)
}

await index(process.argv[2])
