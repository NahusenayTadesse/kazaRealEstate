import { promises as fs, createReadStream } from 'node:fs';
import path from 'node:path';
import { Readable } from 'node:stream';
import { env } from '$env/dynamic/private';

const FILES_DIR = path.resolve(env.FILES_DIR ?? '.tempFiles');

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, request }) {
	// 1. Path Sanitization: Ensure users can't use "../" to escape the directory
	const fileName = path.basename(params.name);
	const file_path = path.join(FILES_DIR, fileName);

	try {
		// 2. Use fs.stat (async) instead of existsSync + statSync
		// This avoids two disk trips; if it doesn't exist, it throws to catch.
		const stats = await fs.stat(file_path);

		if (!stats.isFile()) {
			return new Response('not found', { status: 404 });
		}

		const etag = `W/"${stats.size}-${stats.mtimeMs}"`;

		// 3. Early Exit for Cache
		if (request.headers.get('if-none-match') === etag) {
			return new Response(null, { status: 304 });
		}

		// 4. Modern Stream Handling
		const nodejs_rstream = createReadStream(file_path);
		const web_rstream = Readable.toWeb(nodejs_rstream);

		return new Response(web_rstream, {
			headers: {
				ETag: etag,
				'Content-Type': mimes.lookup(file_path),
				'Content-Length': stats.size.toString(),
				'Cache-Control': 'public, max-age=31536000, immutable', // Better for UUID files
				'Last-Modified': stats.mtime.toUTCString(),
				'Content-Disposition': 'inline'
			}
		});
	} catch (e) {
		return new Response('not found', { status: 404 });
	}
}

const mimes = {
	// Text
	txt: 'text/plain',
	pdf: 'application/pdf',
	// Images
	webp: 'image/webp',
	png: 'image/png',
	jpg: 'image/jpeg',
	jpeg: 'image/jpeg',
	avif: 'image/avif',
	// Audio
	mp3: 'audio/mp3',
	// Video
	webm: 'video/webm',
	mp4: 'video/mp4',

	/** @param {string} string */
	lookup(string) {
		const ext = string.toLowerCase().split('.').at(-1);
		return (ext && this[/** @type {keyof typeof mimes} */ ext]) ?? 'application/octet-stream';
	}
};
