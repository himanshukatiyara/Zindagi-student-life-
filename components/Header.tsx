import React, { useState } from 'react';
import type { Section } from '../App';
import { MenuIcon, XIcon } from './icons';

interface HeaderProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  isAuthenticated: boolean;
  onLogout: () => void;
}

const navLinks: { id: Section; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'accommodation', label: 'Accommodation' },
  { id: 'rentals', label: 'Rentals' },
  { id: 'rides', label: 'Rides' },
  { id: 'budget', label: 'Budget Calculator' },
];

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const NavLink: React.FC<{ section: Section; label: string }> = ({ section, label }) => (
    <button
      onClick={() => {
        setActiveSection(section);
        setIsMenuOpen(false);
      }}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
        activeSection === section
          ? 'text-white bg-blue-600'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
    >
      {label}
    </button>
  );

  return (
    <header className="bg-gray-900/80 backdrop-blur-md shadow-lg shadow-black/20 sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <button onClick={() => setActiveSection('home')} className="text-2xl font-bold text-blue-500">
              Zindagi
            </button>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <NavLink key={link.id} section={link.id} label={link.label} />
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <button onClick={onLogout} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
              Logout
            </button>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink key={link.id} section={link.id} label={link.label} />
            ))}
             <button onClick={onLogout} className="w-full text-left mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;