import React, { useState, useMemo, useCallback } from 'react';
import type { ExpenseItem } from '../types';
import { XIcon } from '../components/icons';

const BudgetCalculator: React.FC = () => {
  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    { id: 1, name: 'Rent', amount: 8000 },
    { id: 2, name: 'Utilities (Wi-Fi, Electricity)', amount: 1000 },
    { id: 3, name: 'Transport', amount: 500 },
  ]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('');

  const totalExpenses = useMemo(() => {
    return expenses.reduce((total, item) => total + item.amount, 0);
  }, [expenses]);

  const addExpense = useCallback(() => {
    if (newItemName.trim() && newItemAmount) {
      const newExpense: ExpenseItem = {
        id: Date.now(),
        name: newItemName,
        amount: parseFloat(newItemAmount),
      };
      setExpenses(prev => [...prev, newExpense]);
      setNewItemName('');
      setNewItemAmount('');
    }
  }, [newItemName, newItemAmount]);
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addExpense();
    }
  };


  const removeExpense = (id: number) => {
    setExpenses(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-50">Monthly Budget Planner</h1>
        <p className="text-center text-gray-400 mb-8">Take control of your finances. Plan your expenses with ease.</p>

        <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
          <div className="space-y-4">
            {expenses.map(item => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <span className="text-gray-200">{item.name}</span>
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-gray-50">₹{item.amount.toLocaleString()}</span>
                  <button onClick={() => removeExpense(item.id)} className="text-gray-400 hover:text-red-500">
                    <XIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-700">
            <div className="flex justify-between items-center text-xl font-bold">
              <span className="text-gray-50">Total Monthly Expenses:</span>
              <span className="text-blue-400">₹{totalExpenses.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-700">
             <h3 className="text-lg font-semibold mb-4 text-gray-50">Add New Expense</h3>
             <div className="flex flex-col sm:flex-row gap-4">
                 <input
                    type="text"
                    value={newItemName}
                    onChange={e => setNewItemName(e.target.value)}
                    placeholder="Expense Name (e.g., Groceries)"
                    className="flex-grow bg-gray-700 border-gray-600 text-gray-200 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
                 />
                 <input
                    type="number"
                    value={newItemAmount}
                    onChange={e => setNewItemAmount(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Amount (₹)"
                    className="w-full sm:w-32 bg-gray-700 border-gray-600 text-gray-200 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
                 />
                 <button 
                    onClick={addExpense}
                    className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-700 transition-colors">
                    Add
                 </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetCalculator;