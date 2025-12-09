import React, { useState } from 'react';
import { Listing, RentalItem } from '../types';
import { ItemType } from '../App';
import OrderModal from './OrderModal';
import Rating from './Rating';
import { ArrowLeftIcon, MapPinIcon } from './icons';

interface ItemDetailsProps {
    item: Listing | RentalItem;
    type: ItemType;
    onBack: () => void;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({ item, type, onBack }) => {
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

    const isListing = (item: Listing | RentalItem): item is Listing => type === 'accommodation';

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
            {isOrderModalOpen && <OrderModal item={item} type={type} onClose={() => setIsOrderModalOpen(false)} />}
            
            <button onClick={onBack} className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold mb-6">
                <ArrowLeftIcon className="w-5 h-5"/>
                Back to Listings
            </button>

            <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-5">
                    <div className="lg:col-span-3">
                        <img 
                            src={isListing(item) ? item.imageUrls[0] : item.imageUrl} 
                            alt={isListing(item) ? item.title : item.name} 
                            className="w-full h-64 md:h-96 object-cover" 
                        />
                         {isListing(item) && item.imageUrls.length > 1 && (
                            <div className="p-4 bg-gray-800 flex gap-4 overflow-x-auto">
                                {item.imageUrls.map((url, index) => (
                                    <img key={index} src={url} alt={`${item.title} ${index+1}`} className="h-20 w-20 object-cover rounded-md cursor-pointer border-2 border-transparent hover:border-blue-500"/>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="lg:col-span-2 p-6 flex flex-col">
                        <h1 className="text-3xl font-bold text-gray-50 mb-2">{isListing(item) ? item.title : item.name}</h1>
                        <Rating rating={item.rating} reviews={item.reviews} />
                        
                        <p className="flex items-center gap-2 text-gray-400 mt-4"><MapPinIcon className="w-4 h-4 text-blue-400"/> {item.location}</p>
                        
                        <div className="my-6 text-gray-300">
                           <p>{item.description}</p>
                        </div>
                        
                         {isListing(item) && (
                            <div className="mb-6">
                                <h3 className="font-semibold text-gray-100 mb-2">Facilities</h3>
                                <div className="flex flex-wrap gap-2">
                                    {item.facilities.map(facility => (
                                        <span key={facility} className="text-sm bg-blue-900/50 text-blue-300 px-3 py-1 rounded-full">{facility}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-auto pt-6 border-t border-gray-700">
                             <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-400">{isListing(item) ? 'Rent' : 'Price'}</span>
                                <p className="text-3xl font-bold text-blue-500">
                                    ₹{isListing(item) ? item.rent.toLocaleString() : item.price.toLocaleString()}
                                    <span className="text-base font-normal text-gray-400">/{isListing(item) ? 'month' : `per ${item.duration}`}</span>
                                </p>
                            </div>
                            <button 
                                onClick={() => setIsOrderModalOpen(true)}
                                className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                {isListing(item) ? 'Book Now' : 'Rent Now'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetails;