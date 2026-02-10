# Nick Yard Services - Image Assets

This directory contains image assets for the Nick Yard Services website.

## Directory Structure

```
images/
├── logo/           # Company logo files
├── hero/           # Hero section background images
├── services/       # Service-related images
├── gallery/        # Gallery/portfolio images
├── team/           # Team member photos
└── testimonials/   # Client photos (if applicable)
```

## Image Guidelines

### Logo
- Format: PNG with transparent background
- Recommended size: 200x200px minimum
- Use high-resolution version for retina displays

### Hero Images
- Format: JPG or WebP
- Recommended size: 1920x1080px
- Optimize for web (compress to reduce file size)

### Gallery Images
- Format: JPG or WebP
- Recommended size: 800x600px
- Include before/after photos where applicable

### Team Photos
- Format: JPG
- Recommended size: 400x400px
- Professional headshots work best

## Adding Images

1. Place images in appropriate subdirectories
2. Use descriptive filenames (e.g., `kitchen-remodel-project-1.jpg`)
3. Update HTML files to reference new images
4. Test on different devices to ensure responsiveness

## Placeholder Replacement

Current placeholders in HTML:
- Replace `.image-placeholder` divs with actual `<img>` tags
- Update `src` attributes with proper paths
- Add appropriate `alt` text for accessibility

Example:
```html
<!-- Replace this: -->
<div class="image-placeholder">
    <i class="fas fa-image"></i>
    <p>Company Image</p>
</div>

<!-- With this: -->
<img src="images/about/company-photo.jpg" alt="Nick Yard Services team">
```

## Optimization Tips

- Compress images before uploading
- Use WebP format for better compression
- Implement lazy loading for gallery images
- Consider using srcset for responsive images
