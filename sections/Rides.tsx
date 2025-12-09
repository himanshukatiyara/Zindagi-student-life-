import React, { useState } from 'react';
import { BikeIcon, CarIcon, ClockIcon, IndianRupeeIcon, UserCheckIcon, StarIcon, CircleDotIcon, LocateFixedIcon } from '../components/icons';
import type { Vehicle, RideDetails, Driver } from '../types';
import Card from '../components/Card';

const dummyVehicles: Vehicle[] = [
    { id: 'b1', name: 'Honda Activa', type: 'Bike', pricePerDay: 300, imageUrl: 'https://images.unsplash.com/photo-1599032909199-8d48a609d846?w=400&q=80' },
    { id: 'b2', name: 'Bajaj Pulsar', type: 'Bike', pricePerDay: 450, imageUrl: 'https://images.unsplash.com/photo-1625043819042-1b8a9134a4a5?w=400&q=80' },
    { id: 'c1', name: 'Maruti Swift', type: 'Car', pricePerDay: 1200, imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&q=80' },
    { id: 'c2', name: 'Hyundai i20', type: 'Car', pricePerDay: 1400, imageUrl: 'https://images.unsplash.com/photo-1617469737334-a5e2e8b61e2f?w=400&q=80' },
];

type BookingStep = 'initial' | 'details' | 'searching' | 'confirmed';

const Rides: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ride' | 'rent'>('ride');
  const [bookingStep, setBookingStep] = useState<BookingStep>('initial');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [rideDetails, setRideDetails] = useState<RideDetails | null>(null);
  const [driver, setDriver] = useState<Driver | null>(null);

  const handleFindRide = () => {
    if (!pickupLocation || !dropoffLocation) {
        alert("Please enter both pickup and drop-off locations.");
        return;
    }
    setBookingStep('searching');
    setTimeout(() => {
        const time = Math.floor(Math.random() * 25) + 20; // 20-45 mins
        const fare = Math.floor(Math.random() * 250) + 150; // 150-400 INR
        setRideDetails({ time, fare });
        setBookingStep('details');
    }, 1500);
  };
  
  const handleConfirmBooking = () => {
    setBookingStep('searching');
    setTimeout(() => {
      const drivers = [
        { name: 'Ravi Kumar', car: 'Maruti Dzire', rating: 4.8, eta: 5, imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80' },
        { name: 'Sunil Sharma', car: 'Hyundai Verna', rating: 4.9, eta: 7, imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80'},
      ];
      setDriver(drivers[Math.floor(Math.random() * drivers.length)]);
      setBookingStep('confirmed');
    }, 2500);
  };

  const handleReset = () => {
    setBookingStep('initial');
    setPickupLocation('');
    setDropoffLocation('');
    setRideDetails(null);
    setDriver(null);
  };

  const renderRideBooking = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 h-full flex flex-col">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-50">Book a Ride in Navi Mumbai</h2>
                
                {bookingStep === 'initial' && (
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="pickup" className="block text-sm font-medium text-gray-300">Pickup Location</label>
                            <input type="text" id="pickup" placeholder="e.g., Vashi Station" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} className="mt-1 block w-full bg-gray-700 border-gray-600 text-gray-200 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3" />
                        </div>
                        <div>
                            <label htmlFor="dropoff" className="block text-sm font-medium text-gray-300">Drop-off Location</label>
                            <input type="text" id="dropoff" placeholder="e.g., Seawoods Grand Central" value={dropoffLocation} onChange={(e) => setDropoffLocation(e.target.value)} className="mt-1 block w-full bg-gray-700 border-gray-600 text-gray-200 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3" />
                        </div>
                        <button onClick={handleFindRide} className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors mt-6">
                            Find Ride
                        </button>
                    </div>
                )}

                {(bookingStep === 'searching') && (
                    <div className="text-center flex-grow flex flex-col justify-center items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
                        <p className="mt-4 text-gray-300">{rideDetails ? 'Assigning a driver...' : 'Finding best rides...'}</p>
                    </div>
                )}

                {bookingStep === 'details' && rideDetails && (
                     <div className="space-y-4">
                        <div className="p-3 bg-gray-700 rounded-md">
                            <p className="text-xs text-gray-400">From</p>
                            <p className="font-semibold">{pickupLocation}</p>
                        </div>
                         <div className="p-3 bg-gray-700 rounded-md">
                            <p className="text-xs text-gray-400">To</p>
                            <p className="font-semibold">{dropoffLocation}</p>
                        </div>
                        <div className="flex justify-around text-center py-4">
                            <div className="flex items-center gap-2">
                                <ClockIcon className="w-6 h-6 text-blue-400"/>
                                <div>
                                    <p className="font-bold text-lg">{rideDetails.time} min</p>
                                    <p className="text-xs text-gray-400">Time</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <IndianRupeeIcon className="w-6 h-6 text-blue-400"/>
                                 <div>
                                    <p className="font-bold text-lg">{rideDetails.fare.toLocaleString()}</p>
                                    <p className="text-xs text-gray-400">Est. Fare</p>
                                </div>
                            </div>
                        </div>
                         <button onClick={handleConfirmBooking} className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors mt-6">
                            Confirm Booking
                        </button>
                    </div>
                )}

                {bookingStep === 'confirmed' && driver && (
                    <div className="text-center flex flex-col justify-center flex-grow">
                        <UserCheckIcon className="w-16 h-16 mx-auto text-green-400 mb-4"/>
                        <h3 className="text-2xl font-bold text-gray-50">Driver Assigned!</h3>
                        <div className="bg-gray-700 p-4 rounded-lg mt-4 flex items-center gap-4">
                            <img src={driver.imageUrl} alt={driver.name} className="w-16 h-16 rounded-full object-cover"/>
                            <div className="text-left">
                                <p className="font-bold text-lg">{driver.name}</p>
                                <p className="text-sm text-gray-300">{driver.car}</p>
                                <div className="flex items-center gap-1 text-sm">
                                    <StarIcon className="w-4 h-4 text-yellow-400 fill-current"/> {driver.rating}
                                </div>
                            </div>
                             <div className="ml-auto text-right">
                                <p className="font-bold text-xl text-blue-400">{driver.eta} min</p>
                                <p className="text-xs text-gray-400">ETA</p>
                            </div>
                        </div>
                        <button onClick={handleReset} className="w-full bg-gray-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-gray-500 transition-colors mt-6">
                            Book Another Ride
                        </button>
                    </div>
                )}
            </div>
             <div className="relative h-96 lg:h-full w-full rounded-xl overflow-hidden shadow-lg border border-gray-700">
                <img src="https://images.unsplash.com/photo-1594420364909-323219491a32?w=800&q=80" alt="Map of Navi Mumbai" className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-gray-900/60 backdrop-brightness-75"></div>
                <div className="absolute top-1/4 left-1/4 text-white">
                    <LocateFixedIcon className="w-8 h-8 text-blue-400 animate-pulse"/>
                </div>
                 <div className="absolute bottom-1/3 right-1/3 text-white">
                    <CircleDotIcon className="w-8 h-8 text-green-400 animate-pulse"/>
                </div>
            </div>
        </div>
    );
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center mb-2 text-gray-50">Your Commute, Simplified</h1>
      <p className="text-center text-gray-400 mb-8">Book a ride or rent a vehicle. We've got you covered.</p>
      
      <div className="w-full max-w-md mx-auto bg-gray-950 rounded-full p-1 flex space-x-1 mb-10">
        <button
          onClick={() => setActiveTab('ride')}
          className={`w-full py-2.5 text-sm font-medium leading-5 rounded-full transition-colors ${
            activeTab === 'ride' ? 'bg-gray-800 text-gray-50 shadow' : 'text-gray-400 hover:bg-gray-800/[0.5]'
          }`}
        >
          Book a Ride
        </button>
        <button
          onClick={() => setActiveTab('rent')}
          className={`w-full py-2.5 text-sm font-medium leading-5 rounded-full transition-colors ${
            activeTab === 'rent' ? 'bg-gray-800 text-gray-50 shadow' : 'text-gray-400 hover:bg-gray-800/[0.5]'
          }`}
        >
          Rent a Vehicle
        </button>
      </div>

      {activeTab === 'ride' && renderRideBooking()}
      
      {activeTab === 'rent' && (
        <div>
           <h2 className="text-2xl font-bold mb-6 text-center text-gray-50">Rent a Vehicle by the Day</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {dummyVehicles.map(vehicle => (
                    <Card key={vehicle.id} imageUrl={vehicle.imageUrl} title={vehicle.name} actionText="Rent Now">
                        <div className="space-y-2 text-sm">
                            <p className="flex items-center gap-2">
                                {vehicle.type === 'Bike' ? <BikeIcon className="w-4 h-4 text-gray-400" /> : <CarIcon className="w-4 h-4 text-gray-400" />}
                                {vehicle.type}
                            </p>
                            <p className="text-2xl font-bold text-blue-500">₹{vehicle.pricePerDay}<span className="text-sm font-normal text-gray-400">/day</span></p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
      )}

    </div>
  );
};

export default Rides;