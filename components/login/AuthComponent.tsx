/*eslint-disable*/
'use client'
import { useState } from 'react';
import { signIn } from "next-auth/react";
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

type Provider = 'GitHub' | 'Google';

export default function SignInPage() {
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn = async (provider: Provider) => {
        setIsLoading(true);
        setMessage(`Signing in with ${provider}...`);
        
        try {
            await signIn(provider.toLowerCase() as 'github' | 'google');
        } catch (error) {
            console.error(`Sign in error with ${provider}:`, error);
            setMessage(`Error signing in with ${provider}. Please try again.`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
            <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transform transition-all hover:scale-105 duration-300 ease-in-out">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                        Welcome Back
                    </h1>
                    <p className="text-gray-500">Sign in to continue to your account</p>
                </div>
                
                <div className="space-y-4">
                    <button 
                        onClick={() => handleSignIn('GitHub')}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center shadow-inner shadow-cyan-300/30 hover:shadow-lg space-x-3 bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition duration-300 ease-in-out transform hover:scale-[1.02] disabled:opacity-50"
                    >
                        <FaGithub className="text-2xl" />
                        <span>Continue with GitHub</span>
                    </button>
                    
                    <div className="flex items-center justify-center space-x-4 my-4">
                        <div className="h-[1px] bg-gray-300 w-full"></div>
                        <span className="text-gray-500 text-sm">OR</span>
                        <div className="h-[1px] bg-gray-300 w-full"></div>
                    </div>
                    
                    <button 
                        onClick={() => handleSignIn('Google')}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center space-x-3 bg-white border border-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-50 transition shadow-inner shadow-black/30 hover:shadow-lg duration-300 ease-in-out transform hover:scale-105 "
                    >
                        <FcGoogle className="text-2xl" />
                        <span>Continue with Google</span>
                    </button>
                </div>
                
                {message && (
                    <div className={`mt-6 text-center ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}