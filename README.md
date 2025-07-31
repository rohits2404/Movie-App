# Movie Search Mobile App

A React Native mobile application for searching and exploring movies using the OMDb API. Built with Expo SDK 52+ and featuring a modern, Netflix-inspired design.

## Features

### ✅ Core Features
- **Movie Search**: Search for movies by title using the OMDb API
- **Movie List**: Display search results in a beautiful grid layout with posters and titles
- **Movie Details**: Detailed view with poster, title, year, genre, ratings, plot, and cast information
- **Tab Navigation**: Clean navigation between Search and Favorites screens

### ✅ Bonus Features
- **Favorites**: Save favorite movies using AsyncStorage with persistent storage
- **Load More**: Pagination support to load more movies from search results
- **Responsive Design**: Optimized for various screen sizes and orientations
- **Error Handling**: User-friendly error messages and loading states
- **Dark Theme**: Netflix-inspired dark theme with red accents

## Tech Stack

- **Framework**: React Native with Expo SDK 52+
- **Navigation**: Expo Router with tab and stack navigation
- **Storage**: AsyncStorage for favorites persistence
- **API**: OMDb API for movie data
- **Icons**: Lucide React Native icons
- **Styling**: React Native StyleSheet with modern design principles

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (or physical device with Expo Go)

### Step 1: Clone the Repository
```bash
git clone <your-repo-url>
cd movie-search-app
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start the Development Server
```bash
npm run dev
```

### Step 4: Run on Device/Emulator
- **iOS**: Press `i` in the terminal or scan QR code with iOS Camera
- **Android**: Press `a` in the terminal or scan QR code with Expo Go app
- **Web**: Press `w` in the terminal to open in browser

## Project Structure

```
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx          # Tab navigation layout
│   │   ├── index.tsx            # Search screen
│   │   └── favorites.tsx        # Favorites screen
│   ├── movie-details.tsx        # Movie details screen
│   └── _layout.tsx              # Root layout
├── components/
│   ├── MovieCard.tsx            # Movie card component
│   ├── SearchBar.tsx            # Search input component
│   ├── LoadingSpinner.tsx       # Loading indicator
│   └── EmptyState.tsx           # Empty state component
├── services/
│   └── movieService.ts          # OMDb API service
├── types/
│   └── movie.ts                 # TypeScript interfaces
├── utils/
│   └── favorites.ts             # AsyncStorage utilities
└── hooks/
    └── useFrameworkReady.ts     # Framework initialization hook
```

## API Configuration

The app uses the OMDb API with a free API key included for demo purposes. For production use:

1. Get your API key from [OMDb API](https://www.omdbapi.com/)
2. Replace the API key in `services/movieService.ts`

```typescript
const API_KEY = 'your-api-key-here';
```

## Key Features Implementation

### Search Functionality
- Real-time search with OMDb API integration
- Pagination support for loading more results
- Error handling for API failures
- Search result counter and status indicators

### Movie Details
- Comprehensive movie information display
- IMDb ratings and Metascore integration
- Genre tags and cast information
- Responsive poster display

### Favorites System
- AsyncStorage for persistent favorites
- Add/remove favorites with visual feedback
- Dedicated favorites screen with organized display
- Cross-screen state synchronization

### User Experience
- Smooth animations and transitions
- Loading states and error handling
- Optimized image loading with fallbacks
- Responsive design for all screen sizes

## Development Scripts

```bash
# Start development server
npm run dev

# Build for web
npm run build:web

# Lint code
npm run lint
```

## Design Principles

- **Netflix-inspired**: Dark theme with red accent colors
- **Mobile-first**: Optimized for mobile viewing experience
- **Accessibility**: Proper contrast ratios and touch targets
- **Performance**: Optimized image loading and list rendering
- **User-friendly**: Clear feedback and error states

## Testing

The app has been tested on:
- iOS Simulator
- Android Emulator  
- Web browser
- Physical devices via Expo Go

## Future Enhancements

- User authentication and profiles
- Advanced filtering and sorting options
- Movie trailers and videos
- Social features (reviews, sharing)
- Offline support with caching
- Push notifications for new releases

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues and questions:
1. Check the existing issues on GitHub
2. Create a new issue with detailed description
3. Include device/platform information for bugs

---

**Built with ❤️ using React Native and Expo**