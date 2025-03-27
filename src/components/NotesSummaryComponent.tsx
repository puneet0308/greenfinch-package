'use client'

import React, { useState, useEffect } from 'react'
import { useAgentNotesSummary, NotesSummaryResult } from '@/lib/agentNotesSummary'

interface NotesSummaryComponentProps {
  extractedText: string
  onSummaryGenerated: (summary: string, keyPoints: string[]) => void
}

export default function NotesSummaryComponent({ 
  extractedText, 
  onSummaryGenerated 
}: NotesSummaryComponentProps) {
  const { generateSummary, isGeneratingSummary } = useAgentNotesSummary()
  const [summary, setSummary] = useState<NotesSummaryResult | null>(null)
  
  useEffect(() => {
    if (extractedText && extractedText.trim().length > 0) {
      const generateSummaryForNotes = async () => {
        try {
          const result = await generateSummary(extractedText)
          setSummary(result)
          onSummaryGenerated(result.summary, result.keyPoints)
        } catch (error) {
          console.error('Error generating summary:', error)
        }
      }
      
      generateSummaryForNotes()
    } else {
      setSummary(null)
    }
  }, [extractedText])
  
  if (!extractedText || extractedText.trim().length === 0) {
    return null
  }
  
  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium text-gray-900 mb-2">Professional Summary</h3>
      
      {isGeneratingSummary ? (
        <div className="bg-blue-50 p-4 rounded-md flex items-center">
          <svg className="animate-spin h-5 w-5 mr-3 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Generating professional summary...</span>
        </div>
      ) : summary ? (
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-md border border-green-200">
            <p className="text-gray-800 font-medium">{summary.summary}</p>
          </div>
          
          {summary.keyPoints.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Key Points:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {summary.keyPoints.map((point, index) => (
                  <li key={index} className="text-gray-600">{point}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-yellow-50 p-4 rounded-md">
          <p className="text-yellow-700">Unable to generate summary from the provided text.</p>
        </div>
      )}
    </div>
  )
}
