"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, User, HelpCircle } from 'lucide-react';

const SellerTopbar = () => {
    return (
        <div className="w-full bg-white shadow-md">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                {/* Logo and Navigation Links */}
                <div className="flex items-center space-x-8">
                    <Link href="/" className="text-2xl font-bold text-gray-900">
                        Bazario
                    </Link>
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link href="/become-a-seller" className="text-gray-700 hover:text-orange-600 transition duration-300">
                            Become a Seller
                        </Link>
                        <Link href="/seller-dashboard" className="text-gray-700 hover:text-orange-600 transition duration-300">
                            Seller Dashboard
                        </Link>
                        <Link href="/support" className="text-gray-700 hover:text-orange-600 transition duration-300">
                            Support
                        </Link>
                    </nav>
                </div>

                {/* Call-to-Action and User Actions */}
                <div className="flex items-center space-x-6">
                    <Link
                        href="/register-seller"
                        className="flex items-center bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition duration-300"
                    >
                        <span>Start Selling</span>
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>

                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/cart" className="text-gray-700 hover:text-orange-600 transition duration-300">
                            <ShoppingBag className="w-6 h-6" />
                        </Link>
                        <Link href="/account" className="text-gray-700 hover:text-orange-600 transition duration-300">
                            <User className="w-6 h-6" />
                        </Link>
                        <Link href="/help" className="text-gray-700 hover:text-orange-600 transition duration-300">
                            <HelpCircle className="w-6 h-6" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerTopbar;