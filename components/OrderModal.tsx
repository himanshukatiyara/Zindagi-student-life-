import React, { useState } from 'react';
import { ItemType } from '../App';
import { XIcon, CalendarDaysIcon } from './icons';
import type { Listing, RentalItem } from '../types';

interface OrderModalProps {
  item: Listing | RentalItem;
  type: ItemType;
  onClose: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ item, type, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const itemName = type === 'accommodation' ? (item as Listing).title : (item as RentalItem).name;

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={onClose}>
        <div className="bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-md text-center border border-gray-700" onClick={(e) => e.stopPropagation()}>
          <h3 className="text-2xl font-bold text-blue-400 mb-4">Success!</h3>
          <p className="text-gray-300 mb-6">Your {type === 'accommodation' ? 'booking request' : 'rental order'} for "{itemName}" has been placed. We will contact you shortly.</p>
          <button onClick={onClose} className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-gray-800 rounded-xl shadow-lg w-full max-w-md border border-gray-700" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 flex justify-between items-center border-b border-gray-700">
          <h2 className="text-xl font-bold text-gray-50">{type === 'accommodation' ? 'Book a Visit' : 'Place Rental Order'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><XIcon className="w-6 h-6"/></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
            <input type="text" id="name" required className="mt-1 block w-full bg-gray-700 border-gray-600 text-gray-200 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-300">Contact Number</label>
            <input type="tel" id="contact" required className="mt-1 block w-full bg-gray-700 border-gray-600 text-gray-200 rounded-md shadow-sm p-2" />
          </div>
          {type === 'rental' && (
            <div>
              <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-300">Preferred Delivery Date</label>
              <div className="relative mt-1">
                 <input type="date" id="deliveryDate" required className="block w-full bg-gray-700 border-gray-600 text-gray-200 rounded-md shadow-sm p-2 pl-10" />
                 <CalendarDaysIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
          )}
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors mt-2">
            {type === 'accommodation' ? 'Confirm Booking' : 'Confirm Order'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;