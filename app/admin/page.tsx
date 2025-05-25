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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Edit,
  Eye,
  Upload,
  FileText,
  Calendar,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Download,
} from "lucide-react";

import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

// Dummy data for admin view
const adminEvents = [
  {
    id: "1",
    title: "Aloha Fes 2024",
    society: "Computer Science Society",
    date: "2024-03-15",
    time: "09:00",
    venue: "Main Auditorium",
    status: "active",
    attendees: 158,
    revenue: 3950,
    image: "/images/alohafes2024.jpeg",
    documents: [
      {
        id: "1",
        name: "Event Proposal.pdf",
        status: "approved",
        uploadDate: "2024-02-15",
      },
      {
        id: "2",
        name: "Budget Plan.xlsx",
        status: "pending",
        uploadDate: "2024-02-20",
      },
    ],
  },
  {
    id: "2",
    title: "Choral Exchange 6",
    society: "Music Society",
    date: "2024-03-22",
    time: "18:00",
    venue: "University Grounds",
    status: "active",
    attendees: 244,
    revenue: 3660,
    image: "/images/ce6.jpg",
    documents: [
      {
        id: "3",
        name: "Sound Equipment List.pdf",
        status: "approved",
        uploadDate: "2024-02-18",
      },
      {
        id: "4",
        name: "Artist Contracts.pdf",
        status: "approved",
        uploadDate: "2024-02-25",
      },
    ],
  },
];

const documents = [
  {
    id: "1",
    name: "Event Proposal.pdf",
    event: "Aloha Fes 2024",
    status: "approved",
    uploadDate: "2024-02-15",
  },
  {
    id: "2",
    name: "Budget Plan.xlsx",
    event: "Aloha Fes 2024",
    status: "pending",
    uploadDate: "2024-02-20",
  },
  {
    id: "3",
    name: "Sound Equipment List.pdf",
    event: "Choral Exchange 6",
    status: "approved",
    uploadDate: "2024-02-18",
  },
  {
    id: "4",
    name: "Artist Contracts.pdf",
    event: "Choral Exchange 6",
    status: "approved",
    uploadDate: "2024-02-25",
  },
  {
    id: "5",
    name: "Venue Booking.pdf",
    event: "Career Fair 2024",
    status: "rejected",
    uploadDate: "2024-02-10",
  },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("events");
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadEventId, setUploadEventId] = useState("");
  const [uploadDocumentType, setUploadDocumentType] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [processingDocId, setProcessingDocId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDocumentAction = async (
    docId: string,
    action: "approved" | "rejected"
  ) => {
    setProcessingDocId(docId);

    // Simulate API call delay
    setTimeout(() => {
      // Find and update the document status
      const docIndex = documents.findIndex((doc) => doc.id === docId);
      if (docIndex !== -1) {
        documents[docIndex].status = action;
      }

      // Also update in adminEvents if the document exists there
      adminEvents.forEach((event) => {
        const eventDocIndex = event.documents.findIndex(
          (doc) => doc.id === docId
        );
        if (eventDocIndex !== -1) {
          event.documents[eventDocIndex].status = action;
        }
      });

      toast({
        title: `Document ${action}`,
        description: `The document has been ${action} successfully.`,
        variant: action === "approved" ? "default" : "destructive",
      });

      setProcessingDocId(null);
    }, 1000);
  };

  const handleFileUpload = async () => {
    if (!uploadFile || !uploadEventId || !uploadDocumentType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and select a file.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    // Simulate upload delay
    setTimeout(() => {
      // In a real app, you would upload to your backend here
      const newDocument = {
        id: Date.now().toString(),
        name: uploadFile.name,
        event:
          adminEvents.find((e) => e.id === uploadEventId)?.title ||
          "Unknown Event",
        status: "pending",
        uploadDate: new Date().toISOString().split("T")[0],
      };

      // Add to documents array (in real app, this would update your state management)
      documents.push(newDocument);

      toast({
        title: "Upload Successful",
        description: `${uploadFile.name} has been uploaded successfully.`,
      });

      // Reset form
      setUploadFile(null);
      setUploadEventId("");
      setUploadDocumentType("");
      setShowUploadDialog(false);
      setIsUploading(false);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                DSA
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Manage events and documents
              </p>
            </div>
          </div>
          <Button asChild>
            <Link href="/admin/create-event">
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Link>
          </Button>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Documents
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-6">
            <div className="grid gap-6">
              {adminEvents.map((event) => (
                <Card key={event.id} className="bg-white dark:bg-gray-800">
                  <div className="relative">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{event.title}</CardTitle>
                        <CardDescription className="text-blue-600 dark:text-blue-400 font-medium">
                          {event.society}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {event.attendees}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          Attendees
                        </div>
                      </div>
                      <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          RM{event.revenue}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          Revenue
                        </div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          {event.date}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          Date
                        </div>
                      </div>
                      <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                          {event.venue}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          Venue
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">
                        Documents ({event.documents.length})
                      </h4>
                      <div className="space-y-2">
                        {event.documents.map((doc) => (
                          <div
                            key={doc.id}
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded"
                          >
                            <span className="text-sm font-medium">
                              {doc.name}
                            </span>

                            {/* Action Buttons for Documents */}
                            <div className="flex items-center gap-2">
                              {/* View/Download Button */}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  // In a real app, this would open/download the document
                                  toast({
                                    title: "Document Opened",
                                    description: `Opening ${doc.name}...`,
                                  });
                                }}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                View
                              </Button>

                              {/* Approve/Reject buttons - only show for pending documents */}
                              {doc.status === "pending" && (
                                <>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                      handleDocumentAction(doc.id, "approved")
                                    }
                                    disabled={processingDocId === doc.id}
                                    className="text-green-600 border-green-600 hover:bg-green-50 dark:text-green-400 dark:border-green-400 dark:hover:bg-green-900/20"
                                  >
                                    {processingDocId === doc.id ? (
                                      <div className="w-3 h-3 border-2 border-green-600 border-t-transparent rounded-full animate-spin mr-1" />
                                    ) : (
                                      <CheckCircle className="w-3 h-3 mr-1" />
                                    )}
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                      handleDocumentAction(doc.id, "rejected")
                                    }
                                    disabled={processingDocId === doc.id}
                                    className="text-red-600 border-red-600 hover:bg-red-50 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900/20"
                                  >
                                    {processingDocId === doc.id ? (
                                      <div className="w-3 h-3 border-2 border-red-600 border-t-transparent rounded-full animate-spin mr-1" />
                                    ) : (
                                      <XCircle className="w-3 h-3 mr-1" />
                                    )}
                                    Reject
                                  </Button>
                                </>
                              )}

                              {/* Status indicator for approved/rejected documents */}
                              {doc.status === "approved" && (
                                <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm">
                                  <CheckCircle className="w-4 h-4" />
                                  <span>Approved</span>
                                </div>
                              )}

                              {doc.status === "rejected" && (
                                <div className="flex items-center gap-1 text-red-600 dark:text-red-400 text-sm">
                                  <XCircle className="w-4 h-4" />
                                  <span>Rejected</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Event
                      </Button>
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Document
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Document Management</h2>
              <Button onClick={() => setShowUploadDialog(true)}>
                <Upload className="w-4 h-4 mr-2" />
                Upload New Document
              </Button>
            </div>

            <div className="grid gap-4">
              {documents.map((doc) => (
                <Card key={doc.id} className="bg-white dark:bg-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded">
                          <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{doc.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {doc.event} • Uploaded {doc.uploadDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>

                          {/* Approve/Reject buttons - only show for pending documents */}
                          {doc.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handleDocumentAction(doc.id, "approved")
                                }
                                disabled={processingDocId === doc.id}
                                className="text-green-600 border-green-600 hover:bg-green-50 dark:text-green-400 dark:border-green-400 dark:hover:bg-green-900/20"
                              >
                                {processingDocId === doc.id ? (
                                  <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin mr-2" />
                                ) : (
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                )}
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handleDocumentAction(doc.id, "rejected")
                                }
                                disabled={processingDocId === doc.id}
                                className="text-red-600 border-red-600 hover:bg-red-50 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900/20"
                              >
                                {processingDocId === doc.id ? (
                                  <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin mr-2" />
                                ) : (
                                  <XCircle className="w-4 h-4 mr-2" />
                                )}
                                Reject
                              </Button>
                            </>
                          )}

                          {/* Status indicator for approved/rejected documents */}
                          {doc.status === "approved" && (
                            <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm">
                              <CheckCircle className="w-4 h-4" />
                              <span>Approved</span>
                            </div>
                          )}

                          {doc.status === "rejected" && (
                            <div className="flex items-center gap-1 text-red-600 dark:text-red-400 text-sm">
                              <XCircle className="w-4 h-4" />
                              <span>Rejected</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      {/* Upload Document Dialog */}
      {showUploadDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Upload New Document</h3>

            <div className="space-y-4">
              {/* Event Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Select Event
                </label>
                <select
                  value={uploadEventId}
                  onChange={(e) => setUploadEventId(e.target.value)}
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="">Choose an event...</option>
                  {adminEvents.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Document Type */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Document Type
                </label>
                <select
                  value={uploadDocumentType}
                  onChange={(e) => setUploadDocumentType(e.target.value)}
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="">Choose document type...</option>
                  <option value="proposal">Event Proposal</option>
                  <option value="budget">Budget Plan</option>
                  <option value="contract">Contract</option>
                  <option value="permit">Permit/License</option>
                  <option value="insurance">Insurance</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Select File
                </label>
                <input
                  type="file"
                  onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Supported formats: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (Max
                  10MB)
                </p>
              </div>

              {/* File Preview */}
              {uploadFile && (
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">
                      {uploadFile.name}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Size: {(uploadFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              )}
            </div>

            {/* Dialog Actions */}
            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowUploadDialog(false);
                  setUploadFile(null);
                  setUploadEventId("");
                  setUploadDocumentType("");
                }}
                disabled={isUploading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleFileUpload}
                disabled={
                  isUploading ||
                  !uploadFile ||
                  !uploadEventId ||
                  !uploadDocumentType
                }
                className="flex-1"
              >
                {isUploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
