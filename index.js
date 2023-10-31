import transformStream from 'easy-transform-stream';
import PluginError from './plugin-error.js';

export function gulpPlugin(name, onFile, onFinish) {
	return transformStream(
		{
			objectMode: true,
		},
		async file => {
			if (file.isNull()) {
				return file;
			}

			if (file.isStream()) {
				throw new PluginError(name, 'Streaming not supported');
			}

			try {
				return await onFile(file);
			} catch (error) {
				throw new PluginError(name, error, {
					fileName: file.path,
					showStack: true,
				});
			}
		},
		onFinish && async function * () {
			try {
				yield * onFinish();
			} catch (error) {
				throw new PluginError(name, error, {showStack: true});
			}
		},
	);
}
