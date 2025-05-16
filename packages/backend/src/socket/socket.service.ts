import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { Socket } from 'socket.io';
import { Tracker } from '@live-tracking/shared';

@Injectable()
export class SocketService {
    private server: Server;

    setServer(server: Server) {
        this.server = server;
        
        // Add event handlers
        this.server.on('connection', (socket: Socket) => {
            console.log('Client connected:', socket.id);
            
            // Handle getTrackers event
            socket.on('getTrackers', () => {
                console.log('Received getTrackers request from:', socket.id);
                // Emit initial tracker data
                this.server.emit('trackersUpdate', []); // Will be replaced with actual tracker data
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected:', socket.id);
            });
        });

        // Handle tracker updates
        this.server.on('updateTrackers', (trackers: Tracker[]) => {
            console.log('Received tracker update');
            this.emitTrackers(trackers);
        });
    }

    getServer(): Server {
        return this.server;
    }

    emitTrackers(trackers: Tracker[]) {
        if (this.server) {
            console.log('Mengirim update tracker dengan', trackers.length, 'tracker');
            this.server.emit('trackersUpdate', trackers);
        }
    }
}
