import { Record } from "immutable";

const ReservationReccord = Record({});

class Reservation extends ReservationReccord {
  constructor(data?: Partial<{}>) {
    super(data);
  }

  // getDate() {
  //     return new Date(this.createdAt * 1000);
  // }
}

export default Reservation;
