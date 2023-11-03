import File = require('vinyl');

export type Options = {
	/**
	Whether the plugin can handle directories.

	@default false
	*/
	readonly supportsDirectories: boolean;

	/**
	Whether the plugin can handle any Vinyl file type.

	Useful for custom type filtering.

	Supersedes `supportsDirectories`.

	@default false
	*/
	readonly supportsAnyType: boolean;

	/**
	An async generator function executed for finalization after all files have been processed.

	You can yield more files from it if needed.

	@example
	```
	import {gulpPlugin} from 'gulp-plugin-extras';

	export default function gulpFoo() {
		return gulpPlugin(
			'gulp-foo',
			async file => { … },
			{
				async * onFinish() {
					yield someVinylFile;
					yield someVinylFile2;
				}
			}
		);
	}
	```
	*/
	readonly onFinish?: (stream: NodeJS.ReadableStream) => AsyncGenerator<File.BufferFile>;
};

/**
Create a Gulp plugin.

@param name - The plugin name.
@param onFile - The async function called for each vinyl file in the stream. Must return a modified or new vinyl file.

If you throw an error with a `.isPresentable = true` property, it will not display the error stack.

_This does not support streaming unless you enable the `supportsAnyType` option._

@example
```
import {gulpPlugin} from 'gulp-plugin-extras';

export default function gulpFoo() {
	return gulpPlugin('gulp-foo', async file => {
		file.contents = await someKindOfTransformation(file.contents);
		return file;
	});
}
```
*/
export function gulpPlugin(
	name: string,
	onFile: (file: File.BufferFile) => Promise<File.BufferFile>,
	options?: Options
): NodeJS.ReadableStream;
