import { Record } from "immutable";

const RealTimeRecord = Record({
  client_id: "",
  connected: true,
  date_begin: Number,
  date_deleted: Number,
  date_end: Number,
  device_name: "",
  fiscal: Number,
  is_closed: Number,
  name: "",
  Number_guests: Number,
  team: [
    {
      date_begin: Number,
      date_end: Number,
      name: "",
    },
  ],
  ticket_address: "",
  ticket_city: "",
  ticket_company: "",
  ticket_country: "",
  ticket_naf: "",
  ticket_name: "",
  ticket_phone: "",
  ticket_text: "",
  ticket_tva: "",
  ticket_url: "",
  ticket_zip: "",
  tickets: [
    {
      cancelled: Number,
      date_begin: Number,
      date_end: Number,
      items: [
        {
          cancelled: 0,
          category: "",
          creation_date: Number,
          live_paid: Number,
          name: "",
          parent_category: "",
          parent_category_index: Number,
          price: {
            amount: Number,
            currency: "",
            tax: Number,
            tax_name: "",
            tier: "",
          },
          quantity: Number,
          step_index: Number,
          transferred: Number,
          waiter: "",
          waiter_id: "",
        },
      ],
      live_paid: Number,
      Number_guests: Number,
      order_id: Number,
      payments: [
        {
          amount: Number,
          cancelled: Number,
          clientID: "",
          creation_date: Number,
          currency: "",
          mode: Number,
          name: "",
          type: Number,
        },
      ],
      price: { amount: Number, currency: "", tier: "" },
      prints_count: Number,
      room: "",
      table: "",
      transferred: Number,
      waiter: "",
      waiter_id: "",
    },
  ],
});

class RealTime extends RealTimeRecord {
  constructor(data?: Partial<{}>) {
    super(data);
  }

  // getDate() {
  //     return new Date(this.createdAt * 1000);
  // }
}

export default RealTimeRecord;
