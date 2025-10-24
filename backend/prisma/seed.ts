import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Get credentials from environment variables
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  // Validate that environment variables are set
  if (!email || !password) {
    console.error('❌ Error: ADMIN_EMAIL and ADMIN_PASSWORD environment variables must be set');
    process.exit(1);
  }

  // Validate password strength (minimum 8 characters)
  if (password.length < 8) {
    console.error('❌ Error: ADMIN_PASSWORD must be at least 8 characters long');
    process.exit(1);
  }

  const saltRounds = 10;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log(`✅ Admin user with email "${email}" already exists`);
    return;
  }

  // Create admin user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  console.log('✅ Admin user created successfully');
 
}

main()
  .catch((e) => {
    console.error('❌ Seed script failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
