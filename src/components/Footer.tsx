'use client'

import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 md:flex md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Greenfinch Real Estate Valuation. All rights reserved.
            </p>
          </div>
          <div className="mt-4 flex justify-center md:mt-0">
            <div className="text-sm text-gray-500">
              Field Visit Credibility Scorer v1.0
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
