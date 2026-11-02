function parseSnippet(input) {
  const snippet = String(input || '').trim();
  const result = { type: 'generic', pixelId: '' };
  if (!snippet) return result;
  const initMatch = snippet.match(/fbq\s*\(\s*['"]init['"]\s*,\s*['"]([^'"]+)['"]/i);
  if (initMatch) {
    result.type = 'meta-pixel';
    result.pixelId = initMatch[1].trim();
    return result;
  }
  const trMatch = snippet.match(/tr\?id=([^&'"\s]+)/i);
  if (trMatch) {
    result.type = 'meta-pixel';
    result.pixelId = decodeURIComponent(trMatch[1]).trim();
    return result;
  }
  return result;
}
module.exports = parseSnippet;
