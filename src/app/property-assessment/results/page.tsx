'use client'

import { motion } from 'framer-motion'

export default function AssessmentResults() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-white to-green-50 px-6 py-12"
    >
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-10 space-y-6">
        <h1 className="text-3xl font-bold text-green-700 text-center">Assessment Results</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="p-6 rounded-xl border border-gray-200 bg-green-50">
            <h2 className="text-lg font-semibold text-green-800">Valuation Summary</h2>
            <p className="mt-2 text-gray-700">
              Estimated Market Value: ₹1.2 Crore<br />
              Confidence Score: 92%<br />
              Property Type: Residential Apartment
            </p>
          </div>

          <div className="p-6 rounded-xl border border-gray-200 bg-green-50">
            <h2 className="text-lg font-semibold text-green-800">Agent Notes</h2>
            <p className="mt-2 text-gray-700">
              Property is well-maintained with no visible structural issues. Requires minor repainting in balcony areas.
            </p>
          </div>
        </div>

        <div className="text-center pt-6">
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition">
            Download PDF Report
          </button>
        </div>
      </div>
    </motion.main>
  )
}