const fs = require('fs');
const files = [
  'src/components/FeaturedProducts.tsx', 
  'src/app/templates/page.tsx', 
  'src/app/dashboard/wishlist/page.tsx'
];
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content.split('₦$').join('₦');
  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    console.log('Fixed', file);
  }
});
