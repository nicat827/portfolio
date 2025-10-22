# Portfolio Setup Instructions

## Prerequisites

Before starting, make sure you have the following installed:

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **PostgreSQL 13+** - [Download here](https://www.postgresql.org/download/)
- **Git** - [Download here](https://git-scm.com/)

## Database Setup

1. **Install PostgreSQL** and start the service
2. **Create a database** named `portfolio_db`
3. **Note your database credentials** (username, password, port - usually 5432)

## Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Open `.env` file
   - Update `DATABASE_URL` with your PostgreSQL credentials:
     ```
     DATABASE_URL="postgresql://your_username:your_password@localhost:5432/portfolio_db?schema=public"
     ```

4. **Generate Prisma client:**
   ```bash
   npm run prisma:generate
   ```

5. **Run database migrations:**
   ```bash
   npm run prisma:migrate
   ```

6. **Seed the database with sample data:**
   ```bash
   npm run prisma:seed
   ```

7. **Start the backend server:**
   ```bash
   npm run start:dev
   ```

   The backend will be available at:
   - **API**: http://localhost:3000
   - **Documentation**: http://localhost:3000/api

## Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend development server:**
   ```bash
   npm run dev
   ```

   The frontend will be available at: http://localhost:5174

## Verification

1. **Backend is running** - Visit http://localhost:3000/api to see Swagger documentation
2. **Frontend is running** - Visit http://localhost:5174 to see the website
3. **Database is connected** - Check the backend console for "Database connected" message

## Troubleshooting

### Database Connection Issues
- Make sure PostgreSQL is running
- Check your database credentials in `.env`
- Ensure the database `portfolio_db` exists

### Port Conflicts
- Backend runs on port 3000 (change in `.env` if needed)
- Frontend runs on port 5174 (change in `vite.config.ts` if needed)

### Dependencies Issues
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## Project Structure

```
portfolio-site-frontend/
├── frontend/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── sections/
│   │   ├── locales/
│   │   └── ...
│   └── package.json
├── backend/           # NestJS backend
│   ├── src/
│   │   ├── projects/
│   │   ├── contacts/
│   │   ├── experiences/
│   │   └── prisma/
│   └── package.json
└── README.md
```

## Next Steps

1. **Customize the content** - Update projects, experiences, and personal information
2. **Add your own images** - Replace placeholder images with your project screenshots
3. **Configure deployment** - Set up hosting for both frontend and backend
4. **Add authentication** - Implement admin panel for content management

## Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all prerequisites are installed
3. Ensure all services are running
4. Check the database connection
