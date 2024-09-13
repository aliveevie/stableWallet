"use client";

import React, { useEffect, useState } from 'react';

const offerings = [
  {
    pfiName: "Aqua Capital",
    offerings: ["USD to NGN", "KES to USD", "NGN to KES"]
  },
  {
    pfiName: "Flowback Financial",
    offerings: ["USD to EUR", "EUR to USD"]
  },
  {
    pfiName: "Vertex Liquid Assets",
    offerings: ["EUR to USD", "USD to GBP"]
  },
  {
    pfiName: "Titanium Trust",
    offerings: ["USD to AUD", "USD to GBP"]
  }
];

const Horizontal = () => {
  const [offeringsList, setOfferingsList] = useState([]);

  useEffect(() => {
    const formattedOfferings = offerings.flatMap((offering) =>
      offering.offerings.map((item) => `${offering.pfiName}: ${item}`)
    );
    setOfferingsList(formattedOfferings);
  }, []);

  return (
    <div className="fixed bottom-0 w-full bg-gray-900 p-2 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        <span className="text-white font-semibold mr-4">Available Offerings: </span>
        {offeringsList.map((offer, index) => (
          <span key={index} className="text-white mr-8">
            {offer}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Horizontal;
