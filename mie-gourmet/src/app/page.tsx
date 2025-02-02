'use client';
import { useState, useEffect } from 'react';
import Image from "next/image";
import {
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  HomeIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { FaInstagram } from 'react-icons/fa';
import { Listbox} from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';

// Import images - you'll need to move these to the public directory
import germanImage from '../../public/images/german/german_main.jpg';
import strawberryImage from '../../public/images/strawberry/strawberry_main.jpg';
import sweetPotatoImage from '../../public/images/sweet_potato/sweet_potato_main.jpg';
import pineappleImage from '../../public/images/pineapple/pineapple_main.jpg';
import titleImage from '../../public/images/logo/Mie-Title.svg';

// Import the useSort hook
import { useSort } from '../hooks/useSort';

const sortOptions = [
  { id: 'featured', name: 'Featured' },
  { id: 'name', name: 'Name' },
  { id: 'price-asc', name: 'Price: Low to High' },
  { id: 'price-desc', name: 'Price: High to Low' },
];

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Products data
  const products = [
    {
      id: 'german',
      name: "German Sweet Chocolate",
      price: 35.00,
      servings: "8-10",
      image: germanImage
    },
    {
      id: 'strawberry',
      name: "Strawberry Angel Cake",
      price: 35.00,
      servings: "8-10",
      image: strawberryImage
    },
    {
      id: 'sweet_potato',
      name: "So'Sweet Potato Cheesecake",
      price: 35.00,
      servings: "8-10",
      image: sweetPotatoImage
    },
    {
      id: 'pineapple',
      name: "The Pineapple UpsideDown",
      price: 35.00,
      servings: "8-10",
      image: pineappleImage
    }
  ];

  const { sortedItems, sortOption, setSortOption } = useSort(products);

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen font-['Helvetica','Arial',sans-serif]">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button 
            className="p-2 rounded-md hover:bg-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Bars3Icon className="h-6 w-6 text-white" />
          </button>
          
          <div className="flex-1 flex justify-center">
            <Image src={titleImage} 
            alt="Mie Gourmet" 
            width={180} 
            height={60} 
            className="h-12 w-auto" />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-md hover:bg-gray-800">
              <MagnifyingGlassIcon className="h-5 w-5 text-white" />
            </button>
            <button className="p-2 rounded-md hover:bg-gray-800">
              <UserIcon className="h-5 w-5 text-white" />
            </button>
            <button 
              className="p-2 rounded-md hover:bg-gray-800 relative"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <ShoppingCartIcon className="h-5 w-5 text-white" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Sidebar */}
      <nav className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform ${
        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-200 ease-in-out z-50`}>
        <div className="p-4">
          <button 
            className="p-2 hover:bg-gray-100 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            <XMarkIcon className="h-6 w-6 text-black" />
          </button>
        </div>
        <ul className="p-4">
          <li className="mb-4">
            <a href="#" className="flex items-center gap-2 text-black hover:text-gray-600">
              <HomeIcon className="h-4 w-4" /> Shop
            </a>
          </li>
          {/* ... other nav items */}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <section className="mb-12">
          <h1 className="text-3xl font-bold mb-4 tracking-widest uppercase">Original Cakes</h1>
          <p className="text-gray-600">
            Our locally made original cakes are handmade with premium ingredients.
          </p>
        </section>

        <section>
          <div className="flex justify-end mb-6">
            <div className="relative w-72">
              <Listbox value={sortOption} onChange={setSortOption}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-black py-2 pl-3 pr-10 text-left text-white shadow-md focus:outline-none">
                    <span className="block truncate">
                      {sortOptions.find(option => option.id === sortOption)?.name}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-black py-1 text-base shadow-lg focus:outline-none z-[60]">
                    {sortOptions.map((option) => (
                      <Listbox.Option
                        key={option.id}
                        value={option.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-gray-900 text-white' : 'text-gray-300'
                          }`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}>
                              {option.name}
                            </span>
                            {selected && (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            )}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {sortedItems.map((product) => (
              <div key={product.id} className="group">
                <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
          <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold mb-1 tracking-wider">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">Serves {product.servings}</p>
                  <p className="text-lg font-medium mb-3">${product.price.toFixed(2)}</p>
                  <button className="w-full bg-black text-white py-2 px-4 rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                    Add to Cart
                    <ShoppingCartIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Contact Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Shipping Information</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Returns & Exchanges</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Follow Us</h3>
              <a href="#" className="inline-flex items-center gap-2 text-gray-300 hover:text-white">
                <FaInstagram className="h-5 w-5" />
                Instagram
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 Mie Gourmet. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <div className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg transform ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-200 ease-in-out z-50`}>
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-black">
            <ShoppingCartIcon className="h-5 w-5 text-black" /> Your Cart
          </h2>
          <button 
            className="p-2 hover:bg-gray-100 rounded-md"
            onClick={() => setIsCartOpen(false)}
          >
            <XMarkIcon className="h-6 w-6 text-black" />
          </button>
        </div>
        <div className="p-4 text-black">
          {/* Cart content */}
          <p>Your cart is empty</p>
        </div>
      </div>

      {/* Overlay */}
      {(isCartOpen || isMenuOpen) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => {
            setIsCartOpen(false);
            setIsMenuOpen(false);
          }}
        />
      )}
    </div>
  );
}
