"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Share2, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Dummy event data
const eventData = {
  "1": {
    id: "1",
    title: "Aloha Fes 2024",
    society: "Computer Science Society",
    date: "2024-03-15",
    time: "09:00",
    venue: "Main Auditorium",
    price: 25,
  },
};

export default function Invoice() {
  const params = useParams();
  const eventId = params.id as string;
  const event = eventData[eventId as keyof typeof eventData];

  const [bookingData, setBookingData] = useState<any>(null);
  const [qrCode, setQrCode] = useState("");

  useEffect(() => {
    // Get booking data from localStorage
    const storedData = localStorage.getItem("selectedSeats");
    if (storedData) {
      const data = JSON.parse(storedData);
      setBookingData(data);

      // Generate QR code data (in real app, this would be from backend)
      const qrData = `EVENT:${eventId}|SEATS:${data.seats.join(",")}|TOTAL:${
        data.total + 2.5
      }|ID:${Date.now()}`;
      setQrCode(qrData);
    }
  }, [eventId]);

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    alert("Invoice downloaded successfully!");
  };

  const handleShare = () => {
    // In a real app, this would open share dialog
    alert("Share functionality would be implemented here");
  };

  if (!bookingData || !event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Booking Not Found
          </h1>
          <Button asChild>
            <Link href="/">Back to Events</Link>
          </Button>
        </div>
      </div>
    );
  }

  const invoiceNumber = `INV-${Date.now().toString().slice(-8)}`;
  const bookingDate = new Date().toLocaleDateString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
          <Button variant="outline" size="icon" asChild className="self-start">
            <Link href="/">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                Booking Confirmed!
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Your tickets have been successfully booked
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={handleShare}
              className="w-full sm:w-auto"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button onClick={handleDownload} className="w-full sm:w-auto">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Invoice Card */}
          <Card className="bg-white dark:bg-gray-800 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                  <CardTitle className="text-xl sm:text-2xl mb-2">
                    E-TICKET INVOICE
                  </CardTitle>
                  <p className="text-blue-100 text-sm sm:text-base">
                    University Event Ticketing System
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-blue-100 text-sm">Invoice #</p>
                  <p className="text-lg sm:text-xl font-bold">
                    {invoiceNumber}
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-8 space-y-8">
              {/* Event Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                    Event Details
                  </h3>
                  <div className="space-y-2">
                    <p className="font-semibold text-lg sm:text-xl text-blue-600 dark:text-blue-400 break-words">
                      {event.title}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                      {event.society}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                      {new Date(event.date).toLocaleDateString()} at{" "}
                      {event.time}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                      {event.venue}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                    Booking Information
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm sm:text-base">
                      <span className="text-gray-600 dark:text-gray-300">
                        Booking Date:
                      </span>{" "}
                      {bookingDate}
                    </p>
                    <p className="text-sm sm:text-base">
                      <span className="text-gray-600 dark:text-gray-300">
                        Number of Tickets:
                      </span>{" "}
                      {bookingData.seats.length}
                    </p>
                    <p className="text-sm sm:text-base">
                      <span className="text-gray-600 dark:text-gray-300">
                        Status:
                      </span>{" "}
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        Confirmed
                      </Badge>
                    </p>
                  </div>
                </div>
              </div>

              {/* Seat Details */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Seat Information
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {bookingData.seats.map((seatId: string) => {
                    const rowIndex = seatId.charCodeAt(0) - 65;
                    const isVip = rowIndex < 2;
                    return (
                      <div
                        key={seatId}
                        className="text-center p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div className="font-semibold text-base sm:text-lg">
                          {seatId}
                        </div>
                        <Badge
                          variant={isVip ? "default" : "secondary"}
                          className={`text-xs ${
                            isVip ? "bg-yellow-500 text-yellow-900" : ""
                          }`}
                        >
                          {isVip ? "VIP" : "Regular"}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Payment Summary */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Payment Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Tickets ({bookingData.seats.length})</span>
                    <span>RM{bookingData.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Fee</span>
                    <span>RM2.50</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-xl font-bold">
                    <span>Total Paid</span>
                    <span className="text-green-600 dark:text-green-400">
                      RM{bookingData.total + 2.5}
                    </span>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="text-center border-t pt-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Entry QR Code
                </h3>
                <div className="inline-block p-4 sm:p-6 bg-white border-2 border-gray-300 rounded-lg">
                  <div className="w-32 h-32 sm:w-48 sm:h-48 bg-gray-100 flex items-center justify-center text-gray-500 text-sm relative mx-auto">
                    {/* Mock QR Code Pattern */}
                    <div className="absolute inset-2 grid grid-cols-12 gap-px">
                      {Array.from({ length: 144 }).map((_, i) => (
                        <div
                          key={i}
                          className={`aspect-square ${
                            Math.random() > 0.5 ? "bg-black" : "bg-white"
                          }`}
                        />
                      ))}
                    </div>
                    {/* Corner squares for QR code authenticity */}
                    <div className="absolute top-2 left-2 w-6 h-6 sm:w-8 sm:h-8 bg-black"></div>
                    <div className="absolute top-2 right-2 w-6 h-6 sm:w-8 sm:h-8 bg-black"></div>
                    <div className="absolute bottom-2 left-2 w-6 h-6 sm:w-8 sm:h-8 bg-black"></div>
                    {/* Inner corner squares */}
                    <div className="absolute top-3 left-3 w-4 h-4 sm:w-6 sm:h-6 bg-white"></div>
                    <div className="absolute top-3 right-3 w-4 h-4 sm:w-6 sm:h-6 bg-white"></div>
                    <div className="absolute bottom-3 left-3 w-4 h-4 sm:w-6 sm:h-6 bg-white"></div>
                    {/* Center squares */}
                    <div className="absolute top-4 left-4 w-2 h-2 sm:w-4 sm:h-4 bg-black"></div>
                    <div className="absolute top-4 right-4 w-2 h-2 sm:w-4 sm:h-4 bg-black"></div>
                    <div className="absolute bottom-4 left-4 w-2 h-2 sm:w-4 sm:h-4 bg-black"></div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-3 px-4">
                  Present this QR code at the venue entrance
                </p>
              </div>

              {/* Important Notes */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">
                  Important Notes:
                </h4>
                <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-300">
                  <li>
                    • Please arrive at least 30 minutes before the event starts
                  </li>
                  <li>• Bring a valid ID for verification</li>
                  <li>• This QR code is your entry ticket - keep it safe</li>
                  <li>• No refunds available after booking confirmation</li>
                  <li>
                    • Contact support for any issues: support@university.edu
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/">Browse More Events</Link>
            </Button>
            <Button asChild className="w-full sm:w-auto">
              <Link href="/my-tickets">View My Tickets</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
