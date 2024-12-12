# Real-Time Ticketing System Frontend

A modern React-based frontend for the real-time ticketing system, built with Vite for optimal performance.

## Features

- Real-time ticket monitoring and management
- Configuration management interface
- Live log display
- Responsive design for various screen sizes
- Real-time updates using WebSocket connection

## Tech Stack

- React + Vite
- WebSocket for real-time communication
- CSS for styling
- Axios for HTTP requests

## Project Structure

```
src/
├── components/          # React components
│   ├── ConfigurationForm.jsx
│   ├── LogDisplay.jsx
│   └── TicketDisplay.jsx
├── assets/
│   └── CSS/            # Styling files
├── api.js              # API configuration and endpoints
└── App.jsx             # Main application component
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

### Building for Production

Build the project:
```bash
npm run build
```

## Configuration

The application connects to the backend server through WebSocket and REST APIs. Update the connection settings in `src/api.js` if needed.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
