export interface TicketDTO {
    id: string;
    eventId: string;
    orgId: string;
    name: string;
    description?: string | null;
    price: number; // This should be a number in the DTO
    quantity: number;
    eventDate: string;
    saleStartDate: string;
    saleEndDate: string;
    isEarlyBird?: boolean | null;
    maxPerCustomer?: number | null;
    isFree?: boolean | null;
    category?: string | null;
    promoCodeRequired?: boolean | null;
    availableOnline?: boolean | null;
    groupDiscountAvailable?: boolean | null;
    refundable?: boolean | null;
    currency?: string | null;
    salesLimitPerDay?: number | null;
    createdAt?: string | null;
    updatedAt?: string | null;
}
