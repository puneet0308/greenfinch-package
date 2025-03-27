'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-white px-4 py-12">
      <div className="max-w-5xl w-full text-center space-y-20">
        <section className="space-y-6">
          <h1 className="text-6xl font-bold tracking-tight text-green-800">
            Greenfinch Credibility Scorer
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            A smart field visit tool to collect property insights, analyze documents, and generate AI-powered valuation reports — all in one place.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-gray-200 p-8 bg-white shadow-md hover:shadow-xl transition duration-300">
            <h2 className="text-2xl font-semibold text-green-700 mb-3">Property Assessment</h2>
            <p className="text-gray-600 mb-6">
              Collect detailed property information including address, condition, photos, and paperwork.
            </p>
            <Link
              href="/property-assessment"
              className="inline-block px-6 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
            >
              Start Assessment
            </Link>
          </div>

          <div className="rounded-2xl border border-gray-200 p-8 bg-white shadow-md hover:shadow-xl transition duration-300">
            <h2 className="text-2xl font-semibold text-green-700 mb-3">View Reports</h2>
            <p className="text-gray-600 mb-6">
              Access past assessments, generate reports, and download clean PDF outputs with key insights.
            </p>
            <Link
              href="/reports"
              className="inline-block px-6 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
            >
              View Reports
            </Link>
          </div>
        </section>

        <footer className="pt-12 text-sm text-gray-400">
          © {new Date().getFullYear()} Greenfinch | Built for real estate intelligence.
        </footer>
      </div>
    </main>
  )
}