import { Event } from "../../common/event.class";
import { CustomerId } from "../../costumers/costuments";
import { SeatId } from "../seats";

export class SeatReservedEvent implements Event {
  constructor(public seat: SeatId, public customer: CustomerId) {}
}
