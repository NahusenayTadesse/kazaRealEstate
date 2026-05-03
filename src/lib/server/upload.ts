import { createWriteStream } from 'node:fs';
import { rename, unlink } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { env } from '$env/dynamic/private';
const FILES_DIR = env.FILES_DIR ?? '.tempFiles';

/**
 * Optimized file writer
 * 1. Uses async/await for all FS operations to keep event loop free.
 * 2. Uses a shared Buffer size if applicable (handled by pipeline).
 * 3. Uses atomic rename for data integrity.
 */
async function writeFile(file: File, targetDir: string, fileName: string): Promise<void> {
	const target = join(targetDir, fileName);
	const tmp = `${target}.tmp`;

	try {
		// Performance: pipeline handles the memory-efficient backpressure
		// casting to 'any' here is often necessary due to subtle TS mismatches
		// between Web Streams and Node Streams, but the runtime works perfectly.
		await pipeline(Readable.fromWeb(file.stream() as any), createWriteStream(tmp));

		// Performance: Non-blocking rename
		await rename(tmp, target);
	} catch (e) {
		// Clean up tmp file if error occurs
		try {
			await unlink(tmp);
		} catch {
			/* Ignore if file doesn't exist */
		}
		throw e;
	}
}

export async function saveUploadedFile(file: File | undefined): Promise<string> {
	if (!file) throw new Error('No file provided');

	// Performance: crypto.randomUUID() is native C++ in Node, extremely fast.
	const fileName = `${crypto.randomUUID()}${extname(file.name)}`;

	await writeFile(file, FILES_DIR, fileName);
	return fileName;
}
