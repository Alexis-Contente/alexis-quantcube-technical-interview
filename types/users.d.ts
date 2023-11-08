export type Users = {
  id: number;
  name: string;
  username: string;
  email: string;
  website: string;
  phone: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};
