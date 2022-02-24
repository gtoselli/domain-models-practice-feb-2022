import { Cmd } from "./cmd.class";
import { ReserveSeatCmd } from "../seats/commands/reserve-seat.cmd";
import { ReserveSeatCmdHandler } from "../seats/commands/reserve-seat.cmd-handler";

export class CmdHandler {
  constructor(private readonly reserveSeatCmdHandler: ReserveSeatCmdHandler) {}

  public handle(cmd: Cmd) {
    console.log(
      `[${CmdHandler.name}] handling cmd ${
        cmd.constructor.name
      } with payload ${JSON.stringify(cmd)}`
    );

    switch (cmd.constructor) {
      case ReserveSeatCmd:
        this.reserveSeatCmdHandler.handle(cmd as ReserveSeatCmd);
        break;
      default:
        throw new Error("CMD_HANDLER_NOT_FOUND");
    }
  }
}
