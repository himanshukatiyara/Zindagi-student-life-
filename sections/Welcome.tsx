import React from 'react';
import { GoogleIcon, PhoneIcon } from '../components/icons';

interface WelcomeProps {
    onLogin: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onLogin }) => {
    return (
        <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse [animation-delay:-2s]"></div>

            <main className="z-10 text-center p-8 flex flex-col items-center">
                <h1 className="text-6xl md:text-8xl font-black mb-4 bg-gradient-to-r from-gray-50 to-gray-400 text-transparent bg-clip-text">
                    Zindagi
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12">
                    Everything a Student Needs, All in One Place.
                </p>
                <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-sm">
                    <h2 className="text-2xl font-bold mb-6">Welcome!</h2>
                    <div className="space-y-4">
                        <button className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 font-semibold py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                            <GoogleIcon />
                            Sign in with Google
                        </button>
                        <button className="w-full flex items-center justify-center gap-3 bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors">
                            <PhoneIcon className="w-5 h-5" />
                            Sign in with OTP
                        </button>
                    </div>
                    <div className="my-6 flex items-center">
                        <hr className="w-full border-gray-600" />
                        <span className="px-4 text-gray-400 text-sm">OR</span>
                        <hr className="w-full border-gray-600" />
                    </div>
                    <button onClick={onLogin} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                        Continue as Guest
                    </button>
                </div>
            </main>
        </div>
    );
}

export default Welcome;
