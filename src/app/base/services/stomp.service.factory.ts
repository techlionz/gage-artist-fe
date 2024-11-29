import { StompService } from './stomp.service';
import { StompConfig } from './stomp.config';

export function StompServiceFactory() {
  const rxStomp = new StompService();
  rxStomp.configure(StompConfig);
  rxStomp.activate();
  return rxStomp;
}