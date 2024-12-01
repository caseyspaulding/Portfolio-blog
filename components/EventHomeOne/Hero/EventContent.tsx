"use client";

import React from "react";
import Countdown from "../../Countdown/Countdown";

import "@/styles/style.css";
import "@/styles/responsive.css";
import "@/styles/animate.min.css";


interface Ticket
{
  id: string;
  eventId: string;
  orgId: string;
  name: string;
  description: string | null;
  price: string;
  quantity: number;
  eventDate: string;
  saleStartDate: string;
  saleEndDate: string;
  isEarlyBird: boolean | null;
  maxPerCustomer: number | null;
  isFree: boolean | null;
  category: string;
  promoCodeRequired: boolean | null;
  availableOnline: boolean | null;
  groupDiscountAvailable: boolean | null;
  refundable: boolean | null;
  currency: string;
  salesLimitPerDay: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

interface MainBannerProps
{
  eventName: string;
  eventSubtitle: string;
  eventDate: string;
  location: string;

  startDate: string;
  tickets: Ticket[];
  eventSlug: string;
}

const EventContent: React.FC<MainBannerProps> = ( {
  eventName,
  eventSubtitle,
  eventDate,
  location,

  startDate,

} ) =>
{
  return (

    <div className=" max-w-7xl mx-auto ">
      <div className="bg-white dark:bg-gray-800  overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            { eventName }
            <br />
            <span className="text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-300">
              { eventSubtitle }
            </span>
          </h1>

          <ul className="space-y-2">
            <li className="flex items-center text-gray-700 dark:text-gray-300">
              <i className="icofont-compass mr-2 text-gray-500 dark:text-gray-400"></i>
              <span>{ location }</span>
            </li>
            <li className="flex items-center text-gray-700 dark:text-gray-300 text-lg">
              <i className="icofont-calendar mr-2 text-gray-500 dark:text-gray-400"></i>
              <span>{ eventDate }</span>
            </li>
          </ul>

          <div className="mt-6">
            <Countdown startDate={ startDate } />
          </div>
        </div>
      </div>
    </div>

  );
};

export default EventContent;