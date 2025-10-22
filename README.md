# Portfolio Website

A modern portfolio website with a React frontend and NestJS backend.

## Project Structure

```
portfolio-site-frontend/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/
│   │   ├── sections/
│   │   ├── locales/
│   │   └── ...
│   ├── package.json
│   └── ...
├── backend/           # NestJS backend API
│   ├── src/
│   │   ├── projects/
│   │   ├── contacts/
│   │   ├── experiences/
│   │   └── prisma/
│   ├── prisma/
│   ├── package.json
│   └── ...
├── package.json       # Root package.json for managing both projects
└── README.md
```

## Features

### Frontend
- ⚛️ **React 18** with TypeScript
- 🎨 **Tailwind CSS** for styling
- 🌐 **i18n** for internationalization (Azerbaijani, English, Russian)
- 📱 **Responsive design** with mobile-first approach
- ✨ **Smooth animations** and transitions
- 🎯 **Modern UI/UX** with glass effects and gradients

### Backend
- 🚀 **NestJS** framework
- 🗄️ **PostgreSQL** database
- 🔧 **Prisma ORM** for type-safe database operations
- 📚 **Swagger** API documentation
- ✅ **Validation** with class-validator
- 🌐 **CORS** enabled for frontend integration

## Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL 13+
- npm or yarn

### 1. Clone the repository
```bash
git clone <repository-url>
cd portfolio-site-frontend
```

### 2. Install all dependencies
```bash
npm run install:all
```

### 3. Set up the Database

```bash
cd backend

# Create .env file
cp .env.example .env
# Edit .env with your database credentials

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Seed the database
npm run prisma:seed
```

### 4. Start both Frontend and Backend

```bash
# From the root directory
npm run dev
```

This will start both:
- **Backend**: http://localhost:3000 (API: http://localhost:3000/api)
- **Frontend**: http://localhost:5174

### Alternative: Start individually

```bash
# Backend only
npm run dev:backend

# Frontend only  
npm run dev:frontend
```

## API Endpoints

### Projects
- `GET /projects` - Get all projects
- `GET /projects/featured` - Get featured projects
- `POST /projects` - Create new project (admin)

### Contacts
- `POST /contacts` - Submit contact form

### Experiences
- `GET /experiences` - Get all work experiences
- `GET /experiences/current` - Get current experiences

## Technologies Used

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Vite
- React i18next
- Lucide React (icons)

### Backend
- NestJS
- TypeScript
- PostgreSQL
- Prisma
- Swagger/OpenAPI
- class-validator
- class-transformer

## Development

### Frontend Development
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend Development
```bash
cd backend
npm run start:dev    # Start development server
npm run build        # Build for production
npm run prisma:studio # Open Prisma Studio
npm run lint         # Run ESLint
```

## Database Schema

The database includes three main entities:

- **Projects** - Portfolio projects with technologies, links, and featured status
- **Contacts** - Contact form submissions with status tracking
- **Experiences** - Work experience entries with company, position, and technologies

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.