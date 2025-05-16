"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const socket_io_1 = require("socket.io");
const socket_service_1 = require("./socket/socket.service");
const platform_express_1 = require("@nestjs/platform-express");
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter());
        app.enableCors({
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization']
        });
        const socketService = app.get(socket_service_1.SocketService);
        const io = new socket_io_1.Server(app.getHttpServer(), {
            cors: {
                origin: "*",
                methods: ["GET", "POST", "OPTIONS"]
            },
            path: '/socket.io',
            transports: ['websocket', 'polling'],
            allowEIO3: true,
            pingTimeout: 60000,
            pingInterval: 25000
        });
        console.log('Socket.IO server created');
        console.log('Server instance:', io);
        socketService.setServer(io);
        await app.listen(5000);
        console.log('Application is running on: ' + await app.getUrl());
        console.log('Socket.IO server initialized');
        console.log('Listening on port 5000');
        io.on('connection', (socket) => {
            console.log('Client connected:', socket.id);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map