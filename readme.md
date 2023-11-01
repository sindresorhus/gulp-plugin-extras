# gulp-plugin-extras

> Useful utilities for creating [Gulp](https://github.com/gulpjs/gulp) plugins

## Install

```sh
npm install gulp-plugin-extras
```

## Usage

```js
import {gulpPlugin} from 'gulp-plugin-extras';

export default function gulpFoo() {
	return gulpPlugin('gulp-foo', async file => {
		file.contents = await someKindOfTransformation(file.contents);
		return file;
	});
}
```

## API

### `gulpPlugin(name, onFile, options?)`

Create a Gulp plugin.

If you throw an error with a `.isPresentable = true` property, it will not display the error stack.

*This does not support streaming.*

#### name

Type: `string`

The plugin name.

#### onFile

Type: `async (file) => file`

The async function called for each [Vinyl file](https://github.com/gulpjs/vinyl) in the stream. Must return a modified or new Vinyl file.

#### options

Type: `object`

##### supportsDirectories

Type: `boolean`\
Default: `false`

Whether the plugin can handle directories.

##### onFinish

Type: `async function * (stream: NodeJS.ReadableStream): void`

An async generator function executed for finalization after all files have been processed.

You can yield more files from it if needed.

```js
import {gulpPlugin} from 'gulp-plugin-extras';

export default function gulpFoo() {
	return gulpPlugin(
		'gulp-foo',
		async file => { … },
		{
			onFinish: async function * () {
				yield someVinylFile;
				yield someVinylFile2;
			}
		}
	);
}
```
