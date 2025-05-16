import { TrackerService } from './tracker.service';
import { Tracker } from '@live-tracking/shared';
import { TrackerHistory } from '@live-tracking/shared';
export declare class TrackerController {
    private readonly trackerService;
    constructor(trackerService: TrackerService);
    getTrackers(): Promise<Tracker[]>;
    getTrackerHistory(id: string): Promise<TrackerHistory>;
}
