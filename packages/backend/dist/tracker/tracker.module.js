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
exports.TrackerModule = void 0;
const common_1 = require("@nestjs/common");
const tracker_controller_1 = require("./tracker.controller");
const tracker_service_1 = require("./tracker.service");
const socket_module_1 = require("../socket.module");
let TrackerModule = class TrackerModule {
    constructor(trackerService) {
        this.trackerService = trackerService;
    }
    async onModuleInit() {
        await this.trackerService.updateLocation('tracker1', {
            id: 'tracker1',
            latitude: -6.2088,
            longitude: 106.8456,
            timestamp: new Date(),
            speed: 0,
            heading: 0,
            battery: 100
        });
        await this.trackerService.updateLocation('tracker2', {
            id: 'tracker2',
            latitude: -6.1754,
            longitude: 106.8272,
            timestamp: new Date(),
            speed: 0,
            heading: 0,
            battery: 100
        });
        this.trackerService.simulateTrackerMovement();
    }
};
TrackerModule = __decorate([
    (0, common_1.Module)({
        imports: [socket_module_1.SocketModule],
        controllers: [tracker_controller_1.TrackerController],
        providers: [tracker_service_1.TrackerService],
        exports: [tracker_service_1.TrackerService]
    }),
    __metadata("design:paramtypes", [tracker_service_1.TrackerService])
], TrackerModule);
exports.TrackerModule = TrackerModule;
//# sourceMappingURL=tracker.module.js.map