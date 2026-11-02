const assert = require('assert');
const parseSnippet = require('../lib/parseSnippet');

const meta = `fbq('init', '527572000359726');`;
const r = parseSnippet(meta);
assert.strictEqual(r.type, 'meta-pixel');
assert.strictEqual(r.pixelId, '527572000359726');

const tr = `<img src="https://www.facebook.com/tr?id=999&ev=PageView" />`;
assert.strictEqual(parseSnippet(tr).pixelId, '999');

assert.strictEqual(parseSnippet('hello world').type, 'generic');
assert.strictEqual(parseSnippet('').pixelId, '');

console.log('pixel-snippet tests: OK');
