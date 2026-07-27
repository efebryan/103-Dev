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
  
  // We accidentally removed the `$` before `{` in JS template literals like 
  // `₦{Number(n).toLocaleString(...)` instead of `₦${Number(n)...}`
  // However, in JSX, `>₦{product.price}` is actually CORRECT because it's JSX syntax `>₦{variable}<`.
  // So we ONLY want to replace `₦{` with `₦${` inside backticks!
  // It's safer to just look for `₦{Number(` or `₦{Math.` or `₦{t?.price` etc.
  
  // Let's just find and replace all instances where it was broken.
  // We know it broke in fmtAmt and some console.logs maybe.
  // Let's replace `₦{Number(` with `₦${Number(`
  let newContent = content.replace(/₦\{Number\(/g, '₦${Number(');
  
  // Let's also check for `₦{` that is immediately preceded by a backtick: /`₦\{/
  newContent = newContent.replace(/`₦\{/g, '`₦${');

  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    changed++;
    console.log('Fixed', file);
  }
});
console.log('Fixed files:', changed);
