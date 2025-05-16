import { Module } from '@nestjs/common';
import { TrackerModule } from './tracker/tracker.module';
import { SocketModule } from './socket.module';

@Module({
  imports: [TrackerModule, SocketModule],
  providers: []
})
export class AppModule {}
