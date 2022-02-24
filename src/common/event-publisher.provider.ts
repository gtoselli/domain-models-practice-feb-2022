import { Event } from "./event.class";

export class EventPublisher {
  public published_events: Event[] = [];

  public publish(event: Event) {
    console.log({ event });
    this.published_events.push(event);
  }
}
