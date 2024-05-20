# Recycloset - Frontend

## Project Overview
This project is a frontend application for a second-hand clothing store, built using React and Material-UI for a clean, responsive, and visually appealing user interface. The frontend interacts with a backend API to provide a seamless shopping experience.

## Features
- Clean and responsive design using Material-UI.
- Dynamic navigation menu common to all pages.
- An entry page with a main title, secondary title, image, and items cards.
- Search field and product filtering.
- User authentication and authorization.
- CRUD operations for product management (available to admin and register users).
- Favorites functionality to save preferred items.
- Detailed product view pages.
- Accessibility features including proper use of alt attributes and favicon.
- Consistent form design with validations and visual indications.

## Project Structure
The project is divided into modules based on functionality:
- **components/**: Reusable components such as buttons, forms, and cards.
- **pages/**: Individual pages like Home, About, Login, Register, and Product Details.
- **services/**: API service functions using Axios.
- **hooks/**: Custom React hooks for managing state and side effects.
- **validation/**: Validation logic for forms and inputs.
- **store/**: Context API store for managing global state.
- **guard/**: Components like AuthGuard for route protection.
- **routes/**: Route definitions and configurations.
- **layout/**: Layout components for consistent page structures.

## Installation
1. Clone the repository.
2. Navigate to the `frontend` directory.
3. Install dependencies: `npm install`
4. Start the development server: `npm start`

## Technology Stack
- **React**: JavaScript library for building user interfaces.
- **Material-UI**: UI framework for React to create responsive designs.
- **Axios**: For making HTTP requests to the backend.


## Code Quality
- Clean and tidy code with meaningful names for functions and variables.
- Divided into modules for maintainability.
- Consistent code conventions and styling.
- Comments for complex functions.

## Deployment
Ensure the frontend is connected to the backend API by setting the correct API base URL in the environment configuration.
