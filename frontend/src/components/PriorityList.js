function PriorityList({ notifications }) {
  return (
    <div>
      <h2>Priority Notifications</h2>

      {notifications.length === 0 && <p>No priority notifications</p>}

      {notifications.map((n) => (
        <div key={n._id || n.id} style={{ border: "2px solid red", margin: 10, padding: 10 }}>
          <p><b>{n.type}</b></p>
          <p>{n.message}</p>
        </div>
      ))}
    </div>
  );
}

export default PriorityList;