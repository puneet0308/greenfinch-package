'use client'

import React, { useState, useEffect } from 'react'
import { useImageAnalysis, ImageAnalysisResult } from '@/lib/imageAnalysis'

interface ImageAnalyzerProps {
  images: File[]
  onAnalysisComplete: (results: ImageAnalysisResult[]) => void
}

export default function ImageAnalyzer({ images, onAnalysisComplete }: ImageAnalyzerProps) {
  const { analyzeImages, isAnalyzing, analysisResults } = useImageAnalysis()
  const [showResults, setShowResults] = useState(false)
  
  useEffect(() => {
    if (images.length > 0) {
      const runAnalysis = async () => {
        const results = await analyzeImages(images)
        onAnalysisComplete(results)
        setShowResults(true)
      }
      
      runAnalysis()
    } else {
      setShowResults(false)
    }
  }, [images])
  
  if (images.length === 0) {
    return null
  }
  
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-2">Image Analysis</h3>
      
      {isAnalyzing ? (
        <div className="bg-blue-50 p-4 rounded-md flex items-center">
          <svg className="animate-spin h-5 w-5 mr-3 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Analyzing {images.length} image{images.length > 1 ? 's' : ''}...</span>
        </div>
      ) : showResults && analysisResults.length > 0 ? (
        <div className="space-y-4">
          {analysisResults.map((result, index) => (
            <div key={index} className="bg-white p-4 rounded-md border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-900">Image {index + 1} Analysis</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  result.quality === 'high' 
                    ? 'bg-green-100 text-green-800' 
                    : result.quality === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                }`}>
                  {result.quality.charAt(0).toUpperCase() + result.quality.slice(1)} Quality
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Property Type</p>
                  <p className="font-medium text-gray-900">{result.propertyType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Confidence Score</p>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900 mr-2">{result.confidenceScore}%</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          result.confidenceScore >= 85 
                            ? 'bg-green-600' 
                            : result.confidenceScore >= 75 
                              ? 'bg-yellow-500' 
                              : 'bg-red-500'
                        }`}
                        style={{ width: `${result.confidenceScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-3">
                <p className="text-sm text-gray-500 mb-1">Detected Features</p>
                <div className="flex flex-wrap gap-2">
                  {result.detectedFeatures.map((feature, featureIndex) => (
                    <span 
                      key={featureIndex}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-yellow-50 p-4 rounded-md">
          <p className="text-yellow-700">No analysis results available.</p>
        </div>
      )}
    </div>
  )
}
