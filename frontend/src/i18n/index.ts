import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Define translation keys once
const translationKeys = [
  'home',
  'discover',
  'search',
  'watchlist',
  'trending',
  'settings',
  'menu',
  'library',
  'other',
  'appearance',
  'theme',
  'themeDescription',
  'language',
  'selectLanguage',
  'languageDescription',
  'homepage',
  'defaultHomePage',
  'defaultHomePageDescription',
  'dataManagement',
  'clearAppData',
  'resetAppData',
  'confirmClear',
  'clearData',
];

// Define translations for each language
const translations: Record<string, string[]> = {
  en: [
    'Home', 'Discover', 'Search', 'Watchlist', 'Trending', 'Settings',
    'Menu', 'Library', 'Other', 'Appearance', 'Theme',
    'Choose between light and dark mode for your viewing experience',
    'Language', 'Select Language', 'Choose your preferred language for the interface',
    'Homepage', 'Default Home Page', 'Choose what section opens first',
    'Data Management', 'Clear App Data', 'Reset all settings and cached data',
    'Confirm Clear', 'Clear Data',
  ],
  es: [
    'Inicio', 'Descubrir', 'Buscar', 'Mi Lista', 'Tendencias', 'Ajustes',
    'Menú', 'Biblioteca', 'Otro', 'Apariencia', 'Tema',
    'Elige entre modo claro y oscuro para tu experiencia',
    'Idioma', 'Seleccionar Idioma', 'Elige tu idioma preferido para la interfaz',
    'Página de Inicio', 'Página de Inicio Predeterminada', 'Elige qué sección se abre primero',
    'Gestión de Datos', 'Borrar Datos de la App', 'Restablecer todos los ajustes y datos almacenados',
    'Confirmar Borrado', 'Borrar Datos',
  ],
  fr: [
    'Accueil', 'Découvrir', 'Rechercher', 'Ma Liste', 'Tendances', 'Paramètres',
    'Menu', 'Bibliothèque', 'Autre', 'Apparence', 'Thème',
    'Choisissez entre le mode clair et sombre',
    'Langue', 'Sélectionner la langue', "Choisissez votre langue préférée pour l'interface",
    'Page d’accueil', 'Page d’accueil par défaut', 'Choisissez la section à ouvrir en premier',
    'Gestion des données', 'Effacer les données', 'Réinitialiser tous les paramètres et données en cache',
    'Confirmer la suppression', 'Effacer les données',
  ],
  hi: [
    'होम', 'खोजें', 'खोजना', 'देखने की सूची', 'रुझान', 'सेटिंग्स',
    'मेनू', 'लाइब्रेरी', 'अन्य', 'रूप', 'थीम',
    'देखने के अनुभव के लिए लाइट या डार्क मोड चुनें',
    'भाषा', 'भाषा चुनें', 'इंटरफ़ेस के लिए अपनी पसंदीदा भाषा चुनें',
    'होमपेज', 'डिफ़ॉल्ट होमपेज', 'पहली बार कौन सा सेक्शन खुलेगा चुनें',
    'डेटा प्रबंधन', 'ऐप डेटा साफ़ करें', 'सभी सेटिंग्स और कैश्ड डेटा रीसेट करें',
    'पुष्टि करें', 'डेटा साफ़ करें',
  ],
  pa: [
    'ਘਰ', 'ਖੋਜੋ', 'ਖੋਜ', 'ਵਾਚਲਿਸਟ', 'ਟ੍ਰੈਂਡਿੰਗ', 'ਸੈਟਿੰਗਜ਼',
    'ਮੇਨੂ', 'ਲਾਇਬ੍ਰੇਰੀ', 'ਹੋਰ', 'ਦਿੱਖ', 'ਥੀਮ',
    'ਆਪਣੀ ਦੇਖਣ ਦੀ ਅਨੁਭਵ ਲਈ ਲਾਈਟ ਜਾਂ ਡਾਰਕ ਮੋਡ ਚੁਣੋ',
    'ਭਾਸ਼ਾ', 'ਭਾਸ਼ਾ ਚੁਣੋ', 'ਇੰਟਰਫੇਸ ਲਈ ਆਪਣੀ ਮਨਪਸੰਦ ਭਾਸ਼ਾ ਚੁਣੋ',
    'ਮੁੱਖ ਪੰਨਾ', 'ਡਿਫੌਲਟ ਮੁੱਖ ਪੰਨਾ', 'ਕਿਹੜਾ ਸੈਕਸ਼ਨ ਪਹਿਲਾਂ ਖੁਲੇ ਚੁਣੋ',
    'ਡਾਟਾ ਪ੍ਰਬੰਧਨ', 'ਐਪ ਡਾਟਾ ਸਾਫ਼ ਕਰੋ', 'ਸਭ ਸੈਟਿੰਗਾਂ ਅਤੇ ਕੈਸ਼ ਕੀਤੇ ਡਾਟਾ ਨੂੰ ਰੀਸੈਟ ਕਰੋ',
    'ਪੁਸ਼ਟੀ ਕਰੋ', 'ਡਾਟਾ ਸਾਫ਼ ਕਰੋ',
  ],
  hinglish: [
    'Home', 'Khojo', 'Search karo', 'Watchlist', 'Trending', 'Settings',
    'Menu', 'Library', 'Other', 'Appearance', 'Theme',
    'Light ya dark mode choose karo for better experience',
    'Language', 'Language chuno', 'Interface ke liye apni favourite language chuno',
    'Homepage', 'Default Homepage', 'Pehle kaunsa section open ho select karo',
    'Data Management', 'App data clear karo', 'Saari settings aur cached data reset karo',
    'Confirm Clear', 'Clear Data',
  ],
  ar: [
    'الصفحة الرئيسية', 'اكتشف', 'بحث', 'قائمة المشاهدة', 'الشائع', 'الإعدادات',
    'القائمة', 'المكتبة', 'أخرى', 'المظهر', 'السمة',
    'اختر بين الوضع الفاتح والداكن لتجربة مشاهدة أفضل',
    'اللغة', 'اختر اللغة', 'اختر لغتك المفضلة لواجهة المستخدم',
    'الصفحة الرئيسية', 'الصفحة الرئيسية الافتراضية', 'اختر القسم الذي يتم فتحه أولاً',
    'إدارة البيانات', 'مسح بيانات التطبيق', 'إعادة تعيين جميع الإعدادات والبيانات المخزنة',
    'تأكيد المسح', 'مسح البيانات',
  ]
};

// Convert into i18next resource format
const resources: Record<string, { translation: Record<string, string> }> = {};

for (const [lang, values] of Object.entries(translations)) {
  resources[lang] = {
    translation: Object.fromEntries(
      translationKeys.map((key, index) => [key, values[index]])
    )
  };
}

// Init i18next
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
