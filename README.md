# CryptoTracker Documentation

This documentation offers a comprehensive guide to the CryptoTracker project, featuring step-by-step instructions for setting up and running both web and mobile applications, detailed insights into API integration and data updating, an explanation of the chosen state management approach, and a discussion of encountered challenges and solutions—all presented within a dedicated Docusaurus documentation project also.

**Tech Stack:** Next.js, Tailwind CSS, React Query, Axios, React Native

## Table of Contents

- Project Setup Guide
- API Integration Details
- State Management Explanation
- Challenges & Solutions

---

## Project Setup Guide

### Web App (Next.js)

The CryptoTracker web application is built with Next.js and styled with Tailwind CSS.

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/sailesh2710/Crypto-Tracker
   cd cryptotracker/web-app
2. **Install Dependencies:**
   ```bash
   npm install
3. **Run the Development Server:**
   ```bash
   npm run dev
4. **View the App:**

    Open http://localhost:3000 in your browser to see the CryptoTracker dashboard.
<div align="center">
  <img width="600" alt="Screenshot 2025-03-02 at 12 06 13 PM" src="https://github.com/user-attachments/assets/8b03a143-5593-43a7-85e0-5b7e09bb05c4" />
</div>

### Docusaurus Documentation

Docusaurus documentation is a developer-friendly static site generator that enables teams to create, manage, and publish comprehensive, versioned documentation websites.

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/sailesh2710/Crypto-Tracker
   cd cryptotracker/docs
2. **Install Dependencies:**
   ```bash
   npm install
3. **Run the Development Server:**
   ```bash
   npm run dev
4. **View the App:**

    Open http://localhost:3000 in your browser to see the CryptoTracker dashboard.
<div align="center">
  <img width="600" alt="Screenshot 2025-03-02 at 12 06 13 PM" src="https://github.com/user-attachments/assets/a1f56347-a142-41da-ae7d-bee0e8a556ad" />
</div>


   
   
    

---

## API Integration Details

CryptoTracker retrieves live cryptocurrency data from the [CoinGecko API](https://www.coingecko.com/en/api). The integration is implemented in the `src/services/api.ts` file using Axios. Here’s a breakdown of the implementation:

- **Data Fetching:**
  - The base API URL is defined as `https://api.coingecko.com/api/v3`.
  - The function `fetchCryptocurrencies` is an asynchronous function that fetches data from the `/coins/markets` endpoint.
  - It sends a GET request with the following query parameters:
    - `vs_currency: 'usd'` – specifies that the prices should be returned in USD.
    - `order: 'market_cap_desc'` – sorts the results by market capitalization in descending order.
    - `per_page: 20` – limits the results to 20 cryptocurrencies per request.
    - `page: 1` – fetches the first page of the results.
    - `sparkline: false` – excludes sparkline data to keep the payload minimal.
  - The function returns the response data, which is an array of `Cryptocurrency` objects.

- **Data Updating & Caching:**
  - The application leverages [React Query](https://react-query.tanstack.com/) to manage API calls. React Query caches the data, ensuring that subsequent requests are efficient and reducing unnecessary network calls.
  - A manual refresh button in the UI triggers React Query’s cache invalidation, forcing a refetch of the latest data. This action is confirmed by a toast notification ("Prices refreshed!") displayed to the user.

- **Error Handling:**
  - The API call is wrapped in a `try-catch` block. If an error occurs during the Axios request, it logs an error message to the console and rethrows the error.
  - This error is then handled by React Query’s error management, which displays friendly error messages in the UI if the data fetching fails.

---
## State Management Explanation

### Why React Query?

- **Efficient Data Management:**
  - React Query simplifies data fetching by automatically caching and synchronizing the server state with the UI.
  - Its automatic background updates and refetching mechanisms keep the app current with minimal manual intervention.

- **Built-in Handling for Loading & Errors:**
  - The library provides robust support for managing loading states and error conditions, which enhances the user experience.

- **Minimal Boilerplate:**
  - Compared to alternatives like Redux, Zustand, or the Context API, React Query reduces boilerplate, letting you focus on UI logic.

Other state management solutions were considered, but React Query’s caching and automatic refetching capabilities were ideal for a real-time crypto tracker.

---

## Challenges & Solutions

### 1. Hydration Mismatches in Next.js
- **Challenge:**  
  Rendering dynamic data (e.g., timestamps) on the server led to mismatches during client-side hydration.
- **Solution:**  
  Dynamic values were moved to client-only rendering using `useEffect` so that such values are computed only after hydration.

### 2. Ensuring Fresh Data on Manual Refresh
- **Challenge:**  
  The default caching behavior sometimes prevented the UI from showing updated data when the refresh button was clicked.
- **Solution:**  
  We set `staleTime: 0` in React Query and used `invalidateQueries` to force a refetch. Additionally, a toast notification ("Prices refreshed!") is shown to confirm the update.

### 3. Consistent UI Across Web and Mobile
- **Challenge:**  
  Maintaining a consistent user experience across both the web and mobile platforms was critical.
- **Solution:**  
  The web app uses Next.js with Tailwind CSS for rapid, responsive design. The mobile app, built with React Native, adheres to similar design principles, ensuring a cohesive look and feel across platforms.

---
## Contact
For any inquiries or support, feel free to reach out:

- **GitHub:** [@sailesh2710](https://github.com/sailesh2710)
- **Email:** saileshkumar2710@gmail.com
