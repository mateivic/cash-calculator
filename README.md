# Euro Calculator PWA

A professional Progressive Web App for counting Euro cash using banknote denominations.

## Features

- **One-Click Operations**: Add or subtract Euro banknote values instantly
- **Custom Denominations**: 5€, 10€, 20€, 50€, 100€, 200€, 500€ buttons
- **Two Modes**:
  - Addition mode (default) - quickly add up cash
  - Subtraction mode - deduct values from total
- **Usage Reports**: Track net denomination usage with detailed breakdown
- **Negative Totals**: Supports going below zero for flexibility
- **PWA Support**: Install on mobile devices for offline access
- **Professional Design**: Money-handling themed UI with touch-optimized buttons

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Generate PWA Icons** (required for full PWA functionality):
   ```bash
   npm install -D sharp
   node generate-icons.js
   ```

   Alternatively, manually create `icon-192x192.png` and `icon-512x512.png` in the `public` folder from the provided `icon.svg` file.

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Usage

### Basic Operation

1. **Default Mode (Addition)**: Simply tap any denomination button to add it to the total
2. **Switch to Subtraction**: Tap the "- Subtract" button, then tap denominations to subtract
3. **Reset**: Clear the total and start over with the "Reset" button
4. **View Report**: See a breakdown of denomination usage with the "📊 Report" button

### Report Feature

The report shows:
- Current total
- Net count of each denomination used (additions - subtractions)
- Individual contribution of each denomination to the total

The report is structured to easily support future history tracking features.

### Installing as PWA

#### On Mobile (iOS/Android):
1. Open the app in your mobile browser
2. Look for the install prompt at the bottom of the screen
3. Tap "Install" to add to your home screen

#### Manual Installation:
- **iOS Safari**: Tap Share → Add to Home Screen
- **Android Chrome**: Tap Menu → Add to Home Screen
- **Desktop Chrome/Edge**: Click the install icon in the address bar

## Project Structure

```
custom-calculator/
├── app/
│   ├── components/
│   │   ├── Calculator.tsx      # Main calculator component
│   │   ├── ReportModal.tsx     # Usage report modal
│   │   └── InstallPrompt.tsx   # PWA install prompt
│   ├── globals.css             # Global styles and theme
│   ├── layout.tsx              # App layout with PWA metadata
│   └── page.tsx                # Home page
├── public/
│   ├── manifest.json           # PWA manifest
│   ├── icon.svg                # Source icon file
│   ├── icon-192x192.png        # PWA icon (generated)
│   └── icon-512x512.png        # PWA icon (generated)
├── next.config.js              # Next.js + PWA configuration
└── package.json
```

## Technical Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **PWA**: next-pwa with service worker
- **Icons**: Custom SVG-based icons

## Customization

### Theme Colors

The money-handling theme uses green tones for financial trust. To customize:

Edit `app/globals.css`:
```css
:root {
  --money-green: #1e7e34;       /* Primary green */
  --money-green-dark: #155724;  /* Dark green */
  --money-green-light: #28a745; /* Light green */
  --danger-red: #dc3545;        /* Subtraction/negative */
}
```

### Denominations

To modify available denominations, edit `app/components/Calculator.tsx`:

```typescript
const DENOMINATIONS = [5, 10, 20, 50, 100, 200, 500];
```

### Future Enhancements

The code is structured to easily support:

1. **History Tracking**:
   - Comment in `ReportModal.tsx` indicates where to add history feature
   - Current structure tracks net usage; can be extended to full transaction log

2. **Multiple Currencies**:
   - Denomination values can be made dynamic
   - Currency symbol can be parameterized

3. **Data Persistence**:
   - Add localStorage to save state
   - Sync across devices with backend

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Android Chrome 90+

## License

ISC

## Support

For issues or questions, please create an issue in the repository.
