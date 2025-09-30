# Simple Website

A two-page website built with Node.js, Express, and PostgreSQL that collects user information.

## Project Structure

```
.
├── server.js          # Main application file
├── package.json       # Project dependencies
├── README.md          # This file
├── requirements.md    # Project requirements
└── views/
    ├── index.ejs      # Home page with form
    └── confirmation.ejs # Confirmation page
```

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- PostgreSQL (for future database implementation)

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and visit: http://localhost:3000

## Database Setup (Future Implementation)

The database schema is defined in `requirements.md`. You'll need to set up a PostgreSQL database and update the connection settings in `server.js` when ready to implement the database functionality.

## Features

- Form validation on both client and server side
- Responsive design
- Clean and simple user interface
- Easy to extend with additional features

## Future Improvements

- Implement database connection
- Add user authentication
- Add form submission rate limiting
- Implement proper error handling and logging
- Add tests
