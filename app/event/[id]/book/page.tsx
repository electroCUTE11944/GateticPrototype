"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CreditCard } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

// Seat layout data
const seatLayout = {
  rows: 10,
  seatsPerRow: 20,
  vipRows: 2,
  regularPrice: 25,
  vipPrice: 50,
  occupiedSeats: [
    "A1",
    "A2",
    "A5",
    "A8",
    "A12",
    "A15",
    "A18",
    "B3",
    "B7",
    "B11",
    "B14",
    "B19",
    "C2",
    "C6",
    "C9",
    "C13",
    "C16",
    "C20",
    "D1",
    "D4",
    "D8",
    "D12",
    "D17",
    "E5",
    "E10",
    "E15",
    "E18",
  ],
};

export default function SeatSelection() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const generateSeatId = (rowIndex: number, seatIndex: number) => {
    const rowLetter = String.fromCharCode(65 + rowIndex);
    return `${rowLetter}${seatIndex + 1}`;
  };

  const isSeatOccupied = (seatId: string) => {
    return seatLayout.occupiedSeats.includes(seatId);
  };

  const isSeatSelected = (seatId: string) => {
    return selectedSeats.includes(seatId);
  };

  const isVipSeat = (rowIndex: number) => {
    return rowIndex < seatLayout.vipRows;
  };

  const toggleSeat = (seatId: string, rowIndex: number) => {
    if (isSeatOccupied(seatId)) return;

    if (isSeatSelected(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const calculateTotal = () => {
    return selectedSeats.reduce((total, seatId) => {
      const rowIndex = seatId.charCodeAt(0) - 65;
      const price = isVipSeat(rowIndex)
        ? seatLayout.vipPrice
        : seatLayout.regularPrice;
      return total + price;
    }, 0);
  };

  const handleProceedToPayment = () => {
    if (selectedSeats.length === 0) return;

    // Store selected seats in localStorage for the invoice page
    localStorage.setItem(
      "selectedSeats",
      JSON.stringify({
        eventId,
        seats: selectedSeats,
        total: calculateTotal(),
      })
    );

    router.push(`/event/${eventId}/invoice`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" asChild>
            <Link href={`/event/${eventId}`}>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Select Your Seats
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Choose your preferred seats for the event
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Seating Chart */}
          <div className="lg:col-span-3">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Seating Chart</CardTitle>
                <CardDescription>
                  Click on available seats to select them
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Stage */}
                  <div className="text-center">
                    <div className="bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 py-3 px-8 rounded-lg inline-block font-semibold">
                      STAGE
                    </div>
                  </div>

                  {/* Seating Grid */}
                  <div className="space-y-2 max-w-4xl mx-auto">
                    {Array.from({ length: seatLayout.rows }, (_, rowIndex) => (
                      <div
                        key={rowIndex}
                        className="flex items-center justify-center gap-1"
                      >
                        {/* Row Label */}
                        <div className="w-8 text-center font-semibold text-gray-600 dark:text-gray-300">
                          {String.fromCharCode(65 + rowIndex)}
                        </div>

                        {/* Seats */}
                        <div className="flex gap-1">
                          {Array.from(
                            { length: seatLayout.seatsPerRow },
                            (_, seatIndex) => {
                              const seatId = generateSeatId(
                                rowIndex,
                                seatIndex
                              );
                              const occupied = isSeatOccupied(seatId);
                              const selected = isSeatSelected(seatId);
                              const vip = isVipSeat(rowIndex);

                              return (
                                <button
                                  key={seatIndex}
                                  onClick={() => toggleSeat(seatId, rowIndex)}
                                  disabled={occupied}
                                  className={`
                                  w-8 h-8 rounded-md text-xs font-medium transition-all duration-200
                                  ${
                                    occupied
                                      ? "bg-red-200 text-red-800 cursor-not-allowed"
                                      : selected
                                      ? "bg-green-500 text-white shadow-lg scale-110"
                                      : vip
                                      ? "bg-yellow-200 text-yellow-800 hover:bg-yellow-300"
                                      : "bg-blue-200 text-blue-800 hover:bg-blue-300"
                                  }
                                `}
                                  title={`Seat ${seatId} - ${
                                    vip ? "VIP" : "Regular"
                                  } - RM${
                                    vip
                                      ? seatLayout.vipPrice
                                      : seatLayout.regularPrice
                                  }`}
                                >
                                  {seatIndex + 1}
                                </button>
                              );
                            }
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Legend */}
                  <div className="flex justify-center gap-6 mt-6 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-200 rounded"></div>
                      <span>
                        Available Regular (${seatLayout.regularPrice})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-yellow-200 rounded"></div>
                      <span>Available VIP (${seatLayout.vipPrice})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded"></div>
                      <span>Selected</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-200 rounded"></div>
                      <span>Occupied</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 sticky top-4">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedSeats.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                    No seats selected
                  </p>
                ) : (
                  <>
                    <div className="space-y-2">
                      <h4 className="font-semibold">Selected Seats:</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedSeats.map((seatId) => {
                          const rowIndex = seatId.charCodeAt(0) - 65;
                          const vip = isVipSeat(rowIndex);
                          return (
                            <Badge
                              key={seatId}
                              variant={vip ? "default" : "secondary"}
                              className={
                                vip ? "bg-yellow-500 text-yellow-900" : ""
                              }
                            >
                              {seatId} {vip ? "(VIP)" : ""}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span>Seats ({selectedSeats.length})</span>
                        <span>${calculateTotal()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Service Fee</span>
                        <span>RM2.50</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${calculateTotal() + 2.5}</span>
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleProceedToPayment}
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Proceed to Payment
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-lg">Quick Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• VIP seats offer better view and premium amenities</p>
                <p>• You can select multiple seats for group booking</p>
                <p>• Red seats are already taken</p>
                <p>• Click on selected seats to deselect them</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
