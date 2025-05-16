import { Injectable } from '@nestjs/common';
import { SocketService } from '../socket/socket.service';
import { Tracker } from '@live-tracking/shared';
import { TrackerHistory } from '@live-tracking/shared';
import { Location } from '@live-tracking/shared';
import { Socket } from 'socket.io';

@Injectable()
export class TrackerService {
    private trackers: Tracker[] = [];
    private readonly trackerHistory: Map<string, Location[]> = new Map();
    private socketService: SocketService;

    constructor(socketService: SocketService) {
        this.socketService = socketService;
    }

    async getTrackers(): Promise<Tracker[]> {
        console.log('Current trackers:', this.trackers);
        return this.trackers;
    }

    async updateLocation(trackerId: string, location: Location): Promise<void> {
        console.log('Updating location for tracker:', trackerId);
        const tracker = this.trackers.find(t => t.id === trackerId);
        if (!tracker) {
            const newTracker: Tracker = {
                id: trackerId,
                name: `Tracker ${trackerId}`,
                lastLocation: location,
                lastUpdated: new Date(),
                isActive: true
            };
            this.trackers.push(newTracker);
            console.log('New tracker created:', newTracker);
        } else {
            tracker.lastLocation = location;
            tracker.lastUpdated = new Date();
            tracker.isActive = true;
            console.log('Tracker updated:', tracker);
        }

        // Update history
        if (!this.trackerHistory.has(trackerId)) {
            this.trackerHistory.set(trackerId, []);
        }
        const history = this.trackerHistory.get(trackerId) || [];
        history.push(location);
        this.trackerHistory.set(trackerId, history);

        this.socketService.emitTrackers(this.trackers);
        console.log('Emitting trackersUpdate with:', this.trackers);
    }

    async getTrackerHistory(trackerId: string): Promise<TrackerHistory> {
        const history = this.trackerHistory.get(trackerId) || [];
        return {
            trackerId,
            locations: history.slice(-100), // Limit to last 100 locations
            startDate: history[0]?.timestamp || new Date(),
            endDate: history[history.length - 1]?.timestamp || new Date()
        };
    }

    handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
        
        // Send initial data
        client.emit('trackersUpdate', Array.from(this.trackers.values()));

        client.on('disconnect', () => {
            console.log(`Client disconnected: ${client.id}`);
        });
    }

    simulateTrackerMovement(): void {
        setInterval(() => {
            const activeTrackers = Array.from(this.trackers.values());
            for (const tracker of activeTrackers) {
                // Simulate random movement
                const newLocation: Location = {
                    ...tracker.lastLocation,
                    id: tracker.id,
                    latitude: tracker.lastLocation.latitude + (Math.random() - 0.5) * 0.0001,
                    longitude: tracker.lastLocation.longitude + (Math.random() - 0.5) * 0.0001,
                    timestamp: new Date(),
                    speed: Math.random() * 50,
                    heading: Math.random() * 360,
                    battery: Math.random() * 100
                };

                this.updateLocation(tracker.id, newLocation);
            }
        }, 5000); // Update every 5 seconds
    }
}
