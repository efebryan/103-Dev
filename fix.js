const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory() && !file.includes('node_modules') && !file.includes('.git') && !file.includes('.next')) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src');
let changed = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;
  
  // Replace $ followed by number e.g. $199 -> ₦199, $0 -> ₦0
  newContent = newContent.replace(/\$([0-9]+)/g, '₦$1');
  
  // Replace `$${var}` with `₦${var}`
  newContent = newContent.replace(/\$\$\{/g, '₦${');
  
  // Replace >${var} with >₦${var}
  newContent = newContent.replace(/>\$\{/g, '>₦${');
  
  // Also check formatAmount functions where we return `$${...}`
  newContent = newContent.replace(/`\$\$\{/g, '`₦${');

  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    changed++;
    console.log('Updated', file);
  }
});

console.log('Files updated:', changed);
