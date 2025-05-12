export interface UserSettings {
  theme: 'light' | 'dark';
  language: string;
  favoriteGenres: string[];
  contentFilter: boolean;
  autoPlayTrailers: boolean;
  dataSaverMode: boolean;
  highContrast: boolean;
  defaultHomePage: string;
}
export const AVAILABLE_LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'hi', label: 'हिंदी (Hindi)' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ (Punjabi)' },
  { code: 'hinglish', label: 'Hinglish' },
  { code: 'ar', label: 'العربية (Arabic)' }
];

export type ContentRating = 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17';

export const AVAILABLE_GENRES = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime',
  'Documentary', 'Drama', 'Family', 'Fantasy', 'Horror',
  'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'Western'
];

export const HOME_PAGE_OPTIONS = [
  { value: 'trending', label: 'Trending' },
  { value: 'recommended', label: 'Recommended' },
  { value: 'watchlist', label: 'Watchlist' },
  { value: 'discover', label: 'Discover' }
];