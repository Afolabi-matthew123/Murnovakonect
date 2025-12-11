import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  console.log('  Starting Murnova Konect API (FM-1 core)...');

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });

  // Global API prefix
  app.setGlobalPrefix('api');

  // Basic security hardening
  app.use(helmet());
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Global validation / transformation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`✅ API running on http://localhost:${port}`);
  console.log(`   Health: http://localhost:${port}/api/health`);
}

bootstrap().catch((err) => {
  console.error('Bootstrap error:', err);
  process.exit(1);
});
