const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.git') && !file.includes('.next')) {
        results = results.concat(walk(file));
      }
    } else {
      if (file.match(/\.(ts|tsx|js|jsx|json|md)$/)) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(path.join(__dirname, '../src'));
files.push(path.join(__dirname, '../package.json'));
files.push(path.join(__dirname, '../vercel.json'));
files.push(path.join(__dirname, '../README.md'));

let modifiedCount = 0;

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content.replace(/PDFhelp/g, 'ihatelovepdf')
                          .replace(/PDFHelp/g, 'ihatelovepdf')
                          .replace(/Pdfhelp/g, 'ihatelovepdf');
                          
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    modifiedCount++;
  }
}

// Remove the charset header from vercel.json if present
const vercelPath = path.join(__dirname, '../vercel.json');
if (fs.existsSync(vercelPath)) {
  let vercelContent = fs.readFileSync(vercelPath, 'utf8');
  let newVercelContent = vercelContent.replace(/\s*\{\s*"key":\s*"Content-Type",\s*"value":\s*"text\/html;\s*charset=UTF-8"\s*\},?/, '');
  if (vercelContent !== newVercelContent) {
    fs.writeFileSync(vercelPath, newVercelContent, 'utf8');
  }
}

console.log(`Updated ${modifiedCount} files.`);
