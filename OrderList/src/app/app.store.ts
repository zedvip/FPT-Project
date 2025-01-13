export const Store = {
  getOrders() {
    const value = localStorage.getItem('OrderData');
    console.log('List Orders:', value);
    return value ? JSON.parse(value) : []; // Chuyển chuỗi JSON thành mảng hoặc trả về mảng rỗng
  },

  setOrders(data: any) {
    localStorage.setItem('OrderData', JSON.stringify(data)); // Chuyển mảng thành chuỗi JSON trước khi lưu
  },

  deleteOrder(orderId: number) {
    const orders = this.getOrders(); // Lấy danh sách đơn hàng hiện tại
    const updatedOrders = orders.filter((order: any) => order.id !== orderId); // Loại bỏ đơn hàng theo ID
    this.setOrders(updatedOrders); // Lưu danh sách mới vào localStorage

  },

};
