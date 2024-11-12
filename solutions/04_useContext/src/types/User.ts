// To parse this data:
//
//   import { Convert } from "./file";
//
//   const user = Convert.toUser(json);

export type User = {
  id?: number;
  username?: string;
  password?: string;
  first?: string;
  last?: string;
  phone?: string;
  email?: string;
  imageUrl?: string;
  creditCard?: CreditCard;
  adminUser?: boolean;
  isServer?: boolean;
  jwtToken?: string;
}

export type CreditCard = {
  pan?: string;
  expiryMonth?: number;
  expiryYear?: number;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toUser(json: string): User[] {
    return JSON.parse(json);
  }

  public static userToJson(value: User[]): string {
    return JSON.stringify(value);
  }
}
