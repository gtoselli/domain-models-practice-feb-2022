import { SeatReservedEvent } from "./events/seat-reserved.event";
import { Event } from "../common/event.class";
import { Seat } from "./seats";
import { SeatInitialisedEvent } from "./events/seat-initialised.event";

export class SeatsState {
  public seats: Seat[] = [];

  constructor(events: Event[]) {
    events.forEach((e) => this.apply(e));
  }

  private applySeatReservedEvent(event: SeatReservedEvent) {
    const _index = this.seats.findIndex((_) => _.id === event.seat);
    this.seats[_index].is_reserved = true;
    this.seats[_index].reserved_to = event.customer;
  }

  private applySeatInitialisedEvent(event: SeatInitialisedEvent) {
    this.seats.push({
      id: event.seat,
      is_reserved: event.is_reserved,
      reserved_to: undefined,
    });
  }

  public apply(event: Event) {
    switch (event.constructor.name) {
      case SeatReservedEvent.name:
        this.applySeatReservedEvent(event as SeatReservedEvent);
        break;
      case SeatInitialisedEvent.name:
        this.applySeatInitialisedEvent(event as SeatInitialisedEvent);
    }
  }
}
