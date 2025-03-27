'use client'

import { useState, useEffect } from 'react'

// Types for property assessment data
export interface PropertyAssessmentData {
  pincode: string
  propertyAddress: string
  neighbourConfirmation: string
  employmentProof: string
  addressMatchingAadhaar: string
  rentAgreement: string
  nearbyCondition: string
  roadAccess: string
  roadWidth: string
  nearbySoldProperty: string
  additionalNotes: string
  images: File[]
  agentNotesImages: File[]
  extractedNotes: string
}

// Types for valuation result
export interface ValuationResult {
  score: number
  valuation: string
  loanRecommendation: {
    status: 'okay' | 'caution' | 'not_recommended'
    range: string
    message: string
  }
  factors: {
    name: string
    status: 'positive' | 'neutral' | 'negative'
    weight: number
    contribution: number
  }[]
}

export function usePropertyValuation() {
  const [isCalculating, setIsCalculating] = useState(false)
  const [result, setResult] = useState<ValuationResult | null>(null)

  // Function to calculate property valuation based on assessment data
  const calculateValuation = async (data: PropertyAssessmentData): Promise<ValuationResult> => {
    setIsCalculating(true)
    
    try {
      // In a real application, this would call an AI service
      // For now, we'll implement a simplified algorithm
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Base valuation (in lakhs) - would be based on pincode/location in real app
      let baseValuation = 0
      
      // Simple pincode-based valuation (higher for major cities)
      // Mumbai
      if (data.pincode.startsWith('400') || data.pincode.startsWith('401')) {
        baseValuation = 200 // 2 crores base for Mumbai
      } 
      // Delhi
      else if (data.pincode.startsWith('110')) {
        baseValuation = 150 // 1.5 crores base for Delhi
      }
      // Bangalore
      else if (data.pincode.startsWith('560')) {
        baseValuation = 120 // 1.2 crores base for Bangalore
      }
      // Chennai
      else if (data.pincode.startsWith('600')) {
        baseValuation = 100 // 1 crore base for Chennai
      }
      // Hyderabad
      else if (data.pincode.startsWith('500')) {
        baseValuation = 90 // 90 lakhs base for Hyderabad
      }
      // Pune
      else if (data.pincode.startsWith('411')) {
        baseValuation = 80 // 80 lakhs base for Pune
      }
      // Other cities
      else {
        baseValuation = 50 // 50 lakhs base for other locations
      }
      
      // Initialize factors with weights
      const factors = [
        {
          name: 'Location and Pincode Analysis',
          status: 'positive' as const,
          weight: 0.25,
          contribution: 0
        },
        {
          name: 'Property Documentation',
          status: 'neutral' as const,
          weight: 0.15,
          contribution: 0
        },
        {
          name: 'Neighborhood Condition',
          status: 'neutral' as const,
          weight: 0.15,
          contribution: 0
        },
        {
          name: 'Road Access and Infrastructure',
          status: 'neutral' as const,
          weight: 0.15,
          contribution: 0
        },
        {
          name: 'Recent Sales Comparison',
          status: 'neutral' as const,
          weight: 0.20,
          contribution: 0
        },
        {
          name: 'Image Analysis',
          status: 'neutral' as const,
          weight: 0.10,
          contribution: 0
        }
      ]
      
      // Calculate documentation factor
      let docScore = 0
      if (data.neighbourConfirmation === 'yes') docScore += 33
      else if (data.neighbourConfirmation === 'partial') docScore += 16
      
      if (data.employmentProof === 'yes') docScore += 33
      else if (data.employmentProof === 'partial') docScore += 16
      
      if (data.addressMatchingAadhaar === 'yes') docScore += 34
      else if (data.addressMatchingAadhaar === 'partial') docScore += 17
      
      factors[1].status = docScore >= 70 ? 'positive' : docScore >= 40 ? 'neutral' : 'negative'
      factors[1].contribution = (docScore / 100) * factors[1].weight * 100
      
      // Calculate neighborhood condition factor
      let neighborhoodScore = 0
      if (data.nearbyCondition.toLowerCase().includes('good') || 
          data.nearbyCondition.toLowerCase().includes('excellent') ||
          data.nearbyCondition.toLowerCase().includes('premium')) {
        neighborhoodScore = 90
        factors[2].status = 'positive'
      } else if (data.nearbyCondition.toLowerCase().includes('average') || 
                data.nearbyCondition.toLowerCase().includes('ok')) {
        neighborhoodScore = 60
        factors[2].status = 'neutral'
      } else {
        neighborhoodScore = 30
        factors[2].status = 'negative'
      }
      factors[2].contribution = (neighborhoodScore / 100) * factors[2].weight * 100
      
      // Calculate road access factor
      let roadScore = 0
      
      // Road access quality
      if (data.roadAccess.toLowerCase().includes('good') || 
          data.roadAccess.toLowerCase().includes('excellent') ||
          data.roadAccess.toLowerCase().includes('direct')) {
        roadScore += 50
      } else if (data.roadAccess.toLowerCase().includes('average') || 
                data.roadAccess.toLowerCase().includes('ok')) {
        roadScore += 30
      } else {
        roadScore += 10
      }
      
      // Road width
      const roadWidthStr = data.roadWidth.replace(/[^0-9.]/g, '')
      const roadWidth = parseFloat(roadWidthStr || '0')
      
      if (roadWidth >= 30) roadScore += 50
      else if (roadWidth >= 20) roadScore += 40
      else if (roadWidth >= 15) roadScore += 30
      else if (roadWidth >= 10) roadScore += 20
      else roadScore += 10
      
      factors[3].status = roadScore >= 70 ? 'positive' : roadScore >= 40 ? 'neutral' : 'negative'
      factors[3].contribution = (roadScore / 100) * factors[3].weight * 100
      
      // Calculate recent sales factor
      let salesScore = 0
      if (data.nearbySoldProperty && data.nearbySoldProperty.length > 0) {
        // Check if mentions high values
        if (data.nearbySoldProperty.toLowerCase().includes('crore') || 
            data.nearbySoldProperty.toLowerCase().includes('high') ||
            data.nearbySoldProperty.toLowerCase().includes('expensive')) {
          salesScore = 90
          factors[4].status = 'positive'
        } else if (data.nearbySoldProperty.toLowerCase().includes('average') || 
                  data.nearbySoldProperty.toLowerCase().includes('moderate')) {
          salesScore = 60
          factors[4].status = 'neutral'
        } else {
          salesScore = 30
          factors[4].status = 'negative'
        }
      } else {
        salesScore = 50
        factors[4].status = 'neutral'
      }
      factors[4].contribution = (salesScore / 100) * factors[4].weight * 100
      
      // Image analysis factor (simplified)
      const imageScore = data.images.length > 0 ? 80 : 40
      factors[5].status = imageScore >= 70 ? 'positive' : imageScore >= 40 ? 'neutral' : 'negative'
      factors[5].contribution = (imageScore / 100) * factors[5].weight * 100
      
      // Calculate overall credibility score
      const credibilityScore = Math.round(
        factors.reduce((sum, factor) => sum + factor.contribution, 0)
      )
      
      // Adjust valuation based on factors
      let valuationMultiplier = 1.0
      
      // Documentation affects valuation
      if (factors[1].status === 'positive') valuationMultiplier += 0.1
      else if (factors[1].status === 'negative') valuationMultiplier -= 0.15
      
      // Neighborhood condition affects valuation
      if (factors[2].status === 'positive') valuationMultiplier += 0.15
      else if (factors[2].status === 'negative') valuationMultiplier -= 0.2
      
      // Road access affects valuation
      if (factors[3].status === 'positive') valuationMultiplier += 0.1
      else if (factors[3].status === 'negative') valuationMultiplier -= 0.15
      
      // Recent sales comparison affects valuation
      if (factors[4].status === 'positive') valuationMultiplier += 0.15
      else if (factors[4].status === 'negative') valuationMultiplier -= 0.1
      
      // Calculate final valuation
      const finalValuation = baseValuation * valuationMultiplier
      
      // Determine loan recommendation based on valuation
      let loanRecommendation = {
        status: 'okay' as const,
        range: '',
        message: ''
      }
      
      if (finalValuation <= 40) {
        loanRecommendation = {
          status: 'okay',
          range: '20 lac - 40 lac',
          message: 'Loan approval recommended within this range.'
        }
      } else if (finalValuation <= 80) {
        loanRecommendation = {
          status: 'caution',
          range: '40 lac - 80 lac',
          message: 'Proceed with caution. Additional verification recommended.'
        }
      } else {
        loanRecommendation = {
          status: 'not_recommended',
          range: 'Above 80 lac',
          message: 'Loan not recommended at this valuation without substantial additional verification.'
        }
      }
      
      // Return valuation result
      return {
        score: credibilityScore,
        valuation: finalValuation.toFixed(2),
        loanRecommendation,
        factors
      }
    } catch (error) {
      console.error('Error calculating valuation:', error)
      throw error
    } finally {
      setIsCalculating(false)
    }
  }
  
  return {
    calculateValuation,
    isCalculating,
    result,
    setResult
  }
}
