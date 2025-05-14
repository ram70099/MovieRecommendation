import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Define translation keys
const translationKeys = [
  'home', 'discover', 'search', 'watchlist', 'trending', 'settings',
  'menu', 'library', 'other', 'appearance', 'theme', 'themeDescription',
  'language', 'selectLanguage', 'languageDescription', 'homepage',
  'defaultHomePage', 'defaultHomePageDescription', 'dataManagement',
  'clearwatchlist', 'resetwatchlist', 'confirmClear', 'clearData',
  'loading', 'errorFetchMovies', 'errorFetchGenre', 'welcome',
  'homeTagline', 'recentReleases', 'recentDescription',
  'recommendedTitle', 'recommendedDescription', 'movieCount','yourcollection',
  // Added new keys
  'addToWatchlist', 'removeFromWatchlist', 'rateMovie', 'shareMovie',
  'movieDetails', 'actor', 'director', 'genre', 'releaseDate',
  'duration', 'languageOfFilm', 'averageRating', 'ratingCount',
  'clearSuccess', // New key added
];

// Define translations for each language
const translations: Record<string, string[]> = {
  en: [
    'Home', 'Discover', 'Search', 'Watchlist', 'Trending', 'Settings',
    'Menu', 'Library', 'Other', 'Appearance', 'Theme',
    'Choose between light and dark mode for your viewing experience',
    'Language', 'Select Language', 'Choose your preferred language for the interface',
    'Homepage', 'Default Home Page', 'Choose what section opens first',
    'Data Management', 'Clear Watchlist', 'Reset your watchlist and start fresh',
    'Confirm Clear', 'Clear Data',
    'Loading movies...',
    'Failed to load movies. Please try again later.',
    'Failed to load {{genre}} movies. Please try again later.',
    'Welcome to MovieLens',
    'Discover, track, and enjoy your favorite movies in one place.',
    'Recent Releases',
    'Movies from the last 5 years',
    'Recommended For You',
    'Based on your watchlist and favorites',
    'Showing {{count}} movies','Your Collection',
    // Added new translations
    'Add to Watchlist', 'Remove from Watchlist', 'Rate this Movie', 'Share this Movie',
    'Movie Details', 'Actor', 'Director', 'Genre', 'Release Date',
    'Duration', 'Language of Film', 'Average Rating', 'Rating Count',
    'Watchlist cleared successfully', // Translation for clearSuccess
  ],
  hi: [
    'होम', 'खोजें', 'खोजना', 'देखने की सूची', 'रुझान', 'सेटिंग्स',
    'मेनू', 'लाइब्रेरी', 'अन्य', 'रूप', 'थीम',
    'देखने के अनुभव के लिए लाइट या डार्क मोड चुनें',
    'भाषा', 'भाषा चुनें', 'इंटरफ़ेस के लिए अपनी पसंदीदा भाषा चुनें',
    'होमपेज', 'डिफ़ॉल्ट होमपेज', 'पहली बार कौन सा सेक्शन खुलेगा चुनें',
    'डेटा प्रबंधन', 'वॉचलिस्ट साफ़ करें', 'अपनी वॉचलिस्ट रीसेट करें और नए सिरे से शुरू करें',
    'पुष्टि करें', 'डेटा साफ़ करें',
    'फ़िल्में लोड हो रही हैं...',
    'फ़िल्मों को लोड करने में विफल। कृपया बाद में पुनः प्रयास करें।',
    '{{genre}} फ़िल्मों को लोड करने में विफल। कृपया बाद में पुनः प्रयास करें।',
    'मूवीलेंस में आपका स्वागत है',
    'अपनी पसंदीदा फ़िल्में खोजें, ट्रैक करें और एक ही स्थान पर आनंद लें।',
    'हाल की रिलीज़',
    'पिछले 5 वर्षों की फ़िल्में',
    'आपके लिए अनुशंसित',
    'आपकी वॉचलिस्ट और पसंदीदा के आधार पर',
    '{{count}} फ़िल्में दिखा रहे हैं','आपका संग्रह',
    // Added new translations
    'वॉचलिस्ट में जोड़ें', 'वॉचलिस्ट से हटाएं', 'इस फिल्म को रेट करें', 'इस फिल्म को शेयर करें',
    'फिल्म विवरण', 'अभिनेता', 'निर्देशक', 'श्रेणी', 'रिलीज़ तिथि',
    'समय अवधि', 'फिल्म की भाषा', 'औसत रेटिंग', 'रेटिंग की संख्या',
    'वॉचलिस्ट सफलतापूर्वक साफ़ कर दी गई', // Translation for clearSuccess
  ],
  pa: [
    'ਘਰ', 'ਖੋਜੋ', 'ਖੋਜ', 'ਵਾਚਲਿਸਟ', 'ਟ੍ਰੈਂਡਿੰਗ', 'ਸੈਟਿੰਗਜ਼',
    'ਮੇਨੂ', 'ਲਾਇਬ੍ਰੇਰੀ', 'ਹੋਰ', 'ਦਿੱਖ', 'ਥੀਮ',
    'ਆਪਣੀ ਦੇਖਣ ਦੀ ਅਨੁਭਵ ਲਈ ਲਾਈਟ ਜਾਂ ਡਾਰਕ ਮੋਡ ਚੁਣੋ',
    'ਭਾਸ਼ਾ', 'ਭਾਸ਼ਾ ਚੁਣੋ', 'ਇੰਟਰਫੇਸ ਲਈ ਆਪਣੀ ਮਨਪਸੰਦ ਭਾਸ਼ਾ ਚੁਣੋ',
    'ਮੁੱਖ ਪੰਨਾ', 'ਡਿਫੌਲਟ ਮੁੱਖ ਪੰਨਾ', 'ਕਿਹੜਾ ਸੈਕਸ਼ਨ ਪਹਿਲਾਂ ਖੁਲੇ ਚੁਣੋ',
    'ਡਾਟਾ ਪ੍ਰਬੰਧਨ', 'ਵਾਚਲਿਸਟ ਸਾਫ਼ ਕਰੋ', 'ਆਪਣੀ ਵਾਚਲਿਸਟ ਰੀਸੈਟ ਕਰੋ ਅਤੇ ਨਵੇਂ ਤਰੀਕੇ ਨਾਲ ਸ਼ੁਰੂ ਕਰੋ',
    'ਪੁਸ਼ਟੀ ਕਰੋ', 'ਡਾਟਾ ਸਾਫ਼ ਕਰੋ',
    'ਫਿਲਮਾਂ ਲੋਡ ਕੀਤੀਆਂ ਜਾ ਰਹੀਆਂ ਹਨ...',
    'ਫਿਲਮਾਂ ਲੋਡ ਕਰਨ ਵਿੱਚ ਅਸਫਲ। ਬਾਅਦ ਵਿੱਚ ਕੋਸ਼ਿਸ਼ ਕਰੋ ਜੀ।',
    '{{genre}} ਫਿਲਮਾਂ ਲੋਡ ਕਰਨ ਵਿੱਚ ਅਸਫਲ। ਬਾਅਦ ਵਿੱਚ ਕੋਸ਼ਿਸ਼ ਕਰੋ ਜੀ।',
    'ਮੂਵੀਲੈਂਸ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ',
    'ਆਪਣੀਆਂ ਮਨਪਸੰਦ ਫਿਲਮਾਂ ਨੂੰ ਇੱਕ ਥਾਂ ਤੇ ਖੋਜੋ, ਟਰੈਕ ਕਰੋ ਤੇ ਆਨੰਦ ਮਾਣੋ।',
    'ਤਾਜ਼ਾ ਰਿਲੀਜ਼',
    'ਆਖਰੀ 5 ਸਾਲਾਂ ਦੀਆਂ ਫਿਲਮਾਂ',
    'ਤੁਹਾਡੇ ਲਈ ਸੁਝਾਈ ਗਈਆਂ',
    'ਤੁਹਾਡੀ ਵਾਚਲਿਸਟ ਅਤੇ ਮਨਪਸੰਦਾਂ ਦੇ ਆਧਾਰ ਤੇ',
    '{{count}} ਫਿਲਮਾਂ ਵਿਖਾਈਆਂ ਜਾ ਰਹੀਆਂ ਹਨ','ਤੁਹਾਡਾ ਸੰਗ੍ਰਹਿ',
    // Added new translations
    'ਵਾਚਲਿਸਟ ਵਿੱਚ ਸ਼ਾਮਲ ਕਰੋ', 'ਵਾਚਲਿਸਟ ਤੋਂ ਹਟਾਓ', 'ਇਸ ਫਿਲਮ ਨੂੰ ਰੇਟ ਕਰੋ', 'ਇਸ ਫਿਲਮ ਨੂੰ ਸਾਂਝਾ ਕਰੋ',
    'ਫਿਲਮ ਵੇਰਵਾ', 'ਅਦਾਕਾਰ', 'ਨਿਰਦੇਸ਼ਕ', 'ਸ਼੍ਰੇਣੀ', 'ਰਿਲੀਜ਼ ਦੀ ਤਰੀਖ',
    'ਟਿਕਾਣਾ', 'ਫਿਲਮ ਦੀ ਭਾਸ਼ਾ', 'ਔਸਤ ਰੇਟਿੰਗ', 'ਰੇਟਿੰਗ ਗਿਣਤੀ',
    'ਵਾਚਲਿਸਟ ਸਫਲਤਾਪੂਰਵਕ ਸਾਫ਼ ਕਰ ਦਿੱਤੀ ਗਈ', // Translation for clearSuccess
  ],
  hinglish: [
    'Home', 'Khojo', 'Search karo', 'Watchlist', 'Trending', 'Settings',
    'Menu', 'Library', 'Other', 'Appearance', 'Theme',
    'Light ya dark mode choose karo for better experience',
    'Language', 'Language chuno', 'Interface ke liye apni favourite language chuno',
    'Homepage', 'Default Homepage', 'Pehle kaunsa section open ho select karo',
    'Data Management', 'Watchlist clear karo', 'Apni watchlist reset karo aur naya shuru karo',
    'Confirm Clear', 'Clear Data',
    'Movies load ho rahi hain...',
    'Movies load karne mein problem aayi. Baad mein try karo.',
    '{{genre}} movies load karne mein dikkat aayi. Thodi der mein try karo.',
    'Welcome to MovieLens',
    'Discover, track aur enjoy karo apni favourite movies ek jagah pe.',
    'Recent Releases',
    'Last 5 saal ki movies',
    'Aapke liye recommended',
    'Watchlist aur favourites ke basis pe',
    '{{count}} movies dikhayi ja rahi hain', 'Aapka collection',
    // Added new translations
    'Watchlist mein add karo', 'Watchlist se hatao', 'Is movie ko rate karo', 'Is movie ko share karo',
    'Movie details', 'Actor', 'Director', 'Genre', 'Release Date',
    'Duration', 'Language of Film', 'Average Rating', 'Rating Count',
    'Watchlist successfully cleared', // Translation for clearSuccess
  ]
};

// Convert into i18next format
const resources: Record<string, { translation: Record<string, string> }> = {};
for (const [lang, values] of Object.entries(translations)) {
  resources[lang] = {
    translation: Object.fromEntries(
      translationKeys.map((key, index) => [key, values[index]])
    ),
  };
}

// Get language from localStorage
let savedLang = 'en';
try {
  const savedSettings = localStorage.getItem('userSettings');
  if (savedSettings) {
    const parsed = JSON.parse(savedSettings);
    if (parsed.language) {
      savedLang = parsed.language;
    }
  }
} catch (err) {
  console.error('Failed to load language from localStorage', err);
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
