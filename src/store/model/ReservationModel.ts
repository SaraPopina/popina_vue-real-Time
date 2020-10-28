import { Record, List } from "immutable";

const ReservationReccord = Record({
  bookingDate: null,
  comments: "",
  createdDate: Date.now(),
  email: "",
  id: "",
  numberOfGuests: null,
  personName: "",
  phone: "",
  sourceName: "",
  tableName: "",
  month: null,
});

class Reservation extends ReservationReccord {
  constructor(
    data?: Partial<{
      bookingDate: number;
      comments: string;
      createdDate: number;
      email: string;
      id: string;
      numberOfGuests: number;
      personName: string;
      phone: string;
      sourceName: string;
      tableName: string;
      month: number;
    }>
  ) {
    super(data);
  }

  // getDate() {
  //   return new Date(this.bookingDate * 1000);
  // }
}

export default Reservation;
