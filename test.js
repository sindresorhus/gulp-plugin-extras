import {Buffer} from 'node:buffer';
import test from 'ava';
import Vinyl from 'vinyl';
import {pEvent} from 'p-event';
import {gulpPlugin} from './index.js';

test('gulpPlugin', async t => {
	const fixture = 'x';

	const stream = gulpPlugin('gulp-foo', async file => {
		file.contents = Buffer.from(fixture);
		return file;
	});

	const dataPromise = pEvent(stream, 'data');

	stream.end(new Vinyl({
		contents: Buffer.from('unicorn'),
	}));

	const file = await dataPromise;
	t.is(file.contents.toString(), fixture);
});
