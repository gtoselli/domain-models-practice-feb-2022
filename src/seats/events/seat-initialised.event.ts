import { Event } from "../../common/event.class";
import { SeatId } from "../seats";

export class SeatInitialisedEvent implements Event {
  constructor(public seat: SeatId, public is_reserved: boolean = false) {}
}
