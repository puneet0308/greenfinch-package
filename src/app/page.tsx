import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl font-bold text-green-700 mb-6">
          Greenfinch Field Visit Credibility Scorer
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          A comprehensive tool for field agents to collect property data and generate AI-powered valuations
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md border border-green-200 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-green-600 mb-3">Property Assessment</h2>
            <p className="text-gray-600 mb-4">
              Collect and analyze property details including location, condition, and documentation
            </p>
            <Link 
              href="/property-assessment" 
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Start Assessment
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-green-200 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-green-600 mb-3">View Reports</h2>
            <p className="text-gray-600 mb-4">
              Access previously generated property valuation reports and export as PDF
            </p>
            <Link 
              href="/reports" 
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              View Reports
            </Link>
          </div>
        </div>
        
        <footer className="text-sm text-gray-500">
          © {new Date().getFullYear()} Greenfinch Real Estate Valuation | All Rights Reserved
        </footer>
      </div>
    </main>
  )
}
