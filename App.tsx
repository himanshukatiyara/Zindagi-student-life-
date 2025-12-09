import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './sections/Home';
import Accommodation from './sections/Accommodation';
import Rentals from './sections/Rentals';
import Rides from './sections/Rides';
import BudgetCalculator from './sections/BudgetCalculator';
import Chatbot from './components/Chatbot';
import Welcome from './sections/Welcome';
import ItemDetails from './components/ItemDetails';
import type { Listing, RentalItem } from './types';

export type Section = 'home' | 'accommodation' | 'rentals' | 'rides' | 'budget';
export type ItemType = 'accommodation' | 'rental';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [selectedItem, setSelectedItem] = useState<Listing | RentalItem | null>(null);
  const [itemType, setItemType] = useState<ItemType | null>(null);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveSection('home');
    setSelectedItem(null);
    setItemType(null);
  };

  const handleSelectItem = useCallback((item: Listing | RentalItem, type: ItemType) => {
    setSelectedItem(item);
    setItemType(type);
  }, []);

  const handleBackToList = useCallback(() => {
    setSelectedItem(null);
    setItemType(null);
  }, []);

  const renderSection = useCallback(() => {
    switch (activeSection) {
      case 'home':
        return <Home setActiveSection={setActiveSection} />;
      case 'accommodation':
        return <Accommodation onSelectItem={handleSelectItem} />;
      case 'rentals':
        return <Rentals onSelectItem={handleSelectItem} />;
      case 'rides':
        return <Rides />;
      case 'budget':
        return <BudgetCalculator />;
      default:
        return <Home setActiveSection={setActiveSection} />;
    }
  }, [activeSection, handleSelectItem]);

  if (!isAuthenticated) {
    return <Welcome onLogin={handleLogin} />;
  }

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col font-sans text-gray-200">
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
      <main className="flex-grow">
        {selectedItem && itemType ? (
          <ItemDetails item={selectedItem} type={itemType} onBack={handleBackToList} />
        ) : (
          renderSection()
        )}
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default App;