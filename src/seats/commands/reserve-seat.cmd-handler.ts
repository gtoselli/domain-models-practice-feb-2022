import { SeatsState } from "../seatsState";
import { ReserveSeatCmd } from "./reserve-seat.cmd";
import { EventPublisher } from "../../common/event-publisher.provider";
import { Seats } from "../seats";

export class ReserveSeatCmdHandler {
  constructor(
    private readonly seatsState: SeatsState,
    private readonly eventPublisher: EventPublisher
  ) {}

  handle(cmd: ReserveSeatCmd) {
    console.log(`[${ReserveSeatCmdHandler.name}] handling command`);

    const seats = new Seats(this.seatsState, this.eventPublisher);

    const seat_is_available = seats.isAvailable(cmd.seat);
    if (!seat_is_available) throw new Error("SEAT_NOT_AVAILABLE");

    seats.reserveSeat(cmd.seat, cmd.customer);
  }
}
