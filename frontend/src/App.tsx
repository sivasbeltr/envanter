import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Content from './components/Content';
import Categories from './pages/Categories';
import Departments from './pages/Departments';
import Inventory from './pages/Inventory';
import StockMovements from './pages/StockMovements';
import Users from './pages/Users';
import StockEntries from './pages/StockEntries';
import StockOutputs from './pages/StockOutputs';
import StorageLocations from './pages/StorageLocations';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Content />} />
              <Route path="kategoriler" element={<Categories />} />
              <Route path="birimler" element={<Departments />} />
              <Route path="demirbaslar" element={<Inventory />} />
              <Route path="stok-hareketleri" element={<StockMovements />} />
              <Route path="raporlar" element={<Reports />} />
              <Route path="ayarlar" element={<Settings />} />
              <Route path="kullanicilar" element={<Users />} />
              <Route path="stok-girisleri" element={<StockEntries />} />
              <Route path="stok-cikislari" element={<StockOutputs />} />
              <Route path="depolar" element={<StorageLocations />} />
            </Route>
            {/* Redirect any unknown routes to home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <PWAInstallPrompt />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
