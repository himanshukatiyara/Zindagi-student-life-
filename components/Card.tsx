import React from 'react';

interface CardProps {
  imageUrl: string;
  title: string;
  children: React.ReactNode;
  actionText?: string;
  onActionClick?: () => void;
}

const Card: React.FC<CardProps> = ({ imageUrl, title, children, actionText, onActionClick }) => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg shadow-black/30 overflow-hidden hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1 border border-gray-700 hover:border-blue-600/50">
      <img className="h-48 w-full object-cover" src={imageUrl} alt={title} />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-50 mb-2 truncate">{title}</h3>
        <div className="text-gray-300 space-y-2">
          {children}
        </div>
      </div>
      {actionText && onActionClick && (
         <div className="p-6 pt-0">
             <button 
                onClick={onActionClick}
                className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
             >
                {actionText}
             </button>
         </div>
      )}
    </div>
  );
};

export default Card;