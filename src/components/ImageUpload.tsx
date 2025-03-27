'use client'

import React from 'react'

interface ImageUploadProps {
  onImageUpload: (files: File[]) => void
  previewUrls: string[]
  onRemoveImage: (index: number) => void
}

export default function ImageUpload({ onImageUpload, previewUrls, onRemoveImage }: ImageUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      onImageUpload(filesArray)
    }
  }

  return (
    <div>
      <label className="form-label">Upload Property Images</label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
            >
              <span>Upload images</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                accept="image/*"
                multiple
                onChange={handleFileChange}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>

      {/* Image Previews */}
      {previewUrls.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Uploaded Images</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative">
                <img
                  src={url}
                  alt={`Property image ${index + 1}`}
                  className="h-24 w-full object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => onRemoveImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 transform translate-x-1/3 -translate-y-1/3"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
