import fs from 'fs';
import path from 'path';

const FORBIDDEN_PATTERNS = [/\bfetch\s*\(/, /\bXMLHttpRequest\b/, /\baxios\b/];

function collectSourceFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return collectSourceFiles(fullPath);
    }
    if (/\.(ts|tsx|js|jsx)$/.test(entry.name) && !/\.test\.(ts|tsx|js|jsx)$/.test(entry.name)) {
      return [fullPath];
    }
    return [];
  });
}

describe('privacy: no network APIs in src/', () => {
  const files = collectSourceFiles(path.join(__dirname));

  it('found source files to scan', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files)('%s makes no fetch/XMLHttpRequest/axios calls', (file) => {
    const contents = fs.readFileSync(file, 'utf8');
    for (const pattern of FORBIDDEN_PATTERNS) {
      expect(contents).not.toMatch(pattern);
    }
  });
});
