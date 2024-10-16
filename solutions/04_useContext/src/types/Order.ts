// To parse this data:
//
//   import { Convert } from "./file";
//
//   const order = Convert.toOrder(json);

import { CreditCard } from "./CreditCard.ts";
import { OrderItem } from "./OrderItem.ts";

export type Order = {
  id?: number;
  userId?: number;
  orderTime?: Date | number;
  pickupTime?: Date;
  area?: Area;
  location?: string;
  tax?: number;
  tip?: number;
  creditCard?: CreditCard;
  items?: OrderItem[];
  status?: Status;
}

export type Area = "Theater 1" | "Theater 5" | "Theater 3" | "Theater 2" | "Theater 4" | "Theater 6" | "";

export type Status = "completed" | "problem" | "readyForGuest" | "new";

// Converts JSON strings to/from your types
export class Convert {
  public static toOrder(json: string): Order[] {
    return JSON.parse(json);
  }

  public static orderToJson(value: Order[]): string {
    return JSON.stringify(value);
  }
}
