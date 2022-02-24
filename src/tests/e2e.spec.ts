import { SeatsState } from "../seats/seatsState";
import { EventPublisher } from "../common/event-publisher.provider";
import { CmdHandler } from "../common/cmd-handler.provider";
import { ReserveSeatCmdHandler } from "../seats/commands/reserve-seat.cmd-handler";
import { ReserveSeatCmd } from "../seats/commands/reserve-seat.cmd";
import { SeatReservedEvent } from "../seats/events/seat-reserved.event";
import { SeatInitialisedEvent } from "../seats/events/seat-initialised.event";

describe("E2e", () => {
  let seatsState: SeatsState;
  let events_publisher: EventPublisher;
  let commands_handler: CmdHandler;
  let events_handler: Event;

  beforeEach(() => {
    events_publisher = new EventPublisher();
    seatsState = new SeatsState([
      new SeatInitialisedEvent("A01"),
      new SeatInitialisedEvent("A02"),
      new SeatInitialisedEvent("A03"),
      new SeatInitialisedEvent("A04"),
    ]);
    commands_handler = new CmdHandler(
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

    it("seat should be reserved", () => {
      seatsState.apply(new SeatReservedEvent("A01", "Gabriele"));

      expect(
        seatsState.seats.find((_) => _.id === "A01")!.is_reserved
      ).toBeTruthy();
    });
  });
});
