import { Record } from "immutable";

const ClientReccord = Record({
  id: null,
  address: "",
  addressComplement: "",
  city: "",
  comment: "",
  company: "",
  company_number: "",
  country: "",
  email: "",
  name: "",
  phone: "",
  zip: "",
});

class Client extends ClientReccord {
  constructor(
    data?: Partial<{
      id?: any;
      address?: string;
      addressComplement?: string;
      city?: string;
      comment?: string;
      company?: string;
      company_number?: string;
      country?: string;
      email?: string;
      name?: string;
      phone?: string;
      zip?: string;
    }>
  ) {
    super(data);
  }

  // getDate() {
  //     return new Date(this.createdAt * 1000);
  // }

  toFirebaseObject() {
    let data = this.toJS();
    delete data.id;

    return data;
  }
}

export default Client;
