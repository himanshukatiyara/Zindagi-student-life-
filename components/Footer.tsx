import React from 'react';
import { FacebookIcon, TwitterIcon, InstagramIcon } from './icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-gray-300 mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-blue-500 mb-4">Zindagi</h3>
            <p className="text-gray-400 text-sm">Everything a Student Needs, All in One Place.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-100 mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-blue-400">Accommodation</a></li>
              <li><a href="#" className="hover:text-blue-400">Product Rentals</a></li>
              <li><a href="#" className="hover:text-blue-400">Vehicle Rentals</a></li>
              <li><a href="#" className="hover:text-blue-400">Rides</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-100 mb-4">About</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-blue-400">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400">Contact</a></li>
              <li><a href="#" className="hover:text-blue-400">FAQ</a></li>
              <li><a href="#" className="hover:text-blue-400">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-100 mb-4">Follow Us</h4>
             <div className="flex space-x-4">
               <a href="#" className="text-gray-400 hover:text-blue-400"><FacebookIcon/></a>
               <a href="#" className="text-gray-400 hover:text-blue-400"><TwitterIcon/></a>
               <a href="#" className="text-gray-400 hover:text-blue-400"><InstagramIcon/></a>
             </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Zindagi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;