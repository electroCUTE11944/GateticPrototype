"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, MapPin, QrCode, Download } from "lucide-react";
import Link from "next/link";

// Dummy user tickets data
const userTickets = [
  {
    id: "1",
    eventId: "1",
    eventTitle: "Aloha Fes 2024",
    society: "Computer Science Society",
    date: "2024-03-15",
    time: "09:00",
    venue: "Main Auditorium",
    seats: ["A5", "A6"],
    total: 52.5,
    status: "confirmed",
    qrCode: "EVENT:1|SEATS:A5,A6|TOTAL:52.50|ID:1234567890",
    purchaseDate: "2024-02-20",
  },
  {
    id: "2",
    eventId: "2",
    eventTitle: "Choral Exchange 6",
    society: "Music Society",
    date: "2024-03-22",
    time: "18:00",
    venue: "University Grounds",
    seats: ["C12"],
    total: 17.5,
    status: "confirmed",
    qrCode: "EVENT:2|SEATS:C12|TOTAL:17.50|ID:1234567891",
    purchaseDate: "2024-02-25",
  },
  {
    id: "3",
    eventId: "4",
    eventTitle: "Art Exhibition Opening",
    society: "Art Society",
    date: "2024-01-15",
    time: "14:00",
    venue: "Gallery Hall",
    seats: ["B8"],
    total: 12.5,
    status: "attended",
    qrCode: "EVENT:4|SEATS:B8|TOTAL:12.50|ID:1234567892",
    purchaseDate: "2024-01-10",
  },
];

export default function MyTickets() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const upcomingTickets = userTickets.filter(
    (ticket) =>
      new Date(ticket.date) >= new Date() && ticket.status === "confirmed"
  );

  const pastTickets = userTickets.filter(
    (ticket) =>
      new Date(ticket.date) < new Date() || ticket.status === "attended"
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "attended":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const TicketCard = ({ ticket }: { ticket: any }) => (
    <Card className="bg-white dark:bg-gray-800 overflow-hidden">
      <CardContent className="p-0">
        {/* Ticket Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold mb-1">{ticket.eventTitle}</h3>
              <p className="text-blue-100">{ticket.society}</p>
            </div>
            <Badge className={getStatusColor(ticket.status)}>
              {ticket.status}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(ticket.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{ticket.venue}</span>
            </div>
          </div>
        </div>

        {/* Ticket Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Event Details */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Event Details</h4>
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <p>Time: {ticket.time}</p>
                  <p>Seats: {ticket.seats.join(", ")}</p>
                  <p>Total Paid: ${ticket.total}</p>
                  <p>
                    Purchase Date:{" "}
                    {new Date(ticket.purchaseDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/event/${ticket.eventId}`}>View Event</Link>
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>

            {/* QR Code */}
            <div className="text-center">
              <h4 className="font-semibold mb-3">Entry QR Code</h4>
              <div className="inline-block p-3 bg-white border-2 border-gray-200 rounded-lg">
                <div className="w-24 h-24 bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                  QR Code
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Show at entrance</p>
            </div>
          </div>
        </div>

        {/* Ticket Footer */}
        <div className="border-t bg-gray-50 dark:bg-gray-700 px-6 py-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 dark:text-gray-300">
              Ticket ID: {ticket.id}
            </span>
            <Button size="sm" variant="ghost">
              <QrCode className="w-4 h-4 mr-2" />
              Show QR
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              My Tickets
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              View and manage your event tickets
            </p>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">
              Upcoming Events ({upcomingTickets.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past Events ({pastTickets.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            {upcomingTickets.length === 0 ? (
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="text-center py-12">
                  <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                    No Upcoming Events
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    You don't have any tickets for upcoming events.
                  </p>
                  <Button asChild>
                    <Link href="/">Browse Events</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {upcomingTickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            {pastTickets.length === 0 ? (
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="text-center py-12">
                  <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                    No Past Events
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Your attended events will appear here.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {pastTickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
