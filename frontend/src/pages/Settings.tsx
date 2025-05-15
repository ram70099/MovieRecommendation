import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { useSettings } from '../context/SettingsContext';
import {  HOME_PAGE_OPTIONS, AVAILABLE_LANGUAGES } from '../types/settings';
import { Sun, Moon, Globe,   Trash2, Home } from 'lucide-react';
import styles from '../styles/Settings.module.css';
import i18n from '../i18n'; // Update the path to your actual i18n.ts file

// localStorage keys for watchlist and favorites
const WATCHLIST_KEY = "movie-app-watchlist";
const FAVORITES_KEY = "movie-app-favorites";

// Function to clear watchlist and favorites data from localStorage
const clearAllData = () => {
  try {
    localStorage.removeItem(WATCHLIST_KEY);
    localStorage.removeItem(FAVORITES_KEY);
  } catch (error) {
    console.error("Error clearing all data:", error);
  }
};

const Settings: React.FC = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { settings, updateSettings } = useSettings();
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // New state to handle success animation

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
    updateSettings({ language: event.target.value });
  };

  const handleClearData = () => {
    if (showConfirmClear) {
      clearAllData();
      setShowConfirmClear(false);
      setIsSuccess(true); // Trigger success animation
      setTimeout(() => setIsSuccess(false), 2000); // Reset success state after animation duration
    } else {
      setShowConfirmClear(true);
    }
  };

  return (
    <div>
      <h1 className={styles.title}>{t('settings')}</h1>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Sun className={styles.sectionIcon} />
          <h2 className={styles.sectionTitle}>{t('appearance')}</h2>
        </div>

        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <h3 className={styles.settingTitle}>{t('theme')}</h3>
            <p className={styles.settingDescription}>{t('themeDescription')}</p>
          </div>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={theme === 'dark'}
              onChange={toggleTheme}
            />
            <span className={styles.slider}>
              <Sun className={styles.iconLight} />
              <Moon className={styles.iconDark} />
            </span>
          </label>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Globe className={styles.sectionIcon} />
          <h2 className={styles.sectionTitle}>{t('language')}</h2>
        </div>
        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <h3 className={styles.settingTitle}>{t('selectLanguage')}</h3>
            <p className={styles.settingDescription}>{t('languageDescription')}</p>
          </div>
          <select
            value={settings.language}
            onChange={handleLanguageChange}
            className={styles.select}
          >
            {AVAILABLE_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Home className={styles.sectionIcon} />
          <h2 className={styles.sectionTitle}>{t('homepage')}</h2>
        </div>

        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <h3 className={styles.settingTitle}>{t('defaultHomePage')}</h3>
            <p className={styles.settingDescription}>{t('defaultHomePageDescription')}</p>
          </div>
          <select
            value={settings.defaultHomePage}
            onChange={(e) => updateSettings({ defaultHomePage: e.target.value })}
            className={styles.select}
          >
            {HOME_PAGE_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Trash2 className={styles.sectionIcon} />
          <h2 className={styles.sectionTitle}>{t('dataManagement')}</h2>
        </div>

        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <h3 className={styles.settingTitle}>{t('clearwatchlist')}</h3>
            <p className={styles.settingDescription}>{t('resetwatchlist')}</p>
          </div>
          <button
            className={`${styles.button} ${showConfirmClear ? styles.buttonDanger : ''}`}
            onClick={handleClearData}
          >
            {showConfirmClear ? t('confirmClear') : t('clearData')}
          </button>
        </div>
        {isSuccess && (
          <div className={styles.successMessage}>
            <p>{t('clearSuccess')}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Settings;
