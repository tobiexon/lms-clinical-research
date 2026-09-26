import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security
  app.use(helmet());

  // CORS — allow Next.js frontend
  // FRONTEND_URL           = exact prod URL        e.g. https://crn.vercel.app
  // FRONTEND_URL_DEV       = exact dev URL         e.g. https://crn-dev.vercel.app
  // FRONTEND_VERCEL_DOMAIN = base Vercel project   e.g. crn (matches *.vercel.app previews)
  const allowedOrigins: (string | RegExp)[] = [
    'http://localhost:3000',
    'http://localhost:3002',
  ];

  if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL);
  }
  if (process.env.FRONTEND_URL_DEV) {
    allowedOrigins.push(process.env.FRONTEND_URL_DEV);
  }
  // Allow all Vercel preview deployment URLs for this project
  // e.g. crn-git-dev-yourname.vercel.app, crn-abc123.vercel.app
  if (process.env.FRONTEND_VERCEL_DOMAIN) {
    allowedOrigins.push(
      new RegExp(`https://${process.env.FRONTEND_VERCEL_DOMAIN}[a-z0-9-]*\\.vercel\\.app$`),
    );
  }

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Global API prefix
  app.setGlobalPrefix('api/v1');

  // Health check endpoint — used by cron-job.org to keep Render free tier awake
  // Accessible at /api/v1/health (outside the NestJS module system for simplicity)
  const httpAdapter = app.getHttpAdapter();
  httpAdapter.get('/api/v1/health', (_req: any, res: any) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`\n🚀 Exon Sciences LMS API running on: http://localhost:${port}/api/v1`);
  console.log(`📚 Environment: ${process.env.NODE_ENV || 'development'}\n`);
}

bootstrap();
