"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const helmet_1 = require("helmet");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, helmet_1.default)());
    const allowedOrigins = [
        'http://localhost:3000',
        'http://localhost:3002',
    ];
    if (process.env.FRONTEND_URL) {
        allowedOrigins.push(process.env.FRONTEND_URL);
    }
    if (process.env.FRONTEND_URL_DEV) {
        allowedOrigins.push(process.env.FRONTEND_URL_DEV);
    }
    if (process.env.FRONTEND_VERCEL_DOMAIN) {
        allowedOrigins.push(new RegExp(`https://${process.env.FRONTEND_VERCEL_DOMAIN}[a-z0-9-]*\\.vercel\\.app$`));
    }
    app.enableCors({
        origin: allowedOrigins,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.setGlobalPrefix('api/v1');
    const httpAdapter = app.getHttpAdapter();
    httpAdapter.get('/api/v1/health', (_req, res) => {
        res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
    });
    const port = process.env.PORT || 3001;
    await app.listen(port);
    console.log(`\n🚀 Exon Sciences LMS API running on: http://localhost:${port}/api/v1`);
    console.log(`📚 Environment: ${process.env.NODE_ENV || 'development'}\n`);
}
bootstrap();
//# sourceMappingURL=main.js.map