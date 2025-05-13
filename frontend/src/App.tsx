import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Discover from './pages/Discover';
import Search from './pages/Search';
import Watchlist from './pages/Watchlist';
import Trending from './pages/Trending';
import Settings from './pages/Settings';
import MovieDetails from './pages/MovieDetails';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import { ThemeProvider } from './context/ThemeContext';
import './styles/App.css';

// Component that handles the redirect from `/` to the user's selected default homepage
const DefaultRedirect: React.FC = () => {
  const { settings } = useSettings();

  // fallback if not set
  const defaultPage = settings?.defaultHomePage || 'home';

  return <Navigate to={`/${defaultPage}`} replace />;
};

function App() {
  return (
    <div className="app">
      <SettingsProvider>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<DefaultRedirect />} />
                <Route path="home" element={<Home />} />
                <Route path="discover" element={<Discover />} />
                <Route path="search" element={<Search />} />
                <Route path="watchlist" element={<Watchlist />} />
                <Route path="trending" element={<Trending />} />
                <Route path="settings" element={<Settings />} />
                <Route path="movie/:id" element={<MovieDetails />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </SettingsProvider>
    </div>
  );
}

export default App;
