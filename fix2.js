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
  
  // Replace `₦$` with `₦` in template strings
  newContent = newContent.replace(/`₦\$\{/g, '`₦${'); // wait, `₦${` was intended to be `₦${...}`, but I wrote `₦$${` previously which became `₦${`.
  
  // Ah, the problem is in JSX: `>₦${product.price}</span>` -> It was `>$${product.price}</span>` or `>${product.price}</span>` before?
  // Let me replace `₦\$\{` with `₦{` in general, NO, I want to replace `₦\$\{` with `₦{` ONLY where it's JSX syntax, but `₦$` inside template literals should be `₦$`. Wait, inside template literal it should be `₦${` (where ${ is expression). So `₦\$\{` should be `₦\$\{`.
  // Wait, let's look at the grep output!
  // `₦${product.price}` - Here `₦$` are literal characters, followed by `{product.price}`? No, if it's JSX, `{product.price}` is the JS expression. `₦$` is literal text. So it renders "₦$50". I need to replace `₦$` with `₦`.
  
  // So replace literal `₦$` with `₦`.
  newContent = newContent.replace(/₦\$/g, '₦');

  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    changed++;
    console.log('Fixed', file);
  }
});
console.log('Fixed files:', changed);
