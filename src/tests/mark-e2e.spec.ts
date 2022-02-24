import { Event } from "../common/event.class";
import { Cmd } from "../common/cmd.class";
import { CmdHandlers } from "../common/cmd-handlers.provider";
import { ReserveSeatCmdHandler } from "../seats/commands/reserve-seat.cmd-handler";
import { SeatsState } from "../seats/seatsState";
import { SeatInitialisedEvent } from "../seats/events/seat-initialised.event";
import { SeatReservedEvent } from "../seats/events/seat-reserved.event";
import { ReserveSeatCmd } from "../seats/commands/reserve-seat.cmd";

describe("Marco Heimeshoff homework", () => {
  let seatsState: SeatsState;
  let published_events: Event[] = [];

  const Given = (events: Event[]) => {
    seatsState = new SeatsState(events);
  };

  const When = (cmd: Cmd) => {
    const handler = new CmdHandlers(
      //@ts-ignore
      new ReserveSeatCmdHandler(seatsState, {
        publish: (e: Event) => published_events.push(e),
      })
    );
    handler.handle(cmd);
  };

  const ThenExpect = (expected_events: Event[]) => {
    expect(published_events).toEqual(expected_events);
  };

  it("", () => {
    Given([new SeatInitialisedEvent("A1")]);
    When(new ReserveSeatCmd("Gab", "A1"));
    ThenExpect([new SeatReservedEvent("A1", "Gab")]);
  });
});
