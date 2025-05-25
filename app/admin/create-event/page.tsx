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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function CreateEvent() {
  const [seatLayout, setSeatLayout] = useState({
    rows: 10,
    seatsPerRow: 20,
    vipRows: 2,
    regularPrice: 25,
    vipPrice: 50,
  });

  const [documents, setDocuments] = useState([
    { id: 1, name: "", required: false },
  ]);

  const addDocument = () => {
    setDocuments([...documents, { id: Date.now(), name: "", required: false }]);
  };

  const removeDocument = (id: number) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  const updateDocument = (id: number, field: string, value: any) => {
    setDocuments(
      documents.map((doc) => (doc.id === id ? { ...doc, [field]: value } : doc))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Create New Event
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Set up your event details, seating, and document requirements
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Event Details */}
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle>Event Information</CardTitle>
              <CardDescription>Basic details about your event</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input id="title" placeholder="Enter event title" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="society">Society/Organization</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select society" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cs">Computer Science Society</SelectItem>
                    <SelectItem value="music">Music Society</SelectItem>
                    <SelectItem value="business">Business Society</SelectItem>
                    <SelectItem value="art">Art Society</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your event"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" type="time" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="venue">Venue</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select venue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auditorium">Main Auditorium</SelectItem>
                    <SelectItem value="grounds">University Grounds</SelectItem>
                    <SelectItem value="sports">Sports Complex</SelectItem>
                    <SelectItem value="gallery">Gallery Hall</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="career">Career</SelectItem>
                    <SelectItem value="arts">Arts</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Seating Configuration */}
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle>Seating Layout</CardTitle>
              <CardDescription>
                Configure your venue seating arrangement
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rows">Number of Rows</Label>
                  <Input
                    id="rows"
                    type="number"
                    value={seatLayout.rows}
                    onChange={(e) =>
                      setSeatLayout({
                        ...seatLayout,
                        rows: Number.parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seatsPerRow">Seats per Row</Label>
                  <Input
                    id="seatsPerRow"
                    type="number"
                    value={seatLayout.seatsPerRow}
                    onChange={(e) =>
                      setSeatLayout({
                        ...seatLayout,
                        seatsPerRow: Number.parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vipRows">VIP Rows (from front)</Label>
                <Input
                  id="vipRows"
                  type="number"
                  value={seatLayout.vipRows}
                  onChange={(e) =>
                    setSeatLayout({
                      ...seatLayout,
                      vipRows: Number.parseInt(e.target.value),
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="regularPrice">Regular Seat Price (RM)</Label>
                  <Input
                    id="regularPrice"
                    type="number"
                    value={seatLayout.regularPrice}
                    onChange={(e) =>
                      setSeatLayout({
                        ...seatLayout,
                        regularPrice: Number.parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vipPrice">VIP Seat Price ($)</Label>
                  <Input
                    id="vipPrice"
                    type="number"
                    value={seatLayout.vipPrice}
                    onChange={(e) =>
                      setSeatLayout({
                        ...seatLayout,
                        vipPrice: Number.parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              {/* Seating Preview */}
              <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
                <h4 className="font-semibold mb-3">Seating Preview</h4>
                <div className="space-y-1">
                  <div className="text-center text-sm text-gray-600 dark:text-gray-300 mb-2">
                    STAGE
                  </div>
                  {Array.from({ length: seatLayout.rows }, (_, rowIndex) => (
                    <div key={rowIndex} className="flex justify-center gap-1">
                      {Array.from(
                        { length: seatLayout.seatsPerRow },
                        (_, seatIndex) => (
                          <div
                            key={seatIndex}
                            className={`w-3 h-3 rounded-sm ${
                              rowIndex < seatLayout.vipRows
                                ? "bg-yellow-400"
                                : "bg-blue-400"
                            }`}
                          />
                        )
                      )}
                    </div>
                  ))}
                  <div className="flex justify-center gap-4 mt-3 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-yellow-400 rounded-sm"></div>
                      <span>VIP (${seatLayout.vipPrice})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-blue-400 rounded-sm"></div>
                      <span>Regular (${seatLayout.regularPrice})</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document Requirements */}
          <Card className="bg-white dark:bg-gray-800 lg:col-span-2">
            <CardHeader>
              <CardTitle>Document Requirements</CardTitle>
              <CardDescription>
                Specify documents that attendees need to upload
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {documents.map((doc, index) => (
                <div
                  key={doc.id}
                  className="flex items-center gap-4 p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <Input
                      placeholder="Document name (e.g., Student ID, Medical Certificate)"
                      value={doc.name}
                      onChange={(e) =>
                        updateDocument(doc.id, "name", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={doc.required}
                      onChange={(e) =>
                        updateDocument(doc.id, "required", e.target.checked)
                      }
                      className="rounded"
                    />
                    <Label className="text-sm">Required</Label>
                  </div>
                  {documents.length > 1 && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeDocument(doc.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}

              <Button
                variant="outline"
                onClick={addDocument}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Document Requirement
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <Button variant="outline" asChild>
            <Link href="/admin">Cancel</Link>
          </Button>
          <Button>Create Event</Button>
        </div>
      </div>
    </div>
  );
}
