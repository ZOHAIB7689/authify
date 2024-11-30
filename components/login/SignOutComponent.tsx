/*eslint-disable*/
'use client'
import { signOut } from "next-auth/react";
import { useState } from "react";
import { motion } from 'framer-motion';

const SignOutPage = () => {
  const [message, setMessage] = useState("");

  const handleSignOut = async () => {
    try {
      await signOut();
      setMessage("Successfully signed out!");
    } catch (error) {
      console.error("Sign out error:", error);
      setMessage("Error signing out. Please try again.");
    }
  };

  const buttonVariants = {
    
    initial: { scale: 1, rotateX: 0 },
    hover: { scale: 1.05, rotateX: 10 },
    tap: { scale: 0.95, rotateX: -10 }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative bg-[url('/signup.jpg')] bg-center bg-cover overflow-hidden">
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
            Sign Out
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-500"
          >
            Are you sure you want to log out? We'll miss you!
          </motion.p>
        </div>
        
        <div className="flex flex-col items-center">
          <motion.button 
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={handleSignOut}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md text-lg font-medium transition duration-200"
          >
            Sign Out
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

export default SignOutPage;