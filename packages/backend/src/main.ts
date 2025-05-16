import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'socket.io';
import { SocketService } from './socket/socket.service';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, new ExpressAdapter());
    
    // Enable CORS for HTTP requests
    app.enableCors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    });

    const socketService = app.get(SocketService);
    
    // Initialize Socket.IO
    const io = new Server(app.getHttpServer(), {
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

    // Set server to SocketService
    socketService.setServer(io);

    // Start server
    await app.listen(5000);
    console.log('Application is running on: ' + await app.getUrl());
    console.log('Socket.IO server initialized');
    console.log('Listening on port 5000');

    // Test if server is working
    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

bootstrap();
