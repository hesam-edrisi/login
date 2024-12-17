
import { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = () => {
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      try {
        const response = await axios.get(
          "https://api.staging.kookaat.dev/YourUserEndpoint", 
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("User Data:", response.data);
        setUserData(response.data);
      } catch (err: any) {
        console.error("Error fetching user data:", err);
        setError(err.response?.data?.message || "Failed to fetch user data.");
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {userData ? (
        <div>
          <h2>User Profile</h2>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserProfile;
