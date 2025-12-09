// Fix: Add React import
import React from 'react';

export interface Listing {
  id: number;
  title: string;
  type: 'Flat' | 'PG' | 'Hostel';
  sharing: 'Single' | 'Double' | 'Triple';
  rent: number;
  location: string;
  distance: string;
  imageUrls: string[];
  facilities: string[];
  rating: number;
  reviews: number;
  description: string;
}

export interface RentalItem {
  id: number;
  name: string;
  category: string;
  price: number;
  duration: 'Day' | 'Week' | 'Month';
  imageUrl: string;
  location: string;
  rating: number;
  reviews: number;
  description: string;
}

export interface RideOption {
    id: string;
    name: string;
    description: string;
    icon: React.ComponentType<{className?: string}>;
}

export interface Vehicle {
    id: string;
    name: string;
    type: 'Bike' | 'Car';
    pricePerDay: number;
    imageUrl: string;
}


export interface ExpenseItem {
  id: number;
  name: string;
  amount: number;
}

export interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

export interface RideDetails {
  time: number;
  fare: number;
}

export interface Driver {
  name: string;
  car: string;
  rating: number;
  eta: number;
  imageUrl: string;
}