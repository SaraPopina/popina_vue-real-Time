import { Record, List } from "immutable";

const ReservationReccord = Record({
  bookingDate: null,
  comments: "",
  createdDate: null,
  email: "",
  id: "",
  numberOfGuests: null,
  personName: "",
  phone: "",
  sourceName: "",
  tableName: "",
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
    }>
  ) {
    super(data);
  }

  // getDate() {
  //   return new Date(this.bookingDate * 1000);
  // }
}

export default Reservation;
