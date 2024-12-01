export interface OrgTicketType {
    id: string;
    eventId: string;
    orgId: string;
    name: string;
    description?: string | null;
    price: number;
    quantity: number;
    eventDate: string;
    saleStartDate: string;
    saleEndDate: string;
    isEarlyBird?: boolean;
    maxPerCustomer?: number;
    isFree?: boolean;
    category?: string;
    promoCodeRequired?: boolean;
    availableOnline?: boolean;
    groupDiscountAvailable?: boolean;
    refundable?: boolean;
    currency?: string;
    salesLimitPerDay?: number;
    createdAt?: string;
    updatedAt?: string;
}
