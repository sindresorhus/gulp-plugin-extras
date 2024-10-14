# gulp-plugin-extras

> Useful utilities for creating [Gulp](https://github.com/gulpjs/gulp) plugins

## Install

```sh
npm install gulp-plugin-extras
```

## Usage

```js
import {gulpPlugin, PluginError} from 'gulp-plugin-extras';

const pluginName = 'gulp-foo';

export default function gulpFoo(requiredArgument) {
	if (!requiredArgument) {
		throw new PluginError(pluginName, 'Missing argument `requiredArgumentr`');
	}
	return gulpPlugin(pluginName, async file => {
		file.contents = await someKindOfTransformation(file.contents);
		return file;
	});
}
```

## API

### `gulpPlugin(name, onFile, options?)`

Create a Gulp plugin.

If you throw an error with a `.isPresentable = true` property, it will not display the error stack.

*This does not support streaming unless you enable the `supportsAnyType` option.*

#### name

Type: `string`

The plugin name.

#### onFile

Type: `(file) => file`

The function called for each [Vinyl file](https://github.com/gulpjs/vinyl) in the stream. Must return a modified or new Vinyl file. May be async.

#### options

Type: `object`

##### supportsDirectories

Type: `boolean`\
Default: `false`

Whether the plugin can handle directories.

##### supportsAnyType

Type: `boolean`\
Default: `false`

Whether the plugin can handle any Vinyl file type.

Useful for custom type filtering.

Supersedes `supportsDirectories`.

##### onFinish

Type: `async function * (stream: NodeJS.ReadableStream): AsyncGenerator<File, never, void>`

An async generator function executed for finalization after all files have been processed.

You can yield more files from it if needed.

```js
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

### `new PluginError(plugin: string | PluginErrorOptions, message: string | Error | PluginErrorOptions, options?: PluginErrorOptions)`

Create a Gulp plugin error.

#### plugin

Type: `string | PluginErrorOptions`

The plugin name: either as a plain string or as an option property called `plugin`.

#### message

Type: `string | Error | PluginErrorOptions`

The error message: either a plain string, an Error instance, or as an option property called `message`.

#### options

Type: `object`

##### cause

Type: `string`

Error cause indicating the reason why the current error is thrown.

##### error

Type: `Error`

The error currently being thrown.

##### fileName

Type: `string`

The path to the file that raised the error.

##### lineNumber

Type: `number`

The line number where the error occurred.

##### showProperties

Type: `boolean`\
Default: `false`

Whether to show relevant properties in the error message details.

##### showStack

Type: `boolean`\
Default: `false`

Whether to show the error stack trace.

##### stack

Type: `string`

The error stack trace.
