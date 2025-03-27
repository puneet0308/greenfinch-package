'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-green-700">
                Greenfinch
              </Link>
            </div>
            <nav className="ml-6 flex space-x-8">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname === '/' 
                    ? 'border-green-500 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Home
              </Link>
              <Link
                href="/property-assessment"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname.startsWith('/property-assessment') 
                    ? 'border-green-500 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Assessment
              </Link>
              <Link
                href="/reports"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname === '/reports' 
                    ? 'border-green-500 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Reports
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            <span className="inline-flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600">
                Field Agent Portal
              </span>
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
