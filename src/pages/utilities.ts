export const getAMountFormat = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}
export enum ESTATUS {
    Added = 1,
    Approved = 2,
    Missing_Urgent = 3,
    Missing = 4,
    Shipped = 5,
}
export const isOrderDone = (orderStatus: number, shippingDate: string | undefined) => {
    return (orderStatus === ESTATUS.Approved || (shippingDate ? (new Date(shippingDate) < new Date()) : false));
}