import { SocketService } from '../socket/socket.service';
import { Tracker } from '@live-tracking/shared';
import { TrackerHistory } from '@live-tracking/shared';
import { Location } from '@live-tracking/shared';
import { Socket } from 'socket.io';
export declare class TrackerService {
    private trackers;
    private readonly trackerHistory;
    private socketService;
    constructor(socketService: SocketService);
    getTrackers(): Promise<Tracker[]>;
    updateLocation(trackerId: string, location: Location): Promise<void>;
    getTrackerHistory(trackerId: string): Promise<TrackerHistory>;
    handleConnection(client: Socket): void;
    simulateTrackerMovement(): void;
}
