import { Controller, Get, Param } from '@nestjs/common';
import { TrackerService } from './tracker.service';
import { Tracker } from '@live-tracking/shared';
import { TrackerHistory } from '@live-tracking/shared';

@Controller('api')
export class TrackerController {
    constructor(private readonly trackerService: TrackerService) {}

    @Get('trackers')
    async getTrackers(): Promise<Tracker[]> {
        return this.trackerService.getTrackers();
    }

    @Get('trackers/:id/history')
    async getTrackerHistory(@Param('id') id: string): Promise<TrackerHistory> {
        return this.trackerService.getTrackerHistory(id);
    }
}
