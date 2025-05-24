"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Camera, Scan } from "lucide-react";
import Link from "next/link";

export default function QRScanner() {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<string>("");

  const handleScan = () => {
    setIsScanning(true);

    // Simulate scanning delay
    setTimeout(() => {
      // Simulate scanning a valid QR code
      const mockQRData = "EVENT:1|SEATS:A5,A6|TOTAL:52.50|ID:1234567890";

      setIsScanning(false);

      // Redirect to results page with scanned data
      router.push(`/scan-result?data=${encodeURIComponent(mockQRData)}`);
    }, 2000);
  };

  const handleManualValidation = () => {
    if (scannedData.trim()) {
      // Redirect to results page with manually entered data
      router.push(`/scan-result?data=${encodeURIComponent(scannedData)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
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
              QR Code Scanner
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Scan entry tickets for event validation
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Scanner Interface */}
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Ticket Scanner
              </CardTitle>
              <CardDescription>
                Point the camera at the QR code on the ticket
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Camera View Simulation */}
              <div className="relative">
                <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
                  {isScanning ? (
                    <div className="text-center">
                      <Scan className="w-16 h-16 mx-auto text-blue-500 animate-pulse mb-4" />
                      <p className="text-gray-600 dark:text-gray-300">
                        Scanning...
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Camera className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">
                        Camera view
                      </p>
                      <p className="text-sm text-gray-400 dark:text-gray-500">
                        Position QR code within the frame
                      </p>
                    </div>
                  )}
                </div>

                {/* Scanning overlay */}
                {isScanning && (
                  <div className="absolute inset-0 border-4 border-blue-500 rounded-lg animate-pulse"></div>
                )}
              </div>

              {/* Scan Button */}
              <Button
                onClick={handleScan}
                disabled={isScanning}
                className="w-full"
                size="lg"
              >
                {isScanning ? "Scanning..." : "Start Scan"}
              </Button>

              {/* Manual Input */}
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Or enter QR code manually:
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter QR code data"
                    value={scannedData}
                    onChange={(e) => setScannedData(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleManualValidation();
                      }
                    }}
                  />
                  <Button onClick={handleManualValidation} variant="outline">
                    Validate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle>Scanning Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">1.</span>
                  Position the QR code within the camera frame
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">2.</span>
                  Ensure good lighting for clear scanning
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">3.</span>
                  Hold steady until the scan completes
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">4.</span>
                  Verify attendee details before check-in
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">5.</span>
                  Contact support for any scanning issues
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
