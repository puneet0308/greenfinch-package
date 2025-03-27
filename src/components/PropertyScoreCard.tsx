'use client'

import React from 'react'

interface PropertyScoreCardProps {
  score: number
  valuation: string
}

export default function PropertyScoreCard({ score, valuation }: PropertyScoreCardProps) {
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div className="card text-center">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Credibility Score</h3>
        <p className={`text-5xl font-bold ${getScoreColor(score)}`}>
          {score}<span className="text-sm font-normal text-gray-500">/100</span>
        </p>
        <div className="mt-4 bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${score >= 80 ? 'bg-green-600' : score >= 60 ? 'bg-yellow-500' : 'bg-red-600'}`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          {score >= 80 ? 'Excellent credibility' : 
           score >= 60 ? 'Good credibility with some concerns' : 
           'Low credibility, significant issues detected'}
        </p>
      </div>
      
      <div className="card text-center">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Property Valuation</h3>
        <p className="text-5xl font-bold text-green-700">
          ₹{formatIndianCurrency(valuation)}
        </p>
        <p className="mt-4 text-sm text-gray-600">
          Estimated market value based on provided information and AI analysis
        </p>
      </div>
    </div>
  )
}
