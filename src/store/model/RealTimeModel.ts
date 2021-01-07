import { Record } from "immutable";

const RealTimeRecord = Record({
  client_id: "",
  connected: true,
  date_begin: null,
  date_deleted: null,
  date_end: null,
  device_name: "",
  fiscal: null,
  is_closed: null,
  name: "",
  null_guests: null,
  team: [
    {
      date_begin: null,
      date_end: null,
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
      cancelled: null,
      date_begin: null,
      date_end: null,
      items: [
        {
          cancelled: 0,
          category: "",
          creation_date: null,
          live_paid: null,
          name: "",
          parent_category: "",
          parent_category_index: null,
          price: {
            amount: null,
            currency: "",
            tax: null,
            tax_name: "",
            tier: "",
          },
          quantity: null,
          step_index: null,
          transferred: null,
          waiter: "",
          waiter_id: "",
        },
      ],
      live_paid: null,
      number_guests: null,
      order_id: null,
      payments: [
        {
          amount: null,
          cancelled: null,
          clientID: "",
          creation_date: null,
          currency: "",
          mode: null,
          name: "",
          type: null,
        },
      ],
      price: { amount: null, currency: "", tier: "" },
      prints_count: null,
      room: "",
      table: "",
      transferred: null,
      waiter: "",
      waiter_id: "",
    },
  ],
});

class RealTime extends RealTimeRecord {
  constructor(
    data?: Partial<{
      client_id: string;
      connected: boolean;
      date_begin: null;
      date_deleted: null;
      date_end: null;
      device_name: string;
      fiscal: null;
      is_closed: null;
      name: string;
      null_guests: null;
      team: [
        {
          date_begin: null;
          date_end: null;
          name: string;
        }
      ];
      ticket_address: string;
      ticket_city: string;
      ticket_company: string;
      ticket_country: string;
      ticket_naf: string;
      ticket_name: string;
      ticket_phone: string;
      ticket_text: string;
      ticket_tva: string;
      ticket_url: string;
      ticket_zip: string;
      tickets: [
        {
          cancelled: null;
          date_begin: null;
          date_end: null;
          items: [
            {
              cancelled: 0;
              category: string;
              creation_date: null;
              live_paid: null;
              name: string;
              parent_category: string;
              parent_category_index: null;
              price: {
                amount: null;
                currency: string;
                tax: null;
                tax_name: string;
                tier: string;
              };
              quantity: null;
              step_index: null;
              transferred: null;
              waiter: string;
              waiter_id: string;
            }
          ];
          live_paid: null;
          number_guests: null;
          order_id: null;
          payments: [
            {
              amount: null;
              cancelled: null;
              clientID: string;
              creation_date: null;
              currency: string;
              mode: null;
              name: string;
              type: null;
            }
          ];
          price: { amount: null; currency: string; tier: string };
          prints_count: null;
          room: string;
          table: string;
          transferred: null;
          waiter: string;
          waiter_id: string;
        }
      ];
    }>
  ) {
    super(data);
  }

  total_transfered(): number {
    let totalTransferred: number[] = [0];
    let sumTransferred: number = 0;

    this.tickets.map((aTicket) => {
      const realAmount = (aTicket.transferred / 100).toFixed(2);
      const parseNumber = parseFloat(realAmount);
      totalTransferred.push(parseNumber);
      totalTransferred.reduce((a: number, b: number) => {
        return (sumTransferred = a + b);
      });
    });

    return sumTransferred;
  }

  total_sumDiscount(): number {
    let totalDiscount: number[] = [0];
    let sumDiscount: number = 0;

    this.tickets.map((aTicket) => {
      if (aTicket.live_paid > 0) {
        aTicket.payments.map((aPayment) => {
          if (
            aPayment.name == "Offert Client" ||
            aPayment.name == "Offert Staff"
          ) {
            const realAmount = (aPayment.amount / 100).toFixed(2);
            const parseNumber = parseFloat(realAmount);
            totalDiscount.push(parseNumber);
            totalDiscount.reduce((a: number, b: number) => {
              return (sumDiscount = a + b);
            });
          }
        });
      }
    });

    return sumDiscount;
  }

  total_sumPaid(): number {
    let totalPricePaid: number[] = [];
    let sumPaid: number = 0;
    let totalDiscount: number[] = [];
    let sumDiscount: number = 0;
    let realAmount: string = null;
    let parseNumber: number = 0;

    this.tickets.forEach((aTicket) => {
      if (aTicket.live_paid > 0) {
        aTicket.payments.forEach((aPayment) => {
          if (
            aPayment.name == "Offert Client" ||
            aPayment.name == "Offert Staff"
          ) {
            realAmount = (aPayment.amount / 100).toFixed(2);
            parseNumber = parseFloat(realAmount);
            totalDiscount.push(parseNumber);
            totalDiscount.reduce((a: number, b: number) => {
              return (sumDiscount = a + b);
            });
          } else {
            realAmount = (aPayment.amount / 100).toFixed(2);
            parseNumber = parseFloat(realAmount);
            totalPricePaid.push(parseNumber);
            sumPaid = totalPricePaid.reduce((a: number, b: number) => {
              return (sumPaid = a + b);
            });
          }
        });
      }
    });
    return sumPaid;
  }

  total_sumGuestPaid(): number {
    let totalGuestPaid: number[] = [0];
    let sumGuestPaid: number = 0;

    this.tickets.map((aTicket) => {
      if (aTicket.live_paid > 0) {
        totalGuestPaid.push(aTicket.number_guests);
        totalGuestPaid.reduce((a: number, b: number) => {
          return (sumGuestPaid = a + b);
        });
      }
    });

    return sumGuestPaid;
  }

  total_sumNotPaid() {
    let totalPriceNotPaid: number[] = [0];
    let sumNotPaid: number = 0;

    this.tickets.forEach((aTicket) => {
      if (aTicket.payments == undefined || aTicket.live_paid == 0) {
        const realAmount = (aTicket.price.amount / 100).toFixed(1);
        const parseNumber = parseFloat(realAmount);
        totalPriceNotPaid.push(parseNumber);
        totalPriceNotPaid.reduce((a: number, b: number) => {
          return (sumNotPaid = a + b);
        });
      }
    });
    return sumNotPaid;
  }

  total_sumGuestNotPaid(): number {
    let totalGuestNotPaid: number[] = [0];
    let sumGuestNotPaid: number = 0;

    this.tickets.map((aTicket) => {
      if (aTicket.payments == undefined) {
        totalGuestNotPaid.push(aTicket.number_guests);
        totalGuestNotPaid.reduce((a: number, b: number) => {
          return (sumGuestNotPaid = a + b);
        });
      }
    });
    return sumGuestNotPaid;
  }

  total_sumCancelled(): number {
    let sumCancelled: number = 0;
    let totalCancelled: number[] = [0];

    this.tickets.map((aTicket) => {
      if (aTicket.cancelled > 0 && aTicket.items != undefined) {
        aTicket.items.map((aItem) => {
          const realAmount = (aItem.price.amount / 100).toFixed(2);
          const parseNumber = parseFloat(realAmount);
          totalCancelled.push(parseNumber);
          totalCancelled.reduce((a: number, b: number) => {
            return (sumCancelled = a + b);
          });
        });
      } else if (aTicket.items) {
        aTicket.items.forEach((aItem) => {
          if (aItem.cancelled > 0) {
            const realAmount = (aItem.price.amount / 100).toFixed(2);
            const parseNumber = parseFloat(realAmount);
            totalCancelled.push(parseNumber);
            totalCancelled.reduce((a: number, b: number) => {
              return (sumCancelled = a + b);
            });
          }
        });
      }
    });

    return sumCancelled;
  }

  // function total

  sumTotal(): number {
    const sumTotal = this.sumTotalPaid() + this.total_sumNotPaid();
    return sumTotal;
  }

  sumTotalPaid(): number {
    const sumTotalPaid =
      this.total_sumPaid() + this.total_sumDiscount() + this.total_transfered();
    return sumTotalPaid;
  }

  sumTotalGuest(): number {
    let totalGuests: number = 0;
    totalGuests = this.total_sumGuestPaid() + this.total_sumGuestNotPaid();
    return totalGuests;
  }

  total_sumItem(tickets: { items: {}; payments: {} }): number {
    let sumItemTotal: number = 0;
    let totalItem: number[] = [0];
    let itemPrice: number = 0;

    if (tickets.payments) {
      Object.values(tickets.payments).map((aPayement: { amount: number }) => {
        itemPrice = aPayement.amount / 100;
        totalItem.push(itemPrice);
        totalItem.reduce((a: number, b: number) => {
          return (sumItemTotal = a + b);
        });
      });
    }
    return sumItemTotal;
  }
}

export default RealTime;
