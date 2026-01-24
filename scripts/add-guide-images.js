const fs = require('fs');
const path = require('path');

// Read the guides data file
const filePath = path.join(__dirname, '../app/guides/data/guides.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Extract all guide slugs
const guideRegex = /'([a-z-]+)':\s*\{/g;
const guides = [];
let match;

while ((match = guideRegex.exec(content)) !== null) {
  guides.push(match[1]);
}

console.log(`Found ${guides.length} guides`);

// For each guide, check if it has featuredImage, if not, add a placeholder
guides.forEach((slug) => {
  // Create a pattern to find the guide object
  const guidePattern = new RegExp(
    `('${slug}':\\s*\\{[^}]*?)(\\n\\s*\\})`,
    's'
  );
  
  const guideMatch = content.match(guidePattern);
  if (guideMatch) {
    const guideContent = guideMatch[1];
    
    // Check if featuredImage already exists
    if (!guideContent.includes('featuredImage:')) {
      // Find where to insert (before the closing brace)
      // Look for a good insertion point - after excerpt or introduction
      let insertPoint = guideContent;
      const excerptMatch = guideContent.match(/(excerpt:\s*'[^']*',)/);
      const introMatch = guideContent.match(/(introduction:\s*'[^']*',)/);
      
      if (excerptMatch) {
        insertPoint = guideContent.replace(
          excerptMatch[0],
          `${excerptMatch[0]}\n    featuredImage: '/guides/guide-${slug}-hero.jpg',`
        );
      } else if (introMatch) {
        insertPoint = guideContent.replace(
          introMatch[0],
          `${introMatch[0]}\n    featuredImage: '/guides/guide-${slug}-hero.jpg',`
        );
      } else {
        // Insert after publishDate or metaDescription
        const dateMatch = guideContent.match(/(publishDate:\s*'[^']*',)/);
        if (dateMatch) {
          insertPoint = guideContent.replace(
            dateMatch[0],
            `${dateMatch[0]}\n    featuredImage: '/guides/guide-${slug}-hero.jpg',`
          );
        }
      }
      
      content = content.replace(guidePattern, `${insertPoint}${guideMatch[2]}`);
      console.log(`Added featuredImage placeholder for: ${slug}`);
    } else {
      console.log(`Guide ${slug} already has featuredImage`);
    }
  }
});

// Write back to file
fs.writeFileSync(filePath, content);
console.log('\n✅ Guide images structure updated!');
console.log('\nNext steps:');
console.log('1. Download images from Unsplash/Pexels/Pixabay');
console.log('2. Save them to /public/guides/ with names like:');
guides.slice(0, 5).forEach(slug => {
  console.log(`   - guide-${slug}-hero.jpg`);
});
console.log(`\n... and ${guides.length - 5} more`);


