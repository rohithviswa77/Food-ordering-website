import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ConfirmTable = () => {
  const [tableNumber, setTableNumber] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTable = localStorage.getItem("tableNumber");
    if (storedTable) {
      setTableNumber(storedTable);
    } else {
      navigate("/qr");
    }
  }, [navigate]);

  const confirmAndProceed = () => {
    navigate("/menu");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-xl font-bold">Confirm Your Table</h2>
        {tableNumber ? (
          <>
            <p className="text-lg font-semibold text-green-600 mt-2">
              You are seated at Table {tableNumber}
            </p>
            <button
              onClick={confirmAndProceed}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Proceed to Menu
            </button>
          </>
        ) : (
          <p className="text-red-500">No table selected. Scan QR again.</p>
        )}
      </div>
    </div>
  );
};

export default ConfirmTable;
