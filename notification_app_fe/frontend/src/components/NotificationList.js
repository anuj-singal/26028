import { useState } from "react";

function NotificationList({ notifications }) {
  const [filter, setFilter] = useState("All");

  const filtered = notifications.filter((n) =>
    filter === "All" ? true : n.type === filter
  );

  return (
    <div>
      <h2>All Notifications</h2>

      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="All">All</option>
        <option value="Placement">Placement</option>
        <option value="Result">Result</option>
        <option value="Event">Event</option>
      </select>

      {filtered.length === 0 && <p>No notifications</p>}

      {filtered.map((n) => (
        <div key={n._id || n.id} style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
          <p><b>Type:</b> {n.type}</p>
          <p><b>Message:</b> {n.message}</p>
          <p><b>Read:</b> {n.isRead ? "Yes" : "No"}</p>
        </div>
      ))}
    </div>
  );
}

export default NotificationList;