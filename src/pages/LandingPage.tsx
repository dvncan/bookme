import React from 'react';
import { Calendar, Clock, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Simple Booking System for Your Busy Schedule
              </h1>
              <p className="mt-4 text-xl text-blue-100">
                Let your clients book appointments without the back-and-forth emails. Available 24/7.
              </p>
              <div className="mt-8">
                <Link to="/booking">
                  <Button size="lg" variant="primary" className="bg-white text-blue-600 hover:bg-blue-50">
                    Book Now <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="md:w-1/2 md:pl-10">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 transform rotate-1 transition-transform hover:rotate-0">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">BookWise</span>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded p-4 mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-gray-800 dark:text-white">Select a Date & Time</h3>
                    <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 py-1 px-2 rounded">Step 1 of 3</span>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div key={i} className={`text-center py-2 text-sm rounded ${i === 3 ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'][i]}
                      </div>
                    ))}
                    
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div key={i} className={`text-center py-2 text-sm rounded ${i === 3 ? 'bg-blue-500 text-white' : 'border border-gray-200 dark:border-gray-700'}`}>
                        {10 + i}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <div className="px-3 py-2 bg-blue-500 text-white rounded text-sm">9:00 AM</div>
                    <div className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded text-sm">10:00 AM</div>
                    <div className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded text-sm">11:00 AM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Why Choose Our Booking System?
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Streamline your scheduling process with these powerful features
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
              <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                24/7 Availability
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Let clients book appointments anytime, even outside business hours. No more missed opportunities.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
              <div className="rounded-full bg-green-100 dark:bg-green-900 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                Avoid Double Bookings
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our system automatically prevents scheduling conflicts by only showing available time slots.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
              <div className="rounded-full bg-purple-100 dark:bg-purple-900 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                Simple Booking Process
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                A clean, intuitive interface makes it easy for clients to select dates, times, and complete bookings.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-700 dark:to-purple-800 rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Simplify Your Scheduling?
              </h2>
              <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
                Start booking appointments today and save time for what really matters
              </p>
              <Link to="/booking">
                <Button size="lg" variant="primary" className="bg-white text-blue-600 hover:bg-blue-50">
                  Get Started Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}