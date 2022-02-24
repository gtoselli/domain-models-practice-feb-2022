import { CmdHandler } from "./cmd-handler.provider";
import { ReserveSeatCmdHandler } from "../seats/commands/reserve-seat.cmd-handler";
import { createMock } from "ts-auto-mock";

describe("CmdHandler", () => {
  let cmdHandler: CmdHandler;
  let fooHandlerMock: ReserveSeatCmdHandler =
    createMock<ReserveSeatCmdHandler>();

  beforeEach(() => {
    cmdHandler = new CmdHandler(fooHandlerMock);
  });

  describe("Unknown command", () => {
    class UnknownCmd {}
    it("should throw error", () => {
      expect(() => cmdHandler.handle(new UnknownCmd())).toThrow(
        "CMD_HANDLER_NOT_FOUND"
      );
    });
  });
});
