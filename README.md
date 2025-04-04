Country Data Dashboard

Description:
This project is a Next.js application built with TypeScript that fetches country data from a REST API and displays it in an interactive dashboard. It includes features such as searching, sorting, filtering, and detailed country views.

Features:
API Integration: Fetches country data from REST Countries API with proper error handling and loading states.

Data Manipulation:
Sorting countries by population (ascending and descending).

Filtering countries by region.
Searching for countries by name or capital.

UI Components:
* Responsive grid layout for displaying country cards.
* Each card shows flag, name, capital, population, and region.
* Detailed view on click, displaying additional information like currencies, languages, and time zones.

State Management:
Uses React hooks for local state management and local storage.


Performance Optimization:
* Lazy loading for country cards.
* Optimized image loading using Next.js Image component.
* Memorization to prevent unnecessary re-renders.

Advanced Features:
* Custom hook for fetching and caching API data.
* Dark mode toggle with persistent user preference.

Testing:
* Unit tests for utility functions.

Installation

Clone the repository:

git clone https://github.com/BejoJeffrin23/countryLister.git

Navigate to the project directory:
cd countryLister

Install dependencies:

npm install
# or
yarn install

Run the development server:

npm run dev
# or
yarn dev

Open http://localhost:3000 in your browser.

Testing

Run tests with:

npm test
# or
yarn test

Deployment

To build and deploy the app:

npm run build
npm start

Technologies Used

Next.js
TypeScript
React
Tailwind CSS
Jest & React Testing Library

Author

Bejo Jeffrin

Live link : https://country-lister-28ju.vercel.app/