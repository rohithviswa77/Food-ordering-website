import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import jsQR from "jsqr";
import { useNavigate } from "react-router-dom";

const QrScan = () => {
  const webcamRef = useRef(null);
  const [scannedTable, setScannedTable] = useState(null);
  const [showScanner, setShowScanner] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (webcamRef.current && showScanner) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          const img = new Image();
          img.src = imageSrc;
          img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0, img.width, img.height);
            const imageData = context.getImageData(0, 0, img.width, img.height);
            const qrCode = jsQR(imageData.data, img.width, img.height);
            if (qrCode) {
              setScannedTable(qrCode.data);
              setShowScanner(false); // Stop scanner after successful scan
            }
          };
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [showScanner]);

  const confirmTable = () => {
    localStorage.setItem("tableNumber", scannedTable);
    navigate("/menu");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Scan QR Code</h2>

      {/* Show scanner only if no table has been scanned */}
      {showScanner && <Webcam ref={webcamRef} screenshotFormat="image/png" width={300} />}

      {/* Show confirmation only after scanning */}
      {scannedTable && (
        <div className="mt-4 p-4 bg-white shadow-md rounded">
          <p className="text-lg font-semibold text-green-600">
            Table {scannedTable} Selected
          </p>
          <button
            onClick={confirmTable}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Confirm Table
          </button>
        </div>
      )}
    </div>
  );
};

export default QrScan;
