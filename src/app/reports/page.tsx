'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Reports() {
  const [reports, setReports] = useState([
    {
      id: 1,
      address: '123 Rajiv Gandhi Marg, Sector 14, Gurugram',
      pincode: '122001',
      date: '2025-03-25',
      score: 82,
      valuation: '1.75'
    },
    {
      id: 2,
      address: '45B Nehru Colony, Vaishali Nagar, Jaipur',
      pincode: '302021',
      date: '2025-03-24',
      score: 65,
      valuation: '0.95'
    },
    {
      id: 3,
      address: '78/2 Shastri Nagar, Andheri West, Mumbai',
      pincode: '400053',
      date: '2025-03-22',
      score: 91,
      valuation: '3.25'
    }
  ])

  // Format valuation in Indian currency format (lakhs/crores)
  const formatIndianCurrency = (value: string) => {
    const numValue = parseFloat(value)
    if (numValue >= 100) {
      return `${(numValue / 100).toFixed(2)} Crores`
    } else {
      return `${numValue} Lakhs`
    }
  }
  
  // Get score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <main className="min-h-screen p-6 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-green-700">Property Valuation Reports</h1>
          <Link href="/" className="text-green-600 hover:text-green-800">
            Back to Home
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-green-200">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-green-600 mb-2">Recent Reports</h2>
            <p className="text-gray-600">View and export previously generated property valuation reports</p>
          </div>
          
          {reports.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Property Address
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pincode
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Valuation
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {report.address}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {report.pincode}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(report.date).toLocaleDateString('en-IN')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScoreColor(report.score)} bg-opacity-10 bg-current`}>
                          {report.score}/100
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        ₹{formatIndianCurrency(report.valuation)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link 
                          href={`/property-assessment/results?score=${report.score}&valuation=${report.valuation}`}
                          className="text-green-600 hover:text-green-900 mr-4"
                        >
                          View
                        </Link>
                        <button className="text-green-600 hover:text-green-900">
                          Export PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No reports available yet</p>
              <Link 
                href="/property-assessment" 
                className="mt-4 inline-block btn-primary"
              >
                Create New Assessment
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
