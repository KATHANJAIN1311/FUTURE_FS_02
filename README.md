# Mini E-Commerce Platform

A responsive e-commerce platform built with React.js and Tailwind CSS.

## Features

✅ **Product Listings**
- Grid layout with responsive design
- Product search functionality
- Category filtering
- Product cards with images and details

✅ **Shopping Cart**
- Add/remove items
- Quantity controls
- Real-time total calculation
- Persistent cart state

✅ **Checkout Simulation**
- Complete checkout form
- Form validation
- Order confirmation
- Simulated payment processing

✅ **User Authentication**
- Login/Signup modal
- User session management
- Personalized experience

✅ **Order History**
- View past orders
- Order details and status
- User-specific order tracking

## Tech Stack

- **Frontend**: React.js with Hooks
- **Styling**: Tailwind CSS
- **State Management**: useContext + useReducer
- **Data**: Mock data (easily replaceable with API)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.js       # Navigation header
│   ├── ProductCard.js  # Individual product display
│   ├── ProductList.js  # Product grid with search/filter
│   ├── Cart.js         # Shopping cart modal
│   ├── Checkout.js     # Checkout form
│   ├── Login.js        # Authentication modal
│   └── OrderHistory.js # Order history display
├── context/            # State management
│   └── AppContext.js   # Global app state
├── data/               # Mock data
│   └── products.js     # Product catalog
└── App.js              # Main application component
```

## Key Features Implementation

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Responsive grid layouts
- Mobile-friendly modals and forms

### State Management
- Centralized state with React Context
- useReducer for complex state updates
- Persistent cart and user sessions

### Form Validation
- Real-time validation feedback
- Email format validation
- Credit card number validation
- Required field validation

## Future Enhancements

- Backend API integration
- Real payment processing
- Product reviews and ratings
- Wishlist functionality
- Advanced filtering options
- User profiles and preferences