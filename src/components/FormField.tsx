'use client'

import React from 'react'

interface FormFieldProps {
  id: string
  name: string
  label: string
  type?: 'text' | 'textarea' | 'select'
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
  rows?: number
}

export default function FormField({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  options = [],
  rows = 3
}: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className="form-input"
          rows={rows}
          placeholder={placeholder}
          required={required}
        />
      ) : type === 'select' ? (
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className="form-select"
          required={required}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className="form-input"
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  )
}
