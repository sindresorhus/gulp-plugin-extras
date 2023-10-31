import File = require('vinyl');

/**
Create a Gulp plugin.

@param name - The plugin name.
@param onFile - The async function called for each vinyl file in the stream. Must return a modified or new vinyl file.
@param onFinish - An async generator function executed for finalization after all files have been processed. You can yield more files from it if needed.

@example
```
import {gulpPlugin} from 'gulp-plugin-extras';

export default function gulpFoo() {
	return gulpPlugin(
		'gulp-foo',
		async file => {
			file.contents = await someKindOfTransformation(file.contents);
			return file;
		},
		async function* () {
			yield someVinylFile;
			yield someVinylFile2;
		}
	);
}
```
*/
export function gulpPlugin(
	name: string,
	onFile: (file: File.BufferFile) => Promise<File.BufferFile>,
	onFinish?: () => AsyncGenerator<File.BufferFile>
): NodeJS.ReadableStream;
