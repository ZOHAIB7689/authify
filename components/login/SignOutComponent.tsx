/* eslint-disable */

'use client'

import { signOut } from "next-auth/react";
import { useState } from "react";

export default function SignOutPage() {
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

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4">Sign Out</h1>
                <p className="text-center text-gray-500 mb-6">
                    Are you sure you want to log out? We'll miss you!
                </p>
                <div className="flex flex-col items-center">
                    <button
                        onClick={handleSignOut}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md text-lg font-medium transition duration-200"
                    >
                        Sign Out
                    </button>
                </div>
                {message && (
                    <p
                        className={`text-center mt-4 ${
                            message.includes("successfully")
                                ? "text-green-500"
                                : "text-red-500"
                        }`}
                    >
                        {message}
                    </p>
                )}
            </div>
            <div className="mt-6">
                <img
                    src="/signout.jpg"
                    alt="Logout Illustration"
                    className="w-80 h-auto rounded-md shadow-md"
                />
            </div>
        </div>
    );
}
