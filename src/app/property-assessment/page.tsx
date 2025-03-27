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
    setFormData({ ...formData, [name]: value })
  }

  const handleImageUpload = (files: File[]) => {
    setFormData({ ...formData, images: [...formData.images, ...files] })
    const newPreviewUrls = files.map(file => URL.createObjectURL(file))
    setPreviewUrls([...previewUrls, ...newPreviewUrls])
    if (files.length > 0 && !showAnalyzer) setShowAnalyzer(true)
  }

  const removeImage = (index: number) => {
    const newImages = [...formData.images]
    newImages.splice(index, 1)
    setFormData({ ...formData, images: newImages })
    const newPreviewUrls = [...previewUrls]
    URL.revokeObjectURL(newPreviewUrls[index])
    newPreviewUrls.splice(index, 1)
    setPreviewUrls(newPreviewUrls)
    const newAnalysisResults = [...imageAnalysisResults]
    if (newAnalysisResults.length > index) {
      newAnalysisResults.splice(index, 1)
      setImageAnalysisResults(newAnalysisResults)
    }
    if (newImages.length === 0) setShowAnalyzer(false)
  }

  const handleAgentNotesUpload = (files: File[]) => {
    setFormData({ ...formData, agentNotesImages: [...formData.agentNotesImages, ...files] })
    const newPreviewUrls = files.map(file => URL.createObjectURL(file))
    setNotesPreviewUrls([...notesPreviewUrls, ...newPreviewUrls])
    extractTextFromAgentNotes([...formData.agentNotesImages, ...files])
  }

  const removeAgentNotesImage = (index: number) => {
    const newImages = [...formData.agentNotesImages]
    newImages.splice(index, 1)
    setFormData({ ...formData, agentNotesImages: newImages })
    const newPreviewUrls = [...notesPreviewUrls]
    URL.revokeObjectURL(newPreviewUrls[index])
    newPreviewUrls.splice(index, 1)
    setNotesPreviewUrls(newPreviewUrls)
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
    const summaryText = notesSummary ? `\n\nProfessional Summary:\n${notesSummary}` : ''
    const keyPointsText = notesKeyPoints.length > 0 ? `\n\nKey Points:\n${notesKeyPoints.map(point => `- ${point}`).join('\n')}` : ''
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
      const result = await calculateValuation(formData)
      router.push(`/property-assessment/results?score=${result.score}&valuation=${result.valuation}&loanStatus=${result.loanRecommendation.status}&loanRange=${encodeURIComponent(result.loanRecommendation.range)}`)
    } catch (error) {
      console.error('Error submitting form:', error)
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url))
      notesPreviewUrls.forEach(url => URL.revokeObjectURL(url))
    }
  }, [])

  return (
    <div className="min-h-screen py-10 px-6 bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-green-700">Property Assessment</h1>
          <Link href="/" className="text-green-600 hover:text-green-800">Back to Home</Link>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-green-100">
          {/* form fields remain unchanged */}
          <ImageUpload onImageUpload={handleImageUpload} previewUrls={previewUrls} onRemoveImage={removeImage} />
          {showAnalyzer && <ImageAnalyzer images={formData.images} onAnalysisComplete={handleAnalysisComplete} />}
          <AgentNotesUploader
            onNotesUpload={handleAgentNotesUpload}
            onExtractedText={handleUseExtractedText}
            previewUrls={notesPreviewUrls}
            onRemoveImage={removeAgentNotesImage}
            isExtracting={isExtracting}
            extractedText={extractedText}
            extractionConfidence={extractionConfidence}
          />
          {extractedText && <NotesSummaryComponent extractedText={extractedText} onSummaryGenerated={handleSummaryGenerated} />}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition"
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