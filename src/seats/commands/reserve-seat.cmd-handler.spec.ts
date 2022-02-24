import { ReserveSeatCmdHandler } from "./reserve-seat.cmd-handler";
import { Event } from "../../common/event.class";
import { SeatsState } from "../seatsState";
import { EventPublisher } from "../../common/event-publisher.provider";
import { createMock } from "ts-auto-mock";
import { ReserveSeatCmd } from "./reserve-seat.cmd";
import { SeatInitialisedEvent } from "../events/seat-initialised.event";
import { SeatReservedEvent } from "../events/seat-reserved.event";

describe("ReserveSeatCmdHandler", () => {
  let handler: ReserveSeatCmdHandler;
  let fakeSeatsState: SeatsState;
  let fakeEventPublisher: EventPublisher;

  beforeEach(() => {
    fakeEventPublisher = createMock<EventPublisher>();
  });

  describe("Available seat", () => {
    beforeEach(() => {
      fakeSeatsState = new SeatsState([new SeatInitialisedEvent("A01")]);
      handler = new ReserveSeatCmdHandler(fakeSeatsState, fakeEventPublisher);
    });

    it("should publish seat-reserved event", () => {
      handler.handle(new ReserveSeatCmd("Gab", "A01"));

      expect(fakeEventPublisher.publish).toBeCalledWith(
        new SeatReservedEvent("A01", "Gab")
      );
    });
  });

  describe("Reserved seat", () => {
    beforeEach(() => {
      fakeSeatsState = new SeatsState([new SeatInitialisedEvent("A01", true)]);
      handler = new ReserveSeatCmdHandler(fakeSeatsState, fakeEventPublisher);
    });

    it("should throw SEAT_NOT_AVAILABLE event", () => {
      expect(() => {
        handler.handle(new ReserveSeatCmd("Gab", "A01"));
      }).toThrow(new Error("SEAT_NOT_AVAILABLE"));
    });
  });
});
