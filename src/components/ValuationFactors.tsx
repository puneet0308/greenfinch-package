'use client'

import React from 'react'

interface ValuationFactorsProps {
  factors: {
    name: string
    status: 'positive' | 'neutral' | 'negative'
  }[]
}

export default function ValuationFactors({ factors }: ValuationFactorsProps) {
  const getStatusColor = (status: 'positive' | 'neutral' | 'negative') => {
    switch (status) {
      case 'positive':
        return 'bg-green-500'
      case 'neutral':
        return 'bg-yellow-500'
      case 'negative':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="mb-8">
      <h3 className="section-title">Valuation Factors</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {factors.map((factor, index) => (
          <div key={index} className="flex items-center">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(factor.status)} mr-2`}></div>
            <span className="text-gray-700">{factor.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
