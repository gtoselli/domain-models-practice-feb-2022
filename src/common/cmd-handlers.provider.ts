import { Cmd } from "./cmd.class";
import { ReserveSeatCmd } from "../seats/commands/reserve-seat.cmd";
import { ReserveSeatCmdHandler } from "../seats/commands/reserve-seat.cmd-handler";

export class CmdHandlers {
  constructor(private readonly reserveSeatCmdHandler: ReserveSeatCmdHandler) {}

  public handle(cmd: Cmd) {
    console.log(
      `[${CmdHandlers.name}] handling cmd ${
        cmd.constructor.name
      } with payload ${JSON.stringify(cmd)}`
    );

    switch (cmd.constructor) {
      case ReserveSeatCmd:
        this.reserveSeatCmdHandler.handle(cmd as ReserveSeatCmd);
        break;
      default:
        console.error("Handler not found");
    }
  }
}
