import React from 'react';
import type { RentalItem } from '../types';
import Card from '../components/Card';
import Rating from '../components/Rating';
import { RefrigeratorIcon, WindIcon, MicrowaveIcon, LaptopIcon, MapPinIcon } from '../components/icons';

interface RentalsProps {
  onSelectItem: (item: RentalItem, type: 'rental') => void;
}

const dummyRentals: RentalItem[] = [
  { id: 1, name: 'Mini Fridge', category: 'Appliances', price: 500, duration: 'Month', imageUrl: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&q=80', location: 'Bandra, Mumbai', rating: 4.7, reviews: 75, description: "Compact and energy-efficient mini fridge, perfect for a hostel room or PG. Keeps your drinks and snacks cool." },
  { id: 2, name: 'Washing Machine', category: 'Appliances', price: 700, duration: 'Month', imageUrl: 'https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=400&q=80', location: 'Vashi, Navi Mumbai', rating: 4.5, reviews: 58, description: "Semi-automatic washing machine with a 6kg capacity. Ideal for a student's weekly laundry needs. Easy to operate." },
  { id: 3, name: 'Study Table & Chair', category: 'Furniture', price: 400, duration: 'Month', imageUrl: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=400&q=80', location: 'Andheri, Mumbai', rating: 4.8, reviews: 102, description: "A sturdy wooden study table and a comfortable ergonomic chair. The perfect combo for your late-night study sessions." },
  { id: 4, name: 'Microwave Oven', category: 'Appliances', price: 350, duration: 'Month', imageUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&q=80', location: 'Nerul, Navi Mumbai', rating: 4.4, reviews: 45, description: "A simple and reliable microwave oven for heating food, making popcorn, or cooking instant noodles. A must-have for every student." },
  { id: 5, name: 'Laptop for Students', category: 'Electronics', price: 1500, duration: 'Month', imageUrl: 'https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=400&q=80', location: 'Powai, Mumbai', rating: 4.9, reviews: 89, description: "A budget-friendly laptop with decent specs for all your academic needs - assignments, projects, and online classes. Comes with Windows 10 pre-installed." },
  { id: 6, name: 'Air Cooler', category: 'Appliances', price: 600, duration: 'Month', imageUrl: 'https://images.unsplash.com/photo-1594036236322-29367200a0ae?w=400&q=80', location: 'Panvel, Navi Mumbai', rating: 4.3, reviews: 66, description: "A powerful air cooler to beat the Mumbai heat. Portable and effective, ensuring a comfortable environment in your room." },
];

const RentalIcon = ({ category }: { category: string }) => {
    switch(category) {
        case 'Appliances': return <RefrigeratorIcon className="w-4 h-4 text-gray-400" />;
        case 'Furniture': return <WindIcon className="w-4 h-4 text-gray-400" />;
        case 'Electronics': return <LaptopIcon className="w-4 h-4 text-gray-400" />;
        default: return <MicrowaveIcon className="w-4 h-4 text-gray-400" />;
    }
}

const Rentals: React.FC<RentalsProps> = ({ onSelectItem }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center mb-2 text-gray-50">Rent Student Essentials</h1>
      <p className="text-center text-gray-400 mb-8">Get everything you need for your student life, hassle-free.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {dummyRentals.map(item => (
          <Card key={item.id} imageUrl={item.imageUrl} title={item.name} actionText="Rent Now" onActionClick={() => onSelectItem(item, 'rental')}>
            <div className="space-y-2 text-sm">
                <Rating rating={item.rating} reviews={item.reviews} />
                <p className="flex items-center gap-2 pt-1"><MapPinIcon className="w-4 h-4 text-blue-400"/> {item.location}</p>
                <p className="flex items-center gap-2 text-gray-400"><RentalIcon category={item.category} /> {item.category}</p>
                <p className="text-2xl font-bold text-blue-500">₹{item.price}<span className="text-sm font-normal text-gray-400">/per {item.duration}</span></p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Rentals;