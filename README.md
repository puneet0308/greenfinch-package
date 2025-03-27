# Greenfinch Field Visit Credibility Scorer

A comprehensive web application for real estate valuation in India, designed for field agents to collect property data and generate AI-powered valuations.

## Features

- Property valuation focused on Indian real estate with values in lakhs/crores
- Agent notes photo upload with AI text extraction (supports both Hindi and English)
- Professional summary generation for agent notes
- Loan recommendation tiers:
  - 20 lac - 40 lac: okay
  - 40 lac to 80 lac: proceed with caution
  - above 80 lac: not recommended
- Report generation functionality in HTML format

## Deployment Instructions

### Prerequisites

- Node.js 16+ and npm installed
- Basic knowledge of command line operations

### Installation Steps

1. **Extract the package**
   
   Extract the contents of the zip file to your desired location.

2. **Install dependencies**
   
   Open a terminal in the extracted directory and run:
   ```
   npm install
   ```

3. **Build the application**
   
   ```
   npm run build
   ```

4. **Start the application**
   
   For development mode:
   ```
   npm run dev
   ```
   
   For production mode:
   ```
   npm start
   ```

5. **Access the application**
   
   The application will be available at:
   - Development mode: http://localhost:3000
   - Production mode: http://localhost:3000 (or the port specified in your environment)

### Deployment to Hosting Services

#### Vercel (Recommended)

1. Install Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Deploy:
   ```
   vercel
   ```

3. Follow the prompts to complete deployment.

#### Netlify

1. Install Netlify CLI:
   ```
   npm install -g netlify-cli
   ```

2. Deploy:
   ```
   netlify deploy
   ```

3. Follow the prompts to complete deployment.

## Usage Guide for Field Agents

1. **Start Assessment**
   - Click "Start Assessment" on the home page to begin a new property evaluation

2. **Fill Property Details**
   - Enter the pincode and full property address
   - Select verification status for neighbor confirmation, employment proof, Aadhaar matching, and rent agreement
   - Provide details about nearby condition, road access, road width, and recently sold properties
   - Add any additional notes (can include Hindi text)

3. **Upload Images**
   - Upload property images for analysis
   - Upload photos of handwritten agent notes for automatic text extraction

4. **Generate Valuation**
   - Click "Generate Valuation" to process all inputs and see results
   - Review the credibility score, property valuation, and loan recommendations
   - Export the report as needed

## Troubleshooting

- **Build Errors**: If you encounter build errors related to useSearchParams, ensure you're using the latest version of Next.js and that components using this hook are wrapped in Suspense boundaries.
- **Image Upload Issues**: Verify that your server has proper permissions to handle file uploads.
- **Deployment Problems**: For deployment issues, check the logs of your hosting provider for specific error messages.

## Support

For any questions or issues, please contact the Greenfinch IT support team.

---

© 2025 Greenfinch Real Estate Valuation | All Rights Reserved
