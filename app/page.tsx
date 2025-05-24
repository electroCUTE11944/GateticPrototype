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
import { CalendarDays, MapPin, Users, Search, QrCode } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

// Dummy data
const events = [
  {
    id: "1",
    title: "Aloha Fes 2024",
    society: "Computer Science Society",
    date: "2024-03-15",
    time: "09:00",
    venue: "Main Auditorium",
    description:
      "Join us for the biggest tech conference of the year featuring industry leaders and innovative workshops.",
    price: 25,
    totalSeats: 500,
    availableSeats: 342,
    image: "/placeholder.svg?height=200&width=400",
    status: "active",
    category: "Technology",
  },
  {
    id: "2",
    title: "Choral Exchange 8",
    society: "Music Society",
    date: "2024-03-22",
    time: "18:00",
    venue: "University Grounds",
    description:
      "An evening of live music performances by student bands and special guest artists.",
    price: 15,
    totalSeats: 1000,
    availableSeats: 756,
    image: "/placeholder.svg?height=200&width=400",
    status: "active",
    category: "Music",
  },
  {
    id: "3",
    title: "Career Fair 2024",
    society: "Business Society",
    date: "2024-03-28",
    time: "10:00",
    venue: "Sports Complex",
    description:
      "Meet with top employers and explore career opportunities across various industries.",
    price: 0,
    totalSeats: 800,
    availableSeats: 623,
    image: "/placeholder.svg?height=200&width=400",
    status: "active",
    category: "Career",
  },
  {
    id: "4",
    title: "Art Exhibition Opening",
    society: "Art Society",
    date: "2024-04-05",
    time: "14:00",
    venue: "Gallery Hall",
    description:
      "Showcase of student artwork featuring paintings, sculptures, and digital art.",
    price: 10,
    totalSeats: 200,
    availableSeats: 89,
    image: "/placeholder.svg?height=200&width=400",
    status: "active",
    category: "Arts",
  },
];

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [userRole, setUserRole] = useState<"user" | "admin">("user");

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.society.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Student
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Discover and book tickets for upcoming Student
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant={userRole === "user" ? "default" : "outline"}
              onClick={() => setUserRole("user")}
            >
              <Users className="w-4 h-4 mr-2" />
              User View
            </Button>
            <Button
              variant={userRole === "admin" ? "default" : "outline"}
              onClick={() => setUserRole("admin")}
              asChild
            >
              <Link href="/admin">Admin/Society</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/qr-scanner">
                <QrCode className="w-4 h-4 mr-2" />
                QR Scanner
              </Link>
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search events, societies, or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-6 text-lg"
          />
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card
              key={event.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800"
            >
              <div className="relative">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-3 right-3 bg-white text-gray-900">
                  {event.category}
                </Badge>
              </div>

              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl font-bold line-clamp-2">
                    {event.title}
                  </CardTitle>
                  <Badge variant="secondary" className="ml-2">
                    {event.status}
                  </Badge>
                </div>
                <CardDescription className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                  {event.society}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                  {event.description}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <CalendarDays className="w-4 h-4 mr-2" />
                    {new Date(event.date).toLocaleDateString()} at {event.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.venue}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Users className="w-4 h-4 mr-2" />
                    {event.availableSeats} / {event.totalSeats} seats available
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {event.price === 0 ? "Free" : `$${event.price}`}
                  </div>
                  <Button asChild>
                    <Link href={`/event/${event.id}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              No events found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search terms or browse all available events.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
