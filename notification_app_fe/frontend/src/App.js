import { useEffect, useState } from "react";
import axios from "axios";
import NotificationList from "./components/NotificationList";
import PriorityList from "./components/PriorityList";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [priority, setPriority] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res1 = await axios.get("http://localhost:5000/api/notifications");
      const res2 = await axios.get("http://localhost:5000/api/notifications/priority?n=5");

      setNotifications(res1.data.data || []);
      setPriority(res2.data.data || []);
    } catch (err) {
      console.error("API error:", err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Notification System</h1>

      <PriorityList notifications={priority} />
      <NotificationList notifications={notifications} />
    </div>
  );
}

export default App;