import React, { useState, useEffect } from 'react';
import type { Listing } from '../types';
import Card from '../components/Card';
import Rating from '../components/Rating';
import { MapPinIcon, BuildingIcon, UsersIcon, PlusCircleIcon, UploadCloudIcon, XIcon } from '../components/icons';

interface AccommodationProps {
  onSelectItem: (item: Listing, type: 'accommodation') => void;
}

const dummyListings: Listing[] = [
    { id: 1, title: '1BHK in Bandra West', type: 'Flat', sharing: 'Single', rent: 25000, location: 'Bandra West, Mumbai', distance: '5km', imageUrls: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80'], facilities: ['AC', 'WiFi', 'Kitchen'], rating: 4.6, reviews: 102, description: "A cozy and fully furnished 1BHK flat located in the heart of Bandra West. Perfect for students looking for a comfortable and convenient living space. Close to major colleges and public transport." },
    { id: 2, title: 'Student PG in Andheri', type: 'PG', sharing: 'Double', rent: 15000, location: 'Andheri East, Mumbai', distance: '3km', imageUrls: ['https://images.unsplash.com/photo-1615875605825-5eb9bb5c683b?w=400&q=80'], facilities: ['AC', 'WiFi', 'Food'], rating: 4.8, reviews: 150, description: "Modern and well-maintained PG for students in Andheri. Offers double sharing rooms with all necessary amenities including three meals a day. Safe and secure environment." },
    { id: 3, title: 'Hostel near Vashi Station', type: 'Hostel', sharing: 'Triple', rent: 9000, location: 'Vashi, Navi Mumbai', distance: '1km', imageUrls: ['https://images.unsplash.com/photo-1593699893379-28a11d80e7d0?w=400&q=80'], facilities: ['WiFi', 'Laundry', 'Security'], rating: 4.3, reviews: 250, description: "Affordable boys hostel located just a short walk from Vashi railway station. Provides a comfortable stay with essential facilities like high-speed WiFi, laundry service, and 24/7 security." },
    { id: 4, title: 'Spacious PG in Powai', type: 'PG', sharing: 'Double', rent: 18000, location: 'Powai, Mumbai', distance: '2.5km', imageUrls: ['https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&q=80'], facilities: ['AC', 'Food', 'Housekeeping'], rating: 4.7, reviews: 110, description: "Well-furnished double sharing rooms in a premium PG in Powai. Close to IIT Bombay. Includes delicious meals and daily housekeeping services." },
    { id: 5, title: 'Studio Flat in Seawoods', type: 'Flat', sharing: 'Single', rent: 20000, location: 'Seawoods, Navi Mumbai', distance: '2km', imageUrls: ['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&q=80'], facilities: ['AC', 'WiFi', 'Kitchen', 'Balcony'], rating: 4.9, reviews: 85, description: "A beautiful independent studio flat in the serene locality of Seawoods, Navi Mumbai. Comes with a modern kitchen, a private balcony, and high-speed internet." },
    { id: 6, title: 'Girls Hostel in Nerul', type: 'Hostel', sharing: 'Double', rent: 12000, location: 'Nerul, Navi Mumbai', distance: '1.5km', imageUrls: ['https://images.unsplash.com/photo-1585093074037-835a61b8b449?w=400&q=80'], facilities: ['AC', 'WiFi', 'Security', 'Food'], rating: 4.7, reviews: 180, description: "A safe and comfortable girls hostel in Nerul, offering double sharing rooms with attached bathrooms. All meals are provided, and the premises are under 24/7 CCTV surveillance." },
];

const initialFormState = {
    title: '',
    type: 'Flat' as 'Flat' | 'PG' | 'Hostel',
    sharing: 'Single' as 'Single' | 'Double' | 'Triple',
    rent: '',
    location: '',
    distance: '',
    facilities: '',
    imageUrls: [] as string[],
    rating: 0,
    reviews: 0,
    description: '',
};

const Accommodation: React.FC<AccommodationProps> = ({ onSelectItem }) => {
    const [listings, setListings] = useState(dummyListings);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [newListingData, setNewListingData] = useState(initialFormState);

    useEffect(() => {
        const urlsToRevoke = newListingData.imageUrls;
        return () => {
            urlsToRevoke.forEach(url => URL.revokeObjectURL(url));
        };
    }, [newListingData.imageUrls]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewListingData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newImageUrls = Array.from(files).map((file: File) => URL.createObjectURL(file));
            setNewListingData(prev => ({
                ...prev,
                imageUrls: [...prev.imageUrls, ...newImageUrls],
            }));
        }
    };
    
    const handleRemoveImage = (indexToRemove: number) => {
        const urlToRemove = newListingData.imageUrls[indexToRemove];
        URL.revokeObjectURL(urlToRemove);
        setNewListingData(prev => ({
            ...prev,
            imageUrls: prev.imageUrls.filter((_, index) => index !== indexToRemove),
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newListingData.imageUrls.length === 0) {
            alert('Please upload at least one image.');
            return;
        }
        const newListing: Listing = {
            id: Date.now(),
            title: newListingData.title,
            type: newListingData.type,
            sharing: newListingData.sharing,
            rent: parseFloat(newListingData.rent) || 0,
            location: newListingData.location,
            distance: newListingData.distance,
            imageUrls: newListingData.imageUrls,
            facilities: newListingData.facilities.split(',').map(f => f.trim()).filter(Boolean),
            rating: 0,
            reviews: 0,
            description: 'A newly added user listing.'
        };
        setListings(prev => [newListing, ...prev]);
        setNewListingData(initialFormState);
        setIsFormVisible(false);
    };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center mb-2 text-gray-50">Find Your Perfect Stay</h1>
      <p className="text-center text-gray-400 mb-8">Search for flats, PGs, and hostels tailored to your needs.</p>

      {/* Filters */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 items-end">
        <input type="text" placeholder="Location e.g., Bandra, Mumbai" className="w-full bg-gray-700 border-gray-600 text-gray-200 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 h-10" />
        <input type="number" placeholder="Max Budget (₹)" className="w-full bg-gray-700 border-gray-600 text-gray-200 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 h-10" />
        <select className="w-full bg-gray-700 border-gray-600 text-gray-200 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 h-10">
            <option>All Types</option><option>Flat</option><option>PG</option><option>Hostel</option>
        </select>
        <select className="w-full bg-gray-700 border-gray-600 text-gray-200 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 h-10">
            <option>Any Sharing</option><option>Single</option><option>Double</option><option>Triple</option>
        </select>
        <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors w-full h-10">Search</button>
      </div>
      
       <div className="flex justify-end mb-6">
            <button onClick={() => setIsFormVisible(!isFormVisible)} className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                {isFormVisible ? <XIcon className="w-5 h-5"/> : <PlusCircleIcon className="w-5 h-5"/>}
                {isFormVisible ? 'Cancel' : 'Add New Listing'}
            </button>
       </div>

        {isFormVisible && (
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 border border-gray-700">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <input name="title" value={newListingData.title} onChange={handleInputChange} type="text" placeholder="Listing Title" required className="bg-gray-700 border-gray-600 text-gray-200 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" />
                       <input name="location" value={newListingData.location} onChange={handleInputChange} type="text" placeholder="Location" required className="bg-gray-700 border-gray-600 text-gray-200 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" />
                       <input name="rent" value={newListingData.rent} onChange={handleInputChange} type="number" placeholder="Rent per Month (₹)" required className="bg-gray-700 border-gray-600 text-gray-200 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" />
                       <input name="distance" value={newListingData.distance} onChange={handleInputChange} type="text" placeholder="Distance from Campus" required className="bg-gray-700 border-gray-600 text-gray-200 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" />
                       <select name="type" value={newListingData.type} onChange={handleInputChange} className="bg-gray-700 border-gray-600 text-gray-200 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"><option>Flat</option><option>PG</option><option>Hostel</option></select>
                       <select name="sharing" value={newListingData.sharing} onChange={handleInputChange} className="bg-gray-700 border-gray-600 text-gray-200 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"><option>Single</option><option>Double</option><option>Triple</option></select>
                    </div>
                    <input name="facilities" value={newListingData.facilities} onChange={handleInputChange} type="text" placeholder="Facilities (comma-separated, e.g., AC, WiFi)" required className="w-full bg-gray-700 border-gray-600 text-gray-200 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" />
                    <div className="col-span-full">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Upload Photos</label>
                         {newListingData.imageUrls.length > 0 && (
                            <div className="flex flex-wrap gap-4 p-4 bg-gray-700 rounded-md border border-gray-600 mb-4">
                                {newListingData.imageUrls.map((url, index) => (
                                    <div key={index} className="relative group">
                                        <img src={url} alt={`Preview ${index + 1}`} className="h-24 w-24 object-cover rounded-md" />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            aria-label="Remove image"
                                        >
                                            <XIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-600 px-6 py-10">
                            <div className="text-center">
                                <UploadCloudIcon className="mx-auto h-12 w-12 text-gray-500" aria-hidden="true" />
                                <div className="mt-4 flex text-sm leading-6 text-gray-400">
                                    <label htmlFor="photo-upload-input" className="relative cursor-pointer rounded-md bg-gray-800 font-semibold text-blue-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-800 hover:text-blue-500">
                                        <span>Upload files</span>
                                        <input id="photo-upload-input" name="photo-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} multiple />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-400">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">Add Listing</button>
                </form>
            </div>
        )}

      {/* Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {listings.map(listing => (
          <Card key={listing.id} imageUrl={listing.imageUrls[0]} title={listing.title} actionText="View Details" onActionClick={() => onSelectItem(listing, 'accommodation')}>
            <div className="space-y-2 text-sm">
                <Rating rating={listing.rating} reviews={listing.reviews} />
                <p className="flex items-center gap-2 pt-1"><MapPinIcon className="w-4 h-4 text-blue-400"/> {listing.location} ({listing.distance})</p>
                <p className="text-2xl font-bold text-blue-500">₹{listing.rent.toLocaleString()}<span className="text-sm font-normal text-gray-400">/month</span></p>
                <div className="flex items-center space-x-4 pt-1">
                    <span className="flex items-center gap-1"><BuildingIcon className="w-4 h-4 text-gray-400"/> {listing.type}</span>
                    <span className="flex items-center gap-1"><UsersIcon className="w-4 h-4 text-gray-400"/> {listing.sharing}</span>
                </div>
                 <div className="flex flex-wrap gap-2 pt-2">
                  {listing.facilities.map(facility => (
                    <span key={facility} className="text-xs bg-blue-900/50 text-blue-300 px-2 py-1 rounded-full">{facility}</span>
                  ))}
                </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Accommodation;