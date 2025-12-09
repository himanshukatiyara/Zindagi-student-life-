import React from 'react';
import type { Section } from '../App';
import { HomeIcon, ShoppingBagIcon, CarFrontIcon, CalculatorIcon, MapPinIcon } from '../components/icons';

interface HomeProps {
  setActiveSection: (section: Section) => void;
}

const CategoryCard: React.FC<{ icon: React.ReactNode; title: string; description: string; onClick: () => void; }> = ({ icon, title, description, onClick }) => (
    <div onClick={onClick} className="bg-gray-800 p-6 rounded-xl shadow-lg shadow-black/30 hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-300 cursor-pointer text-center border border-gray-700 hover:border-blue-600/50">
        <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center bg-blue-900/50 text-blue-400 rounded-full">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-50 mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
    </div>
);

const TestimonialCard: React.FC<{ quote: string; name: string; college: string; imageUrl: string; }> = ({ quote, name, college, imageUrl }) => (
    <div className="bg-gray-800 p-8 rounded-xl shadow-lg shadow-black/30 text-center border border-gray-700">
        <img src={imageUrl} alt={name} className="w-20 h-20 rounded-full mx-auto -mt-16 border-4 border-gray-800 shadow-md object-cover"/>
        <p className="text-gray-300 italic mt-4">"{quote}"</p>
        <p className="font-bold text-blue-400 mt-4">{name}</p>
        <p className="text-sm text-gray-500">{college}</p>
    </div>
);

const Home: React.FC<HomeProps> = ({ setActiveSection }) => {
  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white pt-24 pb-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{backgroundImage: `url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&q=80')`}}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/80 to-gray-900"></div>
        <div className="container mx-auto px-4 relative">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">Your All-in-One Student Life Partner</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Zindagi — Everything a Student Needs, All in One Place.
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search for rooms, PGs, rentals, or rides..." 
                className="w-full p-4 pr-16 rounded-full text-gray-800 bg-gray-100 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-shadow"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700">
                <MapPinIcon className="w-5 h-5"/>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 -mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <CategoryCard 
            icon={<HomeIcon className="w-8 h-8"/>}
            title="Accommodation"
            description="Find flats, PGs, and hostels near your campus."
            onClick={() => setActiveSection('accommodation')}
          />
          <CategoryCard 
            icon={<ShoppingBagIcon className="w-8 h-8"/>}
            title="Rentals"
            description="Rent essentials like furniture, appliances, and more."
            onClick={() => setActiveSection('rentals')}
          />
          <CategoryCard 
            icon={<CarFrontIcon className="w-8 h-8"/>}
            title="Rides"
            description="Book rides or rent vehicles for your daily commute."
            onClick={() => setActiveSection('rides')}
          />
          <CategoryCard 
            icon={<CalculatorIcon className="w-8 h-8"/>}
            title="Budget Calculator"
            description="Plan your monthly expenses with our simple tool."
            onClick={() => setActiveSection('budget')}
          />
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Students Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pt-16">
          <TestimonialCard 
            quote="Zindagi made finding a PG near my college so easy! The AI assistant was surprisingly helpful."
            name="Priya Sharma"
            college="Delhi University"
            imageUrl="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&q=80"
          />
          <TestimonialCard 
            quote="Renting a fridge for my hostel room was a breeze. Great service and affordable prices."
            name="Rohan Verma"
            college="IIT Bombay"
            imageUrl="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80"
          />
          <TestimonialCard 
            quote="I use the ride service for my daily commute. It's reliable and cheaper than other options."
            name="Anjali Singh"
            college="Pune University"
            imageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;