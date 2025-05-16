"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketService = void 0;
const common_1 = require("@nestjs/common");
let SocketService = class SocketService {
    setServer(server) {
        this.server = server;
        this.server.on('connection', (socket) => {
            console.log('Client connected:', socket.id);
            socket.on('getTrackers', () => {
                console.log('Received getTrackers request from:', socket.id);
                this.server.emit('trackersUpdate', []);
            });
            socket.on('disconnect', () => {
                console.log('Client disconnected:', socket.id);
            });
        });
        this.server.on('updateTrackers', (trackers) => {
            console.log('Received tracker update');
            this.emitTrackers(trackers);
        });
    }
    getServer() {
        return this.server;
    }
    emitTrackers(trackers) {
        if (this.server) {
            console.log('Mengirim update tracker dengan', trackers.length, 'tracker');
            this.server.emit('trackersUpdate', trackers);
        }
    }
};
SocketService = __decorate([
    (0, common_1.Injectable)()
], SocketService);
exports.SocketService = SocketService;
//# sourceMappingURL=socket.service.js.map