# Beers on Trails

A mobile-first web application connecting beer enthusiasts with hiking trails and breweries. Features interactive trail maps, brewery discovery, and social sharing of outdoor beer experiences.

## Assets

- `thumbnail.mp4` - Main thumbnail video (used as banner in detail view)
- `gallery-1.mp4` - Auto-playing hiking video with auto aspect ratio
- `gallery-2.png` - Trail riding photo with auto aspect ratio
- `10bb-icon.png` - Custom icon for 10 Barrel Brewing link

## Media Gallery Layouts

This project demonstrates the **grid layout** with auto aspect ratios, featuring an auto-playing video followed by an image. Videos in galleries behave like thumbnails - auto-playing, looping, and without controls.

### Current Configuration
```json
{
  "media": {
    "layout": "grid",
    "columns": 1,
    "items": [
      {
        "type": "video",
        "aspectRatio": "auto",
        "src": "gallery-1.mp4",
        "alt": "Nate topping out on a big hike-a-bike",
        "caption": "You can't call it a backcountry ride without a little hike-a-bike!"
      },
      {
        "type": "image",
        "aspectRatio": "auto",
        "src": "gallery-2.png",
        "alt": "Nate riding a bike through the Tetons",
        "caption": "The autumn colors were in full effect, painting the landscape with vibrant hues."
      }
    ]
  }
}
```

### Video Behavior in Gallery
- **Auto-play**: Videos start playing automatically (muted)
- **Looping**: Videos replay continuously
- **No controls**: Clean appearance like thumbnails
- **Responsive**: Maintains natural aspect ratio with `"aspectRatio": "auto"`

### All Available Layout Options

#### 1. Grid Layout (Default)
```json
{
  "media": {
    "layout": "grid",
    "columns": 3,
    "items": [...]
  }
}
```
- Responsive equal-height grid
- 1-4 columns available
- Consistent spacing and alignment

#### 2. Masonry Layout (Current)
```json
{
  "media": {
    "layout": "masonry", 
    "columns": 2,
    "items": [...]
  }
}
```
- Pinterest-style staggered layout
- Perfect for varying image heights
- Works great with `"aspectRatio": "auto"`

#### 3. Carousel Layout
```json
{
  "media": {
    "layout": "carousel",
    "items": [...]
  }
}
```
- Horizontal scrolling gallery
- Touch/swipe friendly
- Snap-to-item behavior

#### 4. Single Layout
```json
{
  "media": {
    "layout": "single",
    "items": [...]
  }
}
```
- Full-width stacked layout
- Each item gets maximum space
- Perfect for detailed viewing

### Aspect Ratio Options
- **`"auto"`** - Natural image dimensions (used here)
- **`"video"`** - 16:9 aspect ratio
- **`"square"`** - 1:1 aspect ratio  
- **`"portrait"`** - 3:4 aspect ratio

## Toolset Section Control

This project demonstrates the `hideToolset` feature. Even though technologies are defined in the metadata, the Toolset section is hidden in the detail view due to the `hideToolset: true` flag.

## File Structure

```
public/content/projects/beers-on-trails/
├── content.json          # Configuration with grid layout
├── thumbnail.mp4         # Banner video
├── gallery-1.mp4         # Auto-playing hiking video
├── gallery-2.png         # Auto-aspect trail photo
├── 10bb-icon.png         # Custom link icon
└── README.md            # This documentation
```

## Custom Layout

To create a custom detail view layout for this item:
1. Create `DetailView.tsx` in `src/components/custom-detail-views/beers-on-trails/`
2. Add import to `src/components/custom-detail-views/index.ts`
3. Follow the `ExtendedDetailViewProps` interface

## Metadata

- **Type**: Project
- **Status**: Completed
- **Technologies**: Adobe Photoshop, Adobe Illustrator, Figma, Spline (hidden in detail view)
- **Date**: 2024
- **Features**: Grid Layout, Auto-Playing Videos, Auto Aspect Ratios, Custom Icons