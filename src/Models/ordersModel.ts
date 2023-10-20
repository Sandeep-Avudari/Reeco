export interface IOrdersModel {
    orders: IOrder[] | undefined;
    statusUpdateModelData: IOrderItem | undefined;
    actionData: IOrderItem | undefined;
}
export interface IOrder {
    id: number
    orderId: string
    status: number
    category: number
    department: string
    supplier: string
    shippingDate: string
    orderedDate: string
    items: IOrderItem[]
}

export interface IOrderItem {
    id: number
    productName: string
    brand: string
    price: number
    quantity: number
    status: number
    reason: string
    oldPrice: number
    oldQuantity: number
}