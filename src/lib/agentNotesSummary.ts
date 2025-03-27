'use client'

import { useState, useEffect } from 'react'

// Function to generate a professional summary from agent notes
export interface NotesSummaryResult {
  summary: string
  keyPoints: string[]
}

export function useAgentNotesSummary() {
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false)
  const [summaryResult, setSummaryResult] = useState<NotesSummaryResult | null>(null)

  // Function to generate a professional summary from agent notes
  const generateSummary = async (text: string): Promise<NotesSummaryResult> => {
    setIsGeneratingSummary(true)
    
    try {
      // In a real application, this would call an AI service
      // For now, we'll simulate summary generation
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Extract key points from text
      const lines = text.split(/[.।]/).filter(line => line.trim().length > 0)
      const keyPoints: string[] = []
      
      // Select up to 4 key points
      for (let i = 0; i < Math.min(lines.length, 4); i++) {
        const line = lines[i].trim()
        if (line.length > 0) {
          keyPoints.push(line)
        }
      }
      
      // Generate summary based on text content
      let summary = ''
      
      if (text.toLowerCase().includes('property') || text.toLowerCase().includes('प्रॉपर्टी')) {
        if (text.toLowerCase().includes('good') || text.toLowerCase().includes('excellent') || text.toLowerCase().includes('अच्छी')) {
          summary = 'Property is in good condition with favorable location characteristics. '
        } else if (text.toLowerCase().includes('average') || text.toLowerCase().includes('ok') || text.toLowerCase().includes('ठीक')) {
          summary = 'Property is in average condition with some concerns noted. '
        } else {
          summary = 'Property condition requires further assessment. '
        }
        
        if (text.toLowerCase().includes('crore') || text.toLowerCase().includes('करोड़')) {
          summary += 'Property valuation is in the crore range, indicating premium segment. '
        } else if (text.toLowerCase().includes('lakh') || text.toLowerCase().includes('लाख')) {
          summary += 'Property valuation is in the lakh range. '
        }
        
        if (text.toLowerCase().includes('document') || text.toLowerCase().includes('दस्तावेज़')) {
          if (text.toLowerCase().includes('verified') || text.toLowerCase().includes('सत्यापित')) {
            summary += 'All documentation has been verified and appears to be in order.'
          } else {
            summary += 'Documentation requires further verification.'
          }
        }
      } else {
        summary = 'Agent notes describe a property with various characteristics that require assessment for accurate valuation. Further verification of documentation and property condition is recommended.'
      }
      
      return {
        summary,
        keyPoints
      }
    } catch (error) {
      console.error('Error generating summary:', error)
      throw error
    } finally {
      setIsGeneratingSummary(false)
    }
  }
  
  return {
    generateSummary,
    isGeneratingSummary,
    summaryResult,
    setSummaryResult
  }
}
