import { Cmd } from "../../common/cmd.class";
import { CustomerId } from "../../costumers/costuments";
import { SeatId } from "../seats";

export class ReserveSeatCmd implements Cmd {
  constructor(public customer: CustomerId, public seat: SeatId) {}
}
