import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const [user, setUser] = useState(null);
  const [tableNumber, setTableNumber] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        navigate("/"); // Redirect to login if not authenticated
      } else {
        setUser(currentUser);
      }
    });

    // Retrieve table number from localStorage
    const storedTableNumber = localStorage.getItem("tableNumber");
    if (storedTableNumber) {
      setTableNumber(storedTableNumber);
    } else {
      navigate("/qr"); // Redirect to QR scan if no table number found
    }

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.displayName}!</h1>
      {tableNumber ? (
        <p className="text-lg font-semibold text-green-600">
          Ordering for **Table {tableNumber}**
        </p>
      ) : (
        <p className="text-red-500">No table selected. Please scan the QR code.</p>
      )}
      <p className="mt-4">Here is the menu...</p>
    </div>
  );
};

export default Menu;
