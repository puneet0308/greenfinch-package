'use client'

import React, { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import PropertyScoreCard from '@/components/PropertyScoreCard'
import ValuationFactors from '@/components/ValuationFactors'
import AIRecommendation from '@/components/AIRecommendation'
import PdfExportButton from '@/components/PdfExportButton'

// Loading component for Suspense
function ResultsLoading() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-green-700">Loading Results...</h1>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md border border-green-200 flex justify-center items-center">
          <div className="text-center">
            <svg className="animate-spin h-10 w-10 mx-auto mb-4 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-600">Loading property valuation results...</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Actual results component
function PropertyResultsContent() {
  const searchParams = useSearchParams()
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  
  // Get score and valuation from URL params
  const score = parseInt(searchParams.get('score') || '0')
  const valuation = searchParams.get('valuation') || '0'
  const loanRecommendationStatus = searchParams.get('loanStatus') || 'caution'
  const loanRecommendationRange = searchParams.get('loanRange') || '40 lac - 80 lac'
  
  // Mock valuation factors based on score
  const valuationFactors = [
    {
      name: 'Location and Pincode Analysis',
      status: score >= 70 ? 'positive' : score >= 50 ? 'neutral' : 'negative'
    },
    {
      name: 'Property Documentation',
      status: score >= 75 ? 'positive' : score >= 55 ? 'neutral' : 'negative'
    },
    {
      name: 'Neighborhood Condition',
      status: score >= 80 ? 'positive' : score >= 60 ? 'neutral' : 'negative'
    },
    {
      name: 'Road Access and Infrastructure',
      status: score >= 65 ? 'positive' : score >= 45 ? 'neutral' : 'negative'
    },
    {
      name: 'Recent Sales Comparison',
      status: score >= 70 ? 'positive' : score >= 50 ? 'neutral' : 'negative'
    },
    {
      name: 'Image Analysis',
      status: score >= 75 ? 'positive' : score >= 55 ? 'neutral' : 'negative'
    }
  ]
  
  // Generate recommendation based on score
  let recommendation = ''
  if (score >= 80) {
    recommendation = ' The documentation is complete, location is favorable, and the property condition appears to be well-maintained.'
  } else if (score >= 60) {
    recommendation = ' There are some concerns with documentation and verification that should be addressed for a more accurate valuation.'
  } else {
    recommendation = ' Significant issues with documentation, verification, and property condition were detected that substantially impact the valuation.'
  }
  
  // Format valuation in Indian currency format (lakhs/crores)
  const formatIndianCurrency = (value: string) => {
    const numValue = parseFloat(value)
    if (numValue >= 100) {
      return `${(numValue / 100).toFixed(2)} Crores`
    } else {
      return `${numValue} Lakhs`
    }
  }
  
  // Get loan recommendation color
  const getLoanRecommendationColor = (status: string) => {
    switch (status) {
      case 'okay':
        return 'bg-green-100 text-green-800'
      case 'caution':
        return 'bg-yellow-100 text-yellow-800'
      case 'not_recommended':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }
  
  // Get loan recommendation message
  const getLoanRecommendationMessage = (status: string) => {
    switch (status) {
      case 'okay':
        return 'Loan approval recommended within this range.'
      case 'caution':
        return 'Proceed with caution. Additional verification recommended.'
      case 'not_recommended':
        return 'Loan not recommended at this valuation without substantial additional verification.'
      default:
        return 'Unable to determine loan recommendation.'
    }
  }
  
  // Generate PDF report
  const generatePdfReport = async () => {
    setIsGeneratingPdf(true)
    
    try {
      // Create a simple HTML structure for the PDF
      const reportContent = document.createElement('div');
      reportContent.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #166534; margin-bottom: 5px;">Greenfinch Field Visit Credibility Scorer</h1>
          <h2 style="color: #333; margin-top: 0;">Property Valuation Report</h2>
          <p>Generated on ${new Date().toLocaleDateString('en-IN')}</p>
        </div>
        
        <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #ccc; border-radius: 5px;">
          <h3 style="color: #166534; margin-top: 0;">Credibility Score</h3>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="font-size: 24px; font-weight: bold;">${score}/100</div>
            <div style="font-size: 24px; font-weight: bold;">${formatIndianCurrency(valuation)}</div>
          </div>
        </div>
        
        <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #ccc; border-radius: 5px;">
          <h3 style="color: #166534; margin-top: 0;">Loan Recommendation</h3>
          <div style="padding: 10px; background-color: ${loanRecommendationStatus === 'okay' ? '#dcfce7' : loanRecommendationStatus === 'caution' ? '#fef9c3' : '#fee2e2'}; border-radius: 5px;">
            <div style="font-weight: bold;">${loanRecommendationRange}</div>
            <div>${getLoanRecommendationMessage(loanRecommendationStatus)}</div>
          </div>
        </div>
        
        <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #ccc; border-radius: 5px;">
          <h3 style="color: #166534; margin-top: 0;">Valuation Factors</h3>
          <ul style="padding-left: 20px;">
            ${valuationFactors.map(factor => `
              <li style="margin-bottom: 10px;">
                <div style="font-weight: bold;">${factor.name}</div>
                <div style="color: ${factor.status === 'positive' ? 'green' : factor.status === 'neutral' ? 'orange' : 'red'};">
                  ${factor.status === 'positive' ? 'Positive' : factor.status === 'neutral' ? 'Neutral' : 'Negative'}
                </div>
              </li>
            `).join('')}
          </ul>
        </div>
        
        <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #ccc; border-radius: 5px;">
          <h3 style="color: #166534; margin-top: 0;">AI Recommendation</h3>
          <p>${recommendation}</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #666;">
          © 2025 Greenfinch Real Estate Valuation | All Rights Reserved
        </div>
      `;
      
      // Create a blob from the HTML content
      const blob = new Blob([reportContent.outerHTML], { type: 'text/html' });
      
      // Create a download link
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'Greenfinch_Property_Valuation_Report.html';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      alert('Report generated successfully. Opening as HTML file since PDF generation is currently being fixed.');
    } catch (error) {
      console.error('Error generating report:', error);
      alert('There was an error generating the report. Please try again later.');
    } finally {
      setIsGeneratingPdf(false);
    }
  }
  
  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-green-700">Property Valuation Results</h1>
          <Link href="/" className="text-green-600 hover:text-green-800">
            Back to Home
          </Link>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md border border-green-200">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Greenfinch Field Visit Credibility Assessment</h2>
            <p className="text-gray-600">Generated on {new Date().toLocaleDateString('en-IN')}</p>
          </div>
          
          <PropertyScoreCard score={score} valuation={valuation} />
          
          {/* Loan Recommendation */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-green-600 mb-3">Loan Recommendation</h3>
            <div className={`p-4 rounded-md ${getLoanRecommendationColor(loanRecommendationStatus)}`}>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div className="mb-2 md:mb-0">
                  <span className="font-bold">{loanRecommendationRange}</span>
                </div>
                <div className="text-sm">
                  {getLoanRecommendationMessage(loanRecommendationStatus)}
                </div>
              </div>
            </div>
          </div>
          
          <ValuationFactors factors={valuationFactors} />
          
          <AIRecommendation score={score} recommendations={recommendation} />
          
          <div className="flex justify-end">
            <PdfExportButton 
              onClick={generatePdfReport}
              isGenerating={isGeneratingPdf}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// Main component with Suspense
export default function PropertyResults() {
  return (
    <Suspense fallback={<ResultsLoading />}>
      <PropertyResultsContent />
    </Suspense>
  )
}
