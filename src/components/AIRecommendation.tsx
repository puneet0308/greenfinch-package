'use client'

import React from 'react'

interface AIRecommendationProps {
  score: number
  recommendations: string
}

export default function AIRecommendation({ score, recommendations }: AIRecommendationProps) {
  // Get recommendation type based on score
  const getRecommendationType = (score: number) => {
    if (score >= 80) return 'positive'
    if (score >= 60) return 'moderate'
    return 'negative'
  }

  const recommendationType = getRecommendationType(score)

  return (
    <div className="mb-8">
      <h3 className="section-title">AI Recommendations</h3>
      <div className={`p-4 rounded-md ${
        recommendationType === 'positive' 
          ? 'bg-green-50 border border-green-200' 
          : recommendationType === 'moderate'
            ? 'bg-yellow-50 border border-yellow-200'
            : 'bg-red-50 border border-red-200'
      }`}>
        <p className="text-gray-700 mb-4">
          Based on our analysis, this property shows {
            recommendationType === 'positive' 
              ? 'strong' 
              : recommendationType === 'moderate' 
                ? 'moderate' 
                : 'weak'
          } investment potential.
          {recommendations}
        </p>
        <p className="text-gray-700 font-medium">
          {recommendationType !== 'negative' 
            ? 'We recommend proceeding with the valuation process while addressing any noted concerns.'
            : 'We recommend gathering additional documentation and verification before proceeding with the valuation process.'}
        </p>
      </div>
    </div>
  )
}
