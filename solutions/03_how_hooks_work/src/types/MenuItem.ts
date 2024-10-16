// To parse this data:
//
//   import { Convert } from "./file";
//
//   const menuItem = Convert.toMenuItem(json);

export type MenuItem = {
  id?: number;
  name?: string;
  description?: string;
  category?: string;
  price?: number;
  imageURL?: string;
  available?: boolean;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toMenuItem(json: string): MenuItem[] {
    return JSON.parse(json);
  }

  public static menuItemToJson(value: MenuItem[]): string {
    return JSON.stringify(value);
  }
}
