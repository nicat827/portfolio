import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsModule } from './projects/projects.module';
import { ContactsModule } from './contacts/contacts.module';
import { ExperiencesModule } from './experiences/experiences.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    ProjectsModule,
    ContactsModule,
    ExperiencesModule,
  ],
})

export class AppModule {}
