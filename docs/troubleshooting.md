# Troubleshooting Guide

Common issues and solutions for the Nathan Kirschner Portfolio development environment.

## 🚨 Common Issues

### Content Not Appearing

#### **Symptom**: New portfolio items don't show up on the canvas

**Possible Causes & Solutions**:

1. **Invalid JSON in content.json**
   ```bash
   # Check JSON syntax
   npx jsonlint content/experiments/my-item/content.json
   
   # Common issues:
   # - Missing commas
   # - Trailing commas
   # - Unescaped quotes in strings
   ```

2. **Missing Required Fields**
   ```json
   {
     "id": "required",
     "title": "required", 
     "description": "required",
     "thumbnailUrl": "required"
   }
   ```

3. **Content Not Generated**
   ```bash
   npm run generate:content
   cp -r content public/
   ```

4. **Directory Structure Issue**
   ```
   ✅ Correct: content/experiments/my-item/content.json
   ❌ Wrong: content/my-item/content.json
   ```

### Thumbnail Overlapping

#### **Symptom**: Thumbnails appear on top of each other

**Solution**:
```bash
# Automatic fix
npm run fix:overlaps

# Manual check
node scripts/fix-overlaps.js --help
```

**Prevention**:
- Always run `npm run generate:content` after adding items
- Use position (0, 0) for auto-placement
- Maintain 40px minimum spacing between thumbnails

### Asset Loading Issues

#### **Symptom**: Images not displaying, 404 errors in browser console

**Causes & Solutions**:

1. **Public Directory Not Updated**
   ```bash
   cp -r content public/
   ```

2. **Incorrect File Paths**
   ```json
   // ✅ Correct - filename only
   "thumbnailUrl": "thumbnail.jpg"
   
   // ❌ Wrong - full path
   "thumbnailUrl": "/content/experiments/my-item/thumbnail.jpg"
   ```

3. **Missing Files**
   ```bash
   # Check file exists
   ls content/experiments/my-item/thumbnail.jpg
   
   # Add placeholder if needed
   cp docs/placeholder-thumbnail.jpg content/experiments/my-item/thumbnail.jpg
   ```

4. **Case Sensitivity**
   ```bash
   # File system is case-sensitive
   # "Thumbnail.JPG" ≠ "thumbnail.jpg"
   ```

### Build Errors

#### **Symptom**: `npm run build` fails

**Common Causes**:

1. **TypeScript Type Errors**
   ```bash
   # Check types
   npx tsc --noEmit
   
   # Common fixes:
   # - Ensure all content.json match PortfolioItem interface
   # - Check for undefined values
   # - Validate array structures
   ```

2. **Missing Dependencies**
   ```bash
   npm install
   ```

3. **Content Generation Failure**
   ```bash
   # Run manually to see errors
   npm run generate:content
   ```

### Canvas Navigation Issues

#### **Symptom**: Canvas feels sluggish or unresponsive

**Solutions**:

1. **Browser Performance**
   ```bash
   # Check browser dev tools performance tab
   # Look for:
   # - High CPU usage
   # - Memory leaks
   # - Excessive re-renders
   ```

2. **Too Many Items**
   ```bash
   # System tested up to 100+ items
   # If performance degrades:
   # - Implement virtual scrolling
   # - Add item culling based on viewport
   ```

3. **Hardware Acceleration**
   ```css
   /* Ensure CSS transforms use GPU */
   transform: translateZ(0);
   will-change: transform;
   ```

### Development Server Issues

#### **Symptom**: `npm run dev` won't start or crashes

**Solutions**:

1. **Port Already in Use**
   ```bash
   # Kill process on port 3000
   lsof -ti:3000 | xargs kill -9
   
   # Or use different port
   npm run dev -- -p 3001
   ```

2. **Node Version Issues**
   ```bash
   # Check Node version
   node --version  # Should be 18+
   
   # Update if needed
   nvm install 18
   nvm use 18
   ```

3. **Cache Issues**
   ```bash
   # Clear Next.js cache
   rm -rf .next
   npm run dev
   ```

4. **Dependency Issues**
   ```bash
   # Fresh install
   rm -rf node_modules package-lock.json
   npm install
   ```

## 🔧 Debugging Tools

### Content Validation

```bash
# Check all content files
npm run generate:content

# Check for overlaps
npm run fix:overlaps

# Manual validation
node -e "
  const items = require('./src/data/generated-portfolio.ts');
  console.log('Loaded', items.portfolioItems.length, 'items');
  items.portfolioItems.forEach(item => {
    console.log(item.id, item.position);
  });
"
```

### Asset Verification

```bash
# List all content assets
find content -name "*.jpg" -o -name "*.png" -o -name "*.gif"

# Check public directory sync
diff -r content public/content

# Verify specific item
ls -la content/experiments/neural-canvas/
ls -la public/content/experiments/neural-canvas/
```

### Browser Developer Tools

1. **Console**: Check for JavaScript errors
2. **Network**: Verify asset loading (404s, slow requests)
3. **Performance**: Monitor frame rate and CPU usage
4. **Elements**: Inspect DOM structure and CSS

### Component Debugging

```tsx
// Add debug logging to components
console.log('Canvas state:', canvasState);
console.log('Visible items:', visibleItems.length);
console.log('Item positions:', items.map(i => ({id: i.id, pos: i.position})));
```

## ⚡ Performance Optimization

### Image Optimization

```bash
# Optimize thumbnails (if imagemagick installed)
mogrify -resize 384x288 -quality 85 content/**/thumbnail.jpg

# Or use online tools:
# - TinyPNG
# - ImageOptim
# - Squoosh.app
```

### Build Optimization

```bash
# Analyze bundle size
npm run build
npx @next/bundle-analyzer

# Check generated files
ls -la .next/static/
```

### Runtime Performance

```tsx
// Use React DevTools Profiler
// Check for:
// - Unnecessary re-renders
// - Large component trees
// - Expensive calculations in render
```

## 🐛 Error Messages & Solutions

### "Content file not found"
```bash
# Error: Content file not found: /path/to/content.json

# Solution: Check file exists and path is correct
ls content/experiments/my-item/content.json
```

### "Invalid JSON syntax"
```bash
# Error: Unexpected token in JSON at position X

# Solution: Validate JSON
npx jsonlint content/experiments/my-item/content.json

# Common fixes:
# - Remove trailing commas: {"key": "value",} ❌ → {"key": "value"} ✅
# - Escape quotes: "He said "hello"" ❌ → "He said \"hello\"" ✅
# - Close brackets: [1, 2, 3 ❌ → [1, 2, 3] ✅
```

### "Module not found"
```bash
# Error: Cannot resolve module './generated-portfolio'

# Solution: Run content generation
npm run generate:content
```

### "Port 3000 already in use"
```bash
# Solution 1: Kill existing process
lsof -ti:3000 | xargs kill -9

# Solution 2: Use different port
npm run dev -- -p 3001
```

### "Cannot read property 'position' of undefined"
```bash
# Error in canvas navigation

# Solution: Check all items have positions
grep -r "position" content/*/content.json
npm run fix:overlaps
```

## 🔍 Diagnostic Commands

### System Health Check
```bash
# Check all systems
echo "🔍 Portfolio Health Check"
echo "========================"

echo "📦 Dependencies:"
npm list --depth=0

echo "📁 Content Items:"
find content -name "content.json" | wc -l

echo "🖼️ Assets:"
find content -name "*.jpg" -o -name "*.png" | wc -l

echo "⚙️ Generated Files:"
ls -la src/data/generated-portfolio.ts

echo "🌐 Public Assets:"
ls -la public/content/ 2>/dev/null || echo "No public content directory"

echo "✅ Health check complete!"
```

### Content Audit
```bash
# Validate all content files
for file in $(find content -name "content.json"); do
  echo "Checking $file"
  npx jsonlint "$file" > /dev/null && echo "✅ Valid" || echo "❌ Invalid JSON"
done
```

### Performance Check
```bash
# Check for large files
find content -type f -size +2M -exec ls -lh {} \;

# Count items by type
echo "Projects: $(ls content/projects/ | wc -l)"
echo "Experiments: $(ls content/experiments/ | wc -l)" 
echo "Insights: $(ls content/insights/ | wc -l)"
```

## 📞 Getting Help

### Self-Help Checklist
1. ✅ Read error messages carefully
2. ✅ Check browser console for errors  
3. ✅ Verify file paths and naming
4. ✅ Run content generation commands
5. ✅ Check this troubleshooting guide

### Documentation Resources
- **[Content System Guide](content-system.md)** - Content management details
- **[Getting Started](getting-started.md)** - Setup and basics
- **[Architecture Guide](architecture.md)** - System design
- **[Implementation Summary](implementation-summary.md)** - What was built

### Common Quick Fixes
```bash
# The "universal" fix - regenerate everything
npm run generate:content
npm run fix:overlaps  
cp -r content public/
npm run dev
```

### Debugging Workflow
1. **Identify** the specific error or issue
2. **Reproduce** the problem consistently  
3. **Check** logs and error messages
4. **Test** solutions incrementally
5. **Verify** fix works across scenarios

---

## 💡 Prevention Tips

### Regular Maintenance
- Run `npm run generate:content` after content changes
- Periodically check for overlaps with `npm run fix:overlaps`
- Keep dependencies updated
- Validate content.json files before committing

### Development Best Practices  
- Use consistent naming conventions
- Validate JSON before saving
- Test locally before deploying
- Keep backup of working states

### Quality Assurance
- Preview changes in development before building
- Check console for warnings and errors
- Test across different browsers and devices
- Monitor performance metrics

**Most issues can be resolved by regenerating content and checking file paths!** ✨