'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ReportsPage() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-green-50 to-white px-6 py-12"
    >
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-green-800">Generated Reports</h1>
          <p className="text-gray-600 mt-2">Browse your previously generated property reports</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((id) => (
            <div key={id} className="p-6 border border-gray-200 rounded-xl bg-white shadow-md hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-green-700">Report #{id}</h2>
              <p className="text-sm text-gray-600 mt-2">
                Location: Mumbai<br />
                Value: ₹1.1 Cr<br />
                Created: Mar 2025
              </p>
              <div className="mt-4 flex justify-between">
                <Link
                  href="#"
                  className="text-green-600 hover:underline text-sm font-medium"
                >
                  View Report
                </Link>
                <button className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.main>
  )
}