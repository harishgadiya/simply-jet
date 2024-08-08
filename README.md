## Simply Jet

Simply Jet is a Next.js application designed for managing user data efficiently. The application features a modern UI with functionalities for CRUD operations, user search, filtering, pagination, and more. It utilizes Tanstack Table for dynamic data handling and Tailwind CSS for responsive design.

## Table of Contents
Features
Tech Stack
Installation
Usage
Folder Structure
Components  


## Features
User Management: Add, edit, delete, and view user details.
Search Functionality: Easily search through user records.
Filtering: Filter users by age.
Pagination: Navigate through user records with pagination.
Multi-select and Delete: Select multiple users and perform delete operations.
Responsive Design: Built with Tailwind CSS for a responsive and modern UI.

## Tech Stack
Frontend: Next.js 14, React 18, TypeScript
Styling: Tailwind CSS
Animations: Framer Motion
Data Management: Tanstack Table, Tanstack Query
Backend: Next.js Server Actions (for CRUD operations)
Database: mock data stored in local storage

## Installation
To run this project locally, follow these steps:

## Clone the repository:
```bash
git clone https://github.com/your-username/simply-jet.git
cd simply-jet
```

## Install dependencies:
```npm install ```

## Start the development server:
`npm run dev`

The application should now be running at [http://localhost:3000](http://localhost:3000).

## Usage
Running the Application
Home Page: Displays the main landing page with animations and other sections inspired by the Montoya theme.
Dashboard: Navigate to /dashboard to manage users.
CRUD Operations: Use the interface to add, edit, and delete users. The table is updated automatically with no need for page refreshes.

## Routes
Home: `/` - Main landing page.
Dashboard: `/dashboard` - User management interface.

## Folder Structure

simply-jet/
│
├── public/               # Public assets (images, fonts, etc.)
│
├── src/
│   ├── components/       # Reusable components
│   ├── pages/            # Next.js pages
│   │   ├── index.tsx     # Home page
│   │   ├── dashboard.tsx # Dashboard page
│   ├── styles/           # Tailwind CSS configuration
│   ├── utils/            # Utility functions and hooks
│
├── README.md             # Project documentation
├── tailwind.config.js    # Tailwind CSS configuration file
├── tsconfig.json         # TypeScript configuration file
└── package.json          # Project dependencies and scripts

## Components
### 1. Header
Located in src/components/Header.tsx
Contains the site navigation and branding.
### 2. Footer
Located in src/components/Footer.tsx
Displays the site’s footer with links and additional information.
### 3. UserTable
Located in src/components/UserTable.tsx
Implements the user table with Tanstack Table, including searching, filtering, pagination, and multi-select functionalities.


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
