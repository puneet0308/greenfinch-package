'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import FormField from '@/components/FormField'
import ImageUpload from '@/components/ImageUpload'
import ImageAnalyzer from '@/components/ImageAnalyzer'
import AgentNotesUploader from '@/components/AgentNotesUploader'
import NotesSummaryComponent from '@/components/NotesSummaryComponent'
import { usePropertyValuation, PropertyAssessmentData } from '@/lib/propertyValuation'
import { useImageAnalysis, ImageAnalysisResult } from '@/lib/imageAnalysis'
import { useAgentNotesExtraction, TextExtractionResult } from '@/lib/agentNotesExtraction'

export default function PropertyAssessment() {
  const router = useRouter()
  const { calculateValuation, isCalculating } = usePropertyValuation()
  const { extractTextFromImages, isExtracting } = useAgentNotesExtraction()
  
  const [formData, setFormData] = useState<PropertyAssessmentData>({
    pincode: '',
    propertyAddress: '',
    neighbourConfirmation: 'no',
    employmentProof: 'no',
    addressMatchingAadhaar: 'no',
    rentAgreement: 'no',
    nearbyCondition: '',
    roadAccess: '',
    roadWidth: '',
    nearbySoldProperty: '',
    additionalNotes: '',
    images: [],
    agentNotesImages: [],
    extractedNotes: ''
  })
  
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [notesPreviewUrls, setNotesPreviewUrls] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageAnalysisResults, setImageAnalysisResults] = useState<ImageAnalysisResult[]>([])
  const [showAnalyzer, setShowAnalyzer] = useState(false)
  const [extractedText, setExtractedText] = useState('')
  const [extractionConfidence, setExtractionConfidence] = useState(0)
  const [notesSummary, setNotesSummary] = useState('')
  const [notesKeyPoints, setNotesKeyPoints] = useState<string[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleImageUpload = (files: File[]) => {
    setFormData({
      ...formData,
      images: [...formData.images, ...files]
    })
    
    // Create preview URLs
    const newPreviewUrls = files.map(file => URL.createObjectURL(file))
    setPreviewUrls([...previewUrls, ...newPreviewUrls])
    
    // Show image analyzer when images are uploaded
    if (files.length > 0 && !showAnalyzer) {
      setShowAnalyzer(true)
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...formData.images]
    newImages.splice(index, 1)
    
    setFormData({
      ...formData,
      images: newImages
    })

    const newPreviewUrls = [...previewUrls]
    URL.revokeObjectURL(newPreviewUrls[index])
    newPreviewUrls.splice(index, 1)
    setPreviewUrls(newPreviewUrls)
    
    // Update analysis results
    const newAnalysisResults = [...imageAnalysisResults]
    if (newAnalysisResults.length > index) {
      newAnalysisResults.splice(index, 1)
      setImageAnalysisResults(newAnalysisResults)
    }
    
    // Hide analyzer if no images
    if (newImages.length === 0) {
      setShowAnalyzer(false)
    }
  }
  
  const handleAgentNotesUpload = (files: File[]) => {
    setFormData({
      ...formData,
      agentNotesImages: [...formData.agentNotesImages, ...files]
    })
    
    // Create preview URLs
    const newPreviewUrls = files.map(file => URL.createObjectURL(file))
    setNotesPreviewUrls([...notesPreviewUrls, ...newPreviewUrls])
    
    // Trigger text extraction when new images are uploaded
    extractTextFromAgentNotes([...formData.agentNotesImages, ...files])
  }
  
  const removeAgentNotesImage = (index: number) => {
    const newImages = [...formData.agentNotesImages]
    newImages.splice(index, 1)
    
    setFormData({
      ...formData,
      agentNotesImages: newImages
    })

    const newPreviewUrls = [...notesPreviewUrls]
    URL.revokeObjectURL(newPreviewUrls[index])
    newPreviewUrls.splice(index, 1)
    setNotesPreviewUrls(newPreviewUrls)
    
    // Re-extract text if there are still images
    if (newImages.length > 0) {
      extractTextFromAgentNotes(newImages)
    } else {
      setExtractedText('')
      setExtractionConfidence(0)
      setNotesSummary('')
      setNotesKeyPoints([])
    }
  }
  
  const extractTextFromAgentNotes = async (images: File[]) => {
    if (images.length === 0) return
    
    try {
      const result = await extractTextFromImages(images)
      setExtractedText(result.text)
      setExtractionConfidence(result.confidence)
    } catch (error) {
      console.error('Error extracting text:', error)
    }
  }
  
  const handleUseExtractedText = (text: string) => {
    const summaryText = notesSummary ? 
      `\n\nProfessional Summary:\n${notesSummary}` : '';
    
    const keyPointsText = notesKeyPoints.length > 0 ? 
      `\n\nKey Points:\n${notesKeyPoints.map(point => `- ${point}`).join('\n')}` : '';
    
    setFormData({
      ...formData,
      additionalNotes: formData.additionalNotes 
        ? `${formData.additionalNotes}\n\nExtracted from agent notes:\n${text}${summaryText}${keyPointsText}`
        : `Extracted from agent notes:\n${text}${summaryText}${keyPointsText}`,
      extractedNotes: text
    })
  }
  
  const handleSummaryGenerated = (summary: string, keyPoints: string[]) => {
    setNotesSummary(summary)
    setNotesKeyPoints(keyPoints)
  }
  
  const handleAnalysisComplete = (results: ImageAnalysisResult[]) => {
    setImageAnalysisResults(results)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Calculate property valuation
      const result = await calculateValuation(formData)
      
      // Navigate to results page with valuation data
      router.push(`/property-assessment/results?score=${result.score}&valuation=${result.valuation}&loanStatus=${result.loanRecommendation.status}&loanRange=${encodeURIComponent(result.loanRecommendation.range)}`)
    } catch (error) {
      console.error('Error submitting form:', error)
      setIsSubmitting(false)
    }
  }

  // Clean up preview URLs when component unmounts
  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url))
      notesPreviewUrls.forEach(url => URL.revokeObjectURL(url))
    }
  }, [])

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-green-700">Property Assessment</h1>
          <Link href="/" className="text-green-600 hover:text-green-800">
            Back to Home
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md border border-green-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pincode */}
            <FormField
              id="pincode"
              name="pincode"
              label="Pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              placeholder="Enter 6-digit pincode"
              required
            />

            {/* Property Address */}
            <div className="md:col-span-2">
              <FormField
                id="propertyAddress"
                name="propertyAddress"
                label="Full Property Address"
                type="textarea"
                value={formData.propertyAddress}
                onChange={handleInputChange}
                placeholder="Enter complete property address"
                required
              />
            </div>

            {/* Verification Fields */}
            <FormField
              id="neighbourConfirmation"
              name="neighbourConfirmation"
              label="Neighbour Confirmation"
              type="select"
              value={formData.neighbourConfirmation}
              onChange={handleInputChange}
              options={[
                { value: 'no', label: 'No' },
                { value: 'yes', label: 'Yes' },
                { value: 'partial', label: 'Partial' }
              ]}
              required
            />

            <FormField
              id="employmentProof"
              name="employmentProof"
              label="Employment Proof"
              type="select"
              value={formData.employmentProof}
              onChange={handleInputChange}
              options={[
                { value: 'no', label: 'No' },
                { value: 'yes', label: 'Yes' },
                { value: 'partial', label: 'Partial' }
              ]}
              required
            />

            <FormField
              id="addressMatchingAadhaar"
              name="addressMatchingAadhaar"
              label="Address Matching Aadhaar"
              type="select"
              value={formData.addressMatchingAadhaar}
              onChange={handleInputChange}
              options={[
                { value: 'no', label: 'No' },
                { value: 'yes', label: 'Yes' },
                { value: 'partial', label: 'Partial' }
              ]}
              required
            />

            <FormField
              id="rentAgreement"
              name="rentAgreement"
              label="Rent Agreement"
              type="select"
              value={formData.rentAgreement}
              onChange={handleInputChange}
              options={[
                { value: 'no', label: 'No' },
                { value: 'yes', label: 'Yes' },
                { value: 'not_applicable', label: 'Not Applicable' }
              ]}
              required
            />

            {/* Property Condition */}
            <FormField
              id="nearbyCondition"
              name="nearbyCondition"
              label="Nearby Condition"
              value={formData.nearbyCondition}
              onChange={handleInputChange}
              placeholder="Describe nearby area condition"
              required
            />

            <FormField
              id="roadAccess"
              name="roadAccess"
              label="Road Access"
              value={formData.roadAccess}
              onChange={handleInputChange}
              placeholder="Describe road access"
              required
            />

            <FormField
              id="roadWidth"
              name="roadWidth"
              label="Road Width"
              value={formData.roadWidth}
              onChange={handleInputChange}
              placeholder="Enter road width in feet"
              required
            />

            <FormField
              id="nearbySoldProperty"
              name="nearbySoldProperty"
              label="Recently Nearby Sold Property"
              value={formData.nearbySoldProperty}
              onChange={handleInputChange}
              placeholder="Details of nearby sold properties"
            />

            {/* Additional Notes */}
            <div className="md:col-span-2">
              <FormField
                id="additionalNotes"
                name="additionalNotes"
                label="Additional Notes"
                type="textarea"
                value={formData.additionalNotes}
                onChange={handleInputChange}
                placeholder="Any additional information about the property (can include Hindi text)"
              />
            </div>
          </div>

          {/* Image Upload */}
          <ImageUpload 
            onImageUpload={handleImageUpload}
            previewUrls={previewUrls}
            onRemoveImage={removeImage}
          />
          
          {/* Image Analysis */}
          {showAnalyzer && (
            <ImageAnalyzer 
              images={formData.images}
              onAnalysisComplete={handleAnalysisComplete}
            />
          )}
          
          {/* Agent Notes Upload */}
          <AgentNotesUploader
            onNotesUpload={handleAgentNotesUpload}
            onExtractedText={handleUseExtractedText}
            previewUrls={notesPreviewUrls}
            onRemoveImage={removeAgentNotesImage}
            isExtracting={isExtracting}
            extractedText={extractedText}
            extractionConfidence={extractionConfidence}
          />
          
          {/* Notes Summary */}
          {extractedText && (
            <NotesSummaryComponent
              extractedText={extractedText}
              onSummaryGenerated={handleSummaryGenerated}
            />
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting || isCalculating}
            >
              {isSubmitting || isCalculating ? 'Processing...' : 'Generate Valuation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
