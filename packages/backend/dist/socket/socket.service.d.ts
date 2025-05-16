import { Server } from 'socket.io';
import { Tracker } from '@live-tracking/shared';
export declare class SocketService {
    private server;
    setServer(server: Server): void;
    getServer(): Server;
    emitTrackers(trackers: Tracker[]): void;
}
