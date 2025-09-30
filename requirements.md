# Simple Website Requirements

## Overview
A two-page website built with Node.js, Express, and PostgreSQL that collects user information.

## Pages
1. **Home Page**
   - Displays "Yo what's up"
   - Form with fields:
     - Email (required, must be valid email format)
     - Nickname (required)
     - City (required)
   - Submit button

2. **Confirmation Page**
   - Shows a success message after form submission
   - Displays the submitted information
   - Option to return to the home page

## Technical Stack
- Backend: Node.js with Express
- Database: PostgreSQL (schema design only, no implementation needed yet)
- Frontend: HTML, CSS (minimal styling)
- Form validation on both client and server side

## Database Schema (Planned)
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    nickname VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints (Planned)
- GET / - Serve home page
- POST /submit - Handle form submission
- GET /confirmation - Show confirmation page

## Future Phase 2
- Build a dedicated page that queries the database and lists every user entry with their email, nickname, and city.
  - Include pagination or filtering considerations for large datasets.
  - Link the page from existing navigation.

## Future Considerations
- Input sanitization
- Error handling
- Database connection and queries
- User feedback for form validation
- Responsive design
