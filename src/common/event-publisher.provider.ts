import { Event } from "./event.class";

export class EventPublisher {
  public published_events: Event[] = [];

  public publish(event: Event) {
    this.published_events.push(event);
  }
}
