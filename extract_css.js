const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (styleMatch) {
  fs.writeFileSync('src/index.css', styleMatch[1].trim());
  console.log('CSS extracted to src/index.css');
} else {
  console.log('No style tag found');
}
