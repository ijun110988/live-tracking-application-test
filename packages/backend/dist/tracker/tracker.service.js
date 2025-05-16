"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackerService = void 0;
const common_1 = require("@nestjs/common");
const socket_service_1 = require("../socket/socket.service");
let TrackerService = class TrackerService {
    constructor(socketService) {
        this.trackers = [];
        this.trackerHistory = new Map();
        this.socketService = socketService;
    }
    async getTrackers() {
        console.log('Current trackers:', this.trackers);
        return this.trackers;
    }
    async updateLocation(trackerId, location) {
        console.log('Updating location for tracker:', trackerId);
        const tracker = this.trackers.find(t => t.id === trackerId);
        if (!tracker) {
            const newTracker = {
                id: trackerId,
                name: `Tracker ${trackerId}`,
                lastLocation: location,
                lastUpdated: new Date(),
                isActive: true
            };
            this.trackers.push(newTracker);
            console.log('New tracker created:', newTracker);
        }
        else {
            tracker.lastLocation = location;
            tracker.lastUpdated = new Date();
            tracker.isActive = true;
            console.log('Tracker updated:', tracker);
        }
        if (!this.trackerHistory.has(trackerId)) {
            this.trackerHistory.set(trackerId, []);
        }
        const history = this.trackerHistory.get(trackerId) || [];
        history.push(location);
        this.trackerHistory.set(trackerId, history);
        this.socketService.emitTrackers(this.trackers);
        console.log('Emitting trackersUpdate with:', this.trackers);
    }
    async getTrackerHistory(trackerId) {
        var _a, _b;
        const history = this.trackerHistory.get(trackerId) || [];
        return {
            trackerId,
            locations: history.slice(-100),
            startDate: ((_a = history[0]) === null || _a === void 0 ? void 0 : _a.timestamp) || new Date(),
            endDate: ((_b = history[history.length - 1]) === null || _b === void 0 ? void 0 : _b.timestamp) || new Date()
        };
    }
    handleConnection(client) {
        console.log(`Client connected: ${client.id}`);
        client.emit('trackersUpdate', Array.from(this.trackers.values()));
        client.on('disconnect', () => {
            console.log(`Client disconnected: ${client.id}`);
        });
    }
    simulateTrackerMovement() {
        setInterval(() => {
            const activeTrackers = Array.from(this.trackers.values());
            for (const tracker of activeTrackers) {
                const newLocation = Object.assign(Object.assign({}, tracker.lastLocation), { id: tracker.id, latitude: tracker.lastLocation.latitude + (Math.random() - 0.5) * 0.0001, longitude: tracker.lastLocation.longitude + (Math.random() - 0.5) * 0.0001, timestamp: new Date(), speed: Math.random() * 50, heading: Math.random() * 360, battery: Math.random() * 100 });
                this.updateLocation(tracker.id, newLocation);
            }
        }, 5000);
    }
};
TrackerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [socket_service_1.SocketService])
], TrackerService);
exports.TrackerService = TrackerService;
//# sourceMappingURL=tracker.service.js.map