# Pray for Snow

A winter sports tracking application that helps snow enthusiasts monitor snowfall patterns, plan trips, and connect with fellow powder chasers. Features real-time snow reports, mountain conditions, and social sharing of epic powder days.

## Assets

- `thumbnail.mp4` - Main thumbnail video (used as banner in detail view)
- `gallery-1.jpg` - App dashboard showing snow conditions
- `gallery-2.jpg` - Trip planning interface
- `app-icon.png` - Custom icon for Live App link
- `github-icon.png` - Custom icon for GitHub link

## Project Overview

Pray for Snow is a comprehensive winter sports tracking application designed for snow enthusiasts who live for fresh powder and perfect mountain conditions. The app combines real-time weather data with community-driven insights to help users make informed decisions about when and where to hit the slopes.

## Key Features

### Real-Time Snow Reports
- Live snowfall data from mountain resorts
- Current weather conditions and forecasts
- Base depth and new snow measurements
- Lift status and trail conditions

### Trip Planning
- Smart trip recommendations based on weather patterns
- Multi-day forecast integration
- Resort comparison tools
- Personalized alerts for powder days

### Community Features
- Social sharing of epic powder experiences
- User-generated condition reports
- Photo and video sharing from the mountains
- Community-driven snow quality ratings

### Technical Implementation
- **Mobile-First Design**: Native iOS and Android applications
- **Real-Time Data**: Integration with multiple weather APIs
- **Offline Support**: Cached data for mountain areas with poor connectivity
- **Push Notifications**: Instant alerts for fresh snowfall

## Media Gallery

This project uses a simple array format for the media gallery, showcasing key app interfaces:

```json
{
  "media": [
    {
      "type": "image",
      "src": "gallery-1.jpg",
      "alt": "App dashboard showing snow conditions",
      "caption": "Real-time snow reports and mountain conditions dashboard",
      "aspectRatio": "auto"
    },
    {
      "type": "image",
      "src": "gallery-2.jpg",
      "alt": "Trip planning interface", 
      "caption": "Smart trip planning with integrated weather forecasts",
      "aspectRatio": "auto"
    }
  ]
}
```

## Dynamic Icons

Custom icons for external links:
- `app-icon.png` - Branded app icon for the live application
- `github-icon.png` - GitHub logo for source code access

## File Structure

```
public/content/projects/pray-for-snow/
├── content.json          # Project configuration
├── thumbnail.mp4         # Banner video
├── gallery-1.jpg         # Dashboard screenshot
├── gallery-2.jpg         # Trip planning interface
├── app-icon.png          # Live app icon
├── github-icon.png       # GitHub icon
└── README.md            # This documentation
```

## Custom Layout

To create a custom detail view layout for this project:
1. Create `DetailView.tsx` in `src/components/custom-detail-views/pray-for-snow/`
2. Add import to `src/components/custom-detail-views/index.ts`
3. Follow the `ExtendedDetailViewProps` interface

## Metadata

- **Type**: Project
- **Status**: Completed
- **Technologies**: Figma, React Native, Node.js, Weather APIs
- **Date**: 2024
- **Features**: Auto Aspect Ratios, Custom Icons, Markdown Description, Media Gallery