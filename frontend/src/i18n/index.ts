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
  'recommendedTitle', 'recommendedDescription', 'movieCount', 'yourcollection',
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
    'Welcome to TeamFlicks',
    'Discover, track, and enjoy your favorite movies in one place.',
    'Recent Releases',
    'Movies from the last 3 years',
    'Recommended For You',
    'Based on your watchlist and favorites',
    'Showing {{count}} movies', 
    'Your Collection',
  ],
  es: [
    'Inicio', 'Descubrir', 'Buscar', 'Mi Lista', 'Tendencias', 'Ajustes',
    'Menú', 'Biblioteca', 'Otro', 'Apariencia', 'Tema',
    'Elige entre modo claro y oscuro para tu experiencia',
    'Idioma', 'Seleccionar Idioma', 'Elige tu idioma preferido para la interfaz',
    'Página de Inicio', 'Página de Inicio Predeterminada', 'Elige qué sección se abre primero',
    'Gestión de Datos', 'Borrar Lista', 'Restablecer tu lista y comenzar de nuevo',
    'Confirmar Borrado', 'Borrar Datos',
    'Cargando películas...',
    'No se pudieron cargar las películas. Inténtalo de nuevo más tarde.',
    'No se pudieron cargar las películas de {{genre}}. Inténtalo de nuevo más tarde.',
    'Bienvenido a TeamFlicks',
    'Descubre, sigue y disfruta tus películas favoritas en un solo lugar.',
    'Estrenos Recientes',
    'Películas de los últimos 3 años',
    'Recomendado para ti',
    'Basado en tu lista y favoritos',
    'Mostrando {{count}} películas',
    'Tu colección',
  ],
  fr: [
    'Accueil', 'Découvrir', 'Rechercher', 'Ma Liste', 'Tendances', 'Paramètres',
    'Menu', 'Bibliothèque', 'Autre', 'Apparence', 'Thème',
    'Choisissez entre le mode clair et sombre',
    'Langue', 'Sélectionner la langue', "Choisissez votre langue préférée pour l'interface",
    'Page d’accueil', 'Page d’accueil par défaut', 'Choisissez la section à ouvrir en premier',
    'Gestion des données', 'Effacer la liste de lecture', 'Réinitialisez votre liste et repartez à zéro',
    'Confirmer la suppression', 'Effacer les données',
    'Chargement des films...',
    'Échec du chargement des films. Veuillez réessayer plus tard.',
    'Échec du chargement des films {{genre}}. Veuillez réessayer plus tard.',
    'Bienvenue sur TeamFlicks',
    'Découvrez, suivez et profitez de vos films préférés en un seul endroit.',
    'Dernières sorties',
    'Films des 3 dernières années',
    'Recommandé pour vous',
    'Basé sur votre liste de lecture et vos favoris',
    'Affichage de {{count}} films',
    'Votre collection',
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
    'TeamFlicks में आपका स्वागत है',
    'अपनी पसंदीदा फ़िल्में खोजें, ट्रैक करें और एक ही स्थान पर आनंद लें।',
    'हाल की रिलीज़',
    'पिछले 3 वर्षों की फ़िल्में',
    'आपके लिए अनुशंसित',
    'आपकी वॉचलिस्ट और पसंदीदा के आधार पर',
    '{{count}} फ़िल्में दिखा रहे हैं',
    'आपका संग्रह',
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
    'TeamFlicks ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ',
    'ਆਪਣੀਆਂ ਮਨਪਸੰਦ ਫਿਲਮਾਂ ਨੂੰ ਇੱਕ ਥਾਂ ਤੇ ਖੋਜੋ, ਟਰੈਕ ਕਰੋ ਤੇ ਆਨੰਦ ਮਾਣੋ।',
    'ਤਾਜ਼ਾ ਰਿਲੀਜ਼',
    'ਆਖਰੀ 3 ਸਾਲਾਂ ਦੀਆਂ ਫਿਲਮਾਂ',
    'ਤੁਹਾਡੇ ਲਈ ਸੁਝਾਈ ਗਈਆਂ',
    'ਤੁਹਾਡੀ ਵਾਚਲਿਸਟ ਅਤੇ ਮਨਪਸੰਦਾਂ ਦੇ ਆਧਾਰ ਤੇ',
    '{{count}} ਫਿਲਮਾਂ ਵਿਖਾਈਆਂ ਜਾ ਰਹੀਆਂ ਹਨ',
    'ਤੁਹਾਡਾ ਕਲੇਕਸ਼ਨ',
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
    'Welcome to TeamFlicks',
    'Discover, track aur enjoy karo apni favourite movies ek jagah pe.',
    'Recent Releases',
    'Last 3 saal ki movies',
    'Aapke liye recommended',
    'Watchlist aur favourites ke basis pe',
    '{{count}} movies dikhayi ja rahi hain',
    'Tumhara Collection',
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
