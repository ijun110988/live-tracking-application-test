import { OnModuleInit } from '@nestjs/common';
import { TrackerService } from './tracker.service';
export declare class TrackerModule implements OnModuleInit {
    private readonly trackerService;
    constructor(trackerService: TrackerService);
    onModuleInit(): Promise<void>;
}
