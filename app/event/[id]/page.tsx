"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Users, ArrowLeft, Share2 } from "lucide-react";
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
    description:
      "Join us for the biggest tech conference of the year featuring industry leaders and innovative workshops. This comprehensive event will cover the latest trends in artificial intelligence, machine learning, web development, and cybersecurity. Network with professionals, attend hands-on workshops, and gain insights from keynote speakers who are shaping the future of technology.",
    price: 25,
    totalSeats: 500,
    availableSeats: 342,
    image: "/placeholder.svg?height=400&width=800",
    status: "active",
    category: "Technology",
    organizer: {
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@university.edu",
      phone: "+1 (555) 123-4567",
    },
    agenda: [
      { time: "09:00 - 09:30", activity: "Registration & Welcome Coffee" },
      { time: "09:30 - 10:30", activity: "Keynote: Future of AI" },
      { time: "10:45 - 11:45", activity: "Workshop: Machine Learning Basics" },
      { time: "12:00 - 13:00", activity: "Lunch & Networking" },
      { time: "13:00 - 14:00", activity: "Panel: Industry Trends" },
      { time: "14:15 - 15:15", activity: "Workshop: Web Development" },
      { time: "15:30 - 16:30", activity: "Closing Ceremony" },
    ],
    requirements: [
      "Valid student ID",
      "Laptop for workshops (optional)",
      "Business attire recommended",
    ],
  },
};

export default function EventDetails() {
  const params = useParams();
  const eventId = params.id as string;
  const event = eventData[eventId as keyof typeof eventData];

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Event Not Found
          </h1>
          <Button asChild>
            <Link href="/">Back to Events</Link>
          </Button>
        </div>
      </div>
    );
  }

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
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {event.title}
            </h1>
            <p className="text-blue-600 dark:text-blue-400 font-medium text-lg">
              {event.society}
            </p>
          </div>
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Image */}
            <Card className="overflow-hidden bg-white dark:bg-gray-800">
              <img
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                className="w-full h-64 object-cover"
              />
            </Card>

            {/* Description */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle>About This Event</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {event.description}
                </p>
              </CardContent>
            </Card>

            {/* Agenda */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Event Agenda</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {event.agenda.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="text-sm font-medium text-blue-600 dark:text-blue-400 min-w-[120px]">
                        {item.time}
                      </div>
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        {item.activity}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {event.requirements.map((req, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {req}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="bg-white dark:bg-gray-800 sticky top-4">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl">
                    {event.price === 0 ? "Free" : `$${event.price}`}
                  </CardTitle>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    {event.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Event Details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CalendarDays className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="font-medium">
                        {new Date(event.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {event.time}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="font-medium">{event.venue}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        University Campus
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="font-medium">
                        {event.availableSeats} seats available
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        of {event.totalSeats} total seats
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Seats Sold</span>
                    <span>
                      {event.totalSeats - event.availableSeats}/
                      {event.totalSeats}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${
                          ((event.totalSeats - event.availableSeats) /
                            event.totalSeats) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Book Button */}
                <Button className="w-full" size="lg" asChild>
                  <Link href={`/event/${event.id}/book`}>
                    Select Seats & Book Now
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Organizer Info */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Event Organizer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="font-medium">{event.organizer.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Event Coordinator
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Email:{" "}
                      </span>
                      {event.organizer.email}
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Phone:{" "}
                      </span>
                      {event.organizer.phone}
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Contact Organizer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
