import { CustomerId } from "../costumers/costuments";
import { SeatReservedEvent } from "./events/seat-reserved.event";

export type SeatId = string;

export type Seat = {
  id: SeatId;
  is_reserved: boolean;
  reserved_to?: CustomerId;
};

export class Seats {
  constructor(private readonly seatState, private readonly eventPublisher) {}

  public reserveSeat(seat: SeatId, customer: CustomerId) {
    this.eventPublisher.publish(new SeatReservedEvent(seat, customer));
  }

  public isAvailable(seat: SeatId): boolean {
    console.log(`[${Seats.name}] checking availability for seat  ${seat}`);
    const _seat = this.getSeat(seat);
    return !_seat.is_reserved;
  }

  private getSeat(seat_id: SeatId) {
    const seat = this.seatState.seats.find((_) => _.id === seat_id);
    if (!seat) throw new Error("SEAT_NOT_FOUND");
    return seat;
  }
}
