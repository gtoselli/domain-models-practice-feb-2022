import { SeatsState } from "../seats/seatsState";
import { EventPublisher } from "../common/event-publisher.provider";
import { CmdHandlers } from "../common/cmd-handlers.provider";
import { ReserveSeatCmdHandler } from "../seats/commands/reserve-seat.cmd-handler";
import { ReserveSeatCmd } from "../seats/commands/reserve-seat.cmd";
import { SeatReservedEvent } from "../seats/events/seat-reserved.event";
import { SeatInitialisedEvent } from "../seats/events/seat-initialised.event";

describe("E2e", () => {
  let seatsState: SeatsState;
  let events_publisher: EventPublisher;
  let commands_handler: CmdHandlers;

  beforeEach(() => {
    events_publisher = new EventPublisher();
    seatsState = new SeatsState([
      new SeatInitialisedEvent("A01"),
      new SeatInitialisedEvent("A02"),
      new SeatInitialisedEvent("A03"),
      new SeatInitialisedEvent("A04"),
    ]);
    commands_handler = new CmdHandlers(
      new ReserveSeatCmdHandler(seatsState, events_publisher)
    );
  });

  describe("When reserve-seat command", () => {
    beforeEach(() => {
      commands_handler.handle(new ReserveSeatCmd("Gabriele", "A01"));
    });

    it("seat-reserved event should be published", () => {
      const expected_events = [new SeatReservedEvent("A01", "Gabriele")];
      expect(events_publisher.published_events).toEqual(expected_events);
    });
  });
});
