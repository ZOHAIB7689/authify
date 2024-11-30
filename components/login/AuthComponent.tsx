"use client"

import React from 'react';
import { useState } from 'react';
import { signIn } from "next-auth/react";
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';

type Provider = 'GitHub' | 'Google';

const SignInPage = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeButton, setActiveButton] = useState<Provider | null>(null);

  const handleSignIn = async (provider: Provider) => {
    setIsLoading(true);
    setActiveButton(provider);
    setMessage(`Signing in with ${provider}...`);
    
    try {
      await signIn(provider.toLowerCase() as 'github' | 'google');
    } catch (error) {
      console.error(`Sign in error with ${provider}:`, error);
      setMessage(`Error signing in with ${provider}. Please try again.`);
    } finally {
      setIsLoading(false);
      setActiveButton(null);
    }
  };

  const buttonVariants = {
    initial: { scale: 1, rotateX: 0 },
    hover: { scale: 1.05, rotateX: 10 },
    tap: { scale: 0.95, rotateX: -10 }
  };

  return (
    <div className="min-h-screen relative bg-[url('/signup.jpg')] bg-center bg-cover flex items-center justify-center p-4 overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div 
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: 0 
            }}
            animate={{ 
              x: [
                Math.random() * window.innerWidth, 
                Math.random() * window.innerWidth, 
                Math.random() * window.innerWidth
              ],
              y: [
                Math.random() * window.innerHeight, 
                Math.random() * window.innerHeight, 
                Math.random() * window.innerHeight
              ],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "loop"
            }}
            className="absolute w-2 h-2 rounded-full bg-orange-300/50"
          />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md relative z-10 overflow-hidden"
      >
        {/* Gradient Border */}
        <div className="absolute inset-0 border-4 border-transparent rounded-2xl bg-gradient-to-r from-orange-600/30 to-yellow-600/30 opacity-50 pointer-events-none"></div>

        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-yellow-600 mb-4"
          >
            Welcome Back
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-500"
          >
            Sign in to continue to your account
          </motion.p>
        </div>
        
        <div className="space-y-4">
          <motion.button 
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={() => handleSignIn('GitHub')}
            disabled={isLoading}
            className={`w-full flex items-center justify-center shadow-inner shadow-orange-300/30 hover:shadow-lg space-x-3 bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition duration-300 ease-in-out transform hover:scale-[1.02] disabled:opacity-50 ${
              activeButton === 'GitHub' ? 'animate-pulse' : ''
            }`}
          >
            <FaGithub className="text-2xl" />
            <span>Continue with GitHub</span>
          </motion.button>
          
          <div className="flex items-center justify-center space-x-4 my-4">
            <div className="h-[1px] bg-gray-300 w-full"></div>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-500 text-sm"
            >
              OR
            </motion.span>
            <div className="h-[1px] bg-gray-300 w-full"></div>
          </div>
          
          <motion.button 
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={() => handleSignIn('Google')}
            disabled={isLoading}
            className={`w-full flex items-center justify-center space-x-3 bg-white border border-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-50 transition shadow-inner shadow-black/30 hover:shadow-lg duration-300 ease-in-out transform hover:scale-105 ${
              activeButton === 'Google' ? 'animate-pulse' : ''
            }`}
          >
            <FcGoogle className="text-2xl" />
            <span>Continue with Google</span>
          </motion.button>
        </div>
        
        {message && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 text-center ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}
          >
            {message}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default SignInPage;