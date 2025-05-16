import { Module, OnModuleInit } from '@nestjs/common';
import { TrackerController } from './tracker.controller';
import { TrackerService } from './tracker.service';
import { SocketModule } from '../socket.module';

@Module({
  imports: [SocketModule],
  controllers: [TrackerController],
  providers: [TrackerService],
  exports: [TrackerService]
})
export class TrackerModule implements OnModuleInit {
  constructor(private readonly trackerService: TrackerService) {}

  async onModuleInit() {
    // Initialize with some sample trackers
    await this.trackerService.updateLocation('tracker1', {
      id: 'tracker1',
      latitude: -6.2088, // Jakarta
      longitude: 106.8456,
      timestamp: new Date(),
      speed: 0,
      heading: 0,
      battery: 100
    });

    await this.trackerService.updateLocation('tracker2', {
      id: 'tracker2',
      latitude: -6.1754, // Depok
      longitude: 106.8272,
      timestamp: new Date(),
      speed: 0,
      heading: 0,
      battery: 100
    });

    // Start simulation
    this.trackerService.simulateTrackerMovement();
  }
}
