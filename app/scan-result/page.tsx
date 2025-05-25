"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Scan,
  Calendar,
  Clock,
  MapPin,
  User,
  CreditCard,
  Ticket,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// Dummy scanned ticket data (same as in scanner page)
const ticketData = {
  "EVENT:1|SEATS:A5,A6|TOTAL:52.50|ID:1234567890": {
    eventId: "1",
    eventTitle: "Aloha Fes 2024",
    society: "Computer Science Society",
    date: "2024-03-15",
    time: "09:00",
    venue: "Main Auditorium",
    seats: ["A5", "A6"],
    total: 52.5,
    holderName: "Simon Chock",
    studentId: "20AM05528",
    status: "valid",
    checkInTime: null,
    ticketId: "1234567890",
  },
};

export default function ScanResult() {
  const searchParams = useSearchParams();
  const scannedData = searchParams.get("data");
  const [ticketInfo, setTicketInfo] = useState<any>(null);
  const [scanResult, setScanResult] = useState<"success" | "error" | null>(
    null
  );

  useEffect(() => {
    if (scannedData) {
      // Check if ticket exists
      const ticket = ticketData[scannedData as keyof typeof ticketData];
      if (ticket) {
        setTicketInfo(ticket);
        setScanResult("success");
      } else {
        setScanResult("error");
      }
    }
  }, [scannedData]);

  const handleCheckIn = () => {
    if (ticketInfo) {
      setTicketInfo({
        ...ticketInfo,
        checkInTime: new Date().toLocaleTimeString(),
        status: "checked-in",
      });
    }
  };

  if (!scannedData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="icon" asChild>
              <Link href="/qr-scanner">
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Scan Result
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                No scan data found
              </p>
            </div>
          </div>
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-600 dark:text-gray-300">
                No scan data provided. Please go back and scan a ticket.
              </p>
              <Button asChild className="mt-4">
                <Link href="/qr-scanner">Back to Scanner</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" asChild>
            <Link href="/qr-scanner">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Ticket Validation
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Scanned ticket details
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Scan Result */}
          {scanResult && (
            <>
              {scanResult === "success" ? (
                <div className="space-y-6">
                  {/* Validation Status */}
                  <Card className="border-green-500 bg-green-50 dark:bg-green-900/20">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-8 h-8 text-green-500" />
                        <div>
                          <h3 className="text-xl font-bold text-green-800 dark:text-green-300">
                            ✓ Valid Ticket
                          </h3>
                          <p className="text-green-600 dark:text-green-400">
                            Ticket verified successfully
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Ticket Design */}
                  {ticketInfo && (
                    <div className="relative">
                      {/* Main Ticket */}
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl p-8 text-white relative overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute top-4 right-4 w-32 h-32 border-2 border-white rounded-full"></div>
                          <div className="absolute bottom-4 left-4 w-24 h-24 border-2 border-white rounded-full"></div>
                        </div>

                        {/* Ticket Header */}
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                              <Ticket className="w-8 h-8" />
                              <div>
                                <h2 className="text-2xl font-bold">
                                  {ticketInfo.eventTitle}
                                </h2>
                                <p className="text-blue-100">
                                  {ticketInfo.society}
                                </p>
                              </div>
                            </div>
                            <Badge
                              className={`px-4 py-2 text-lg font-semibold ${
                                ticketInfo.status === "checked-in"
                                  ? "bg-blue-500 text-white"
                                  : "bg-green-500 text-white"
                              }`}
                            >
                              {ticketInfo.status === "checked-in"
                                ? "CHECKED IN"
                                : "VALID"}
                            </Badge>
                          </div>

                          {/* Event Details Grid */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="flex items-center gap-3">
                              <Calendar className="w-5 h-5 text-blue-200" />
                              <div>
                                <p className="text-blue-200 text-sm">Date</p>
                                <p className="font-semibold">
                                  {new Date(
                                    ticketInfo.date
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <Clock className="w-5 h-5 text-blue-200" />
                              <div>
                                <p className="text-blue-200 text-sm">Time</p>
                                <p className="font-semibold">
                                  {ticketInfo.time}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <MapPin className="w-5 h-5 text-blue-200" />
                              <div>
                                <p className="text-blue-200 text-sm">Venue</p>
                                <p className="font-semibold">
                                  {ticketInfo.venue}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <Ticket className="w-5 h-5 text-blue-200" />
                              <div>
                                <p className="text-blue-200 text-sm">Seats</p>
                                <p className="font-semibold">
                                  {ticketInfo.seats.join(", ")}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Perforated Edge - Fixed spacing */}
                      <div className="relative h-0">
                        <div className="absolute inset-x-0 top-0 flex justify-between items-center px-4 -translate-y-1/2">
                          {Array.from({ length: 25 }).map((_, i) => (
                            <div
                              key={i}
                              className="w-3 h-3 bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 rounded-full border border-gray-200 dark:border-gray-600"
                            />
                          ))}
                        </div>
                      </div>

                      {/* Ticket Stub */}
                      <div className="bg-white dark:bg-gray-800 rounded-b-2xl p-8 border-l-4 border-r-4 border-b-4 border-gray-200 dark:border-gray-700">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {/* Attendee Information */}
                          <div>
                            <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                              <User className="w-5 h-5 text-blue-600" />
                              Attendee Information
                            </h4>
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-300">
                                  Name:
                                </span>
                                <span className="font-semibold">
                                  {ticketInfo.holderName}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-300">
                                  Student ID:
                                </span>
                                <span className="font-semibold">
                                  {ticketInfo.studentId}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-300">
                                  Ticket ID:
                                </span>
                                <span className="font-mono text-sm">
                                  {ticketInfo.ticketId}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Payment & Status */}
                          <div>
                            <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                              <CreditCard className="w-5 h-5 text-green-600" />
                              Payment & Status
                            </h4>
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-300">
                                  Amount Paid:
                                </span>
                                <span className="font-semibold text-green-600">
                                  RM{ticketInfo.total}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-300">
                                  Status:
                                </span>
                                <Badge
                                  className={
                                    ticketInfo.status === "checked-in"
                                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                      : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                  }
                                >
                                  {ticketInfo.status === "checked-in"
                                    ? "Checked In"
                                    : "Valid"}
                                </Badge>
                              </div>
                              {ticketInfo.checkInTime && (
                                <div className="flex justify-between">
                                  <span className="text-gray-600 dark:text-gray-300">
                                    Check-in Time:
                                  </span>
                                  <span className="font-semibold">
                                    {ticketInfo.checkInTime}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* QR Code Data */}
                        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                          <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
                            Scanned QR Code:
                          </h4>
                          <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md font-mono text-xs break-all">
                            {scannedData}
                          </div>
                        </div>

                        {/* Check-in Button */}
                        {ticketInfo.status !== "checked-in" && (
                          <Button
                            onClick={handleCheckIn}
                            className="w-full mt-6"
                            size="lg"
                          >
                            <CheckCircle className="w-5 h-5 mr-2" />
                            Check In Attendee
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Invalid Ticket Design */
                <Card className="border-red-500 bg-red-50 dark:bg-red-900/20">
                  <CardContent className="p-8">
                    <div className="text-center">
                      <div className="relative mb-6">
                        <div className="w-32 h-32 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                          <XCircle className="w-16 h-16 text-red-500" />
                        </div>
                        <div className="absolute inset-0 border-4 border-red-500 rounded-full animate-pulse"></div>
                      </div>

                      <h3 className="text-2xl font-bold text-red-800 dark:text-red-300 mb-4">
                        Invalid Ticket
                      </h3>
                      <p className="text-red-600 dark:text-red-400 mb-6 text-lg">
                        The scanned QR code is not valid or the ticket has
                        expired
                      </p>

                      <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg mb-6">
                        <p className="text-red-800 dark:text-red-300 font-semibold mb-2">
                          Scanned Data:
                        </p>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded font-mono text-sm break-all">
                          {scannedData}
                        </div>
                      </div>

                      <div className="space-y-2 text-sm text-red-700 dark:text-red-300">
                        <p className="font-semibold">Possible reasons:</p>
                        <ul className="list-disc list-inside space-y-1 text-left max-w-md mx-auto">
                          <li>QR code is damaged or corrupted</li>
                          <li>Ticket has already been used</li>
                          <li>Ticket is for a different event</li>
                          <li>Ticket has been cancelled or refunded</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button asChild variant="outline" className="flex-1">
              <Link href="/qr-scanner">
                <Scan className="w-4 h-4 mr-2" />
                Scan Another Ticket
              </Link>
            </Button>
            <Button asChild className="flex-1">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
