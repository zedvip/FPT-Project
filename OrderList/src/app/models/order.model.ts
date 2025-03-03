export interface Order {
  id: number;
  totalPrice: number;
  items: { productId: number; productName: string; price: number; quantity: number }[];
}
