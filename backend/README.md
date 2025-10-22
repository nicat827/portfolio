# Portfolio Backend API

Backend API for portfolio website built with NestJS, PostgreSQL, and Prisma.

## Features

- 🚀 **NestJS** - Modern Node.js framework
- 🗄️ **PostgreSQL** - Robust relational database
- 🔧 **Prisma** - Type-safe database ORM
- 📚 **Swagger** - API documentation
- ✅ **Validation** - Request validation with class-validator
- 🌐 **CORS** - Cross-origin resource sharing

## API Endpoints

### Projects
- `GET /projects` - Get all projects
- `GET /projects/featured` - Get featured projects
- `GET /projects/:id` - Get project by ID
- `POST /projects` - Create new project
- `PATCH /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project

### Contacts
- `GET /contacts` - Get all contact messages
- `GET /contacts/:id` - Get contact message by ID
- `POST /contacts` - Create new contact message
- `PATCH /contacts/:id` - Update contact message
- `PATCH /contacts/:id/status` - Update contact status
- `DELETE /contacts/:id` - Delete contact message

### Experiences
- `GET /experiences` - Get all experiences
- `GET /experiences/current` - Get current experiences
- `GET /experiences/:id` - Get experience by ID
- `POST /experiences` - Create new experience
- `PATCH /experiences/:id` - Update experience
- `DELETE /experiences/:id` - Delete experience

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/portfolio_db?schema=public"
   PORT=3000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5174
   ```

3. **Set up PostgreSQL database:**
   - Install PostgreSQL
   - Create a database named `portfolio_db`
   - Update the `DATABASE_URL` in your `.env` file

4. **Generate Prisma client:**
   ```bash
   npm run prisma:generate
   ```

5. **Run database migrations:**
   ```bash
   npm run prisma:migrate
   ```

6. **Seed the database:**
   ```bash
   npm run prisma:seed
   ```

7. **Start the development server:**
   ```bash
   npm run start:dev
   ```

## Available Scripts

- `npm run start` - Start the application
- `npm run start:dev` - Start in development mode with hot reload
- `npm run build` - Build the application
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio
- `npm run prisma:seed` - Seed the database with sample data

## API Documentation

Once the server is running, visit `http://localhost:3000/api` to view the Swagger API documentation.

## Database Schema

### Projects
- `id` - Unique identifier
- `title` - Project title
- `description` - Project description
- `imageUrl` - Project image URL (optional)
- `technologies` - Array of technologies used
- `githubUrl` - GitHub repository URL (optional)
- `liveUrl` - Live demo URL (optional)
- `featured` - Whether the project is featured
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### Contacts
- `id` - Unique identifier
- `name` - Contact name
- `email` - Contact email
- `subject` - Message subject (optional)
- `message` - Message content
- `status` - Message status (pending, read, replied)
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### Experiences
- `id` - Unique identifier
- `company` - Company name
- `position` - Job position
- `description` - Job description
- `startDate` - Start date
- `endDate` - End date (optional)
- `current` - Whether this is current position
- `technologies` - Array of technologies used
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp
