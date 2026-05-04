# Stage 1 — API Design

## Core Features
- Fetch notifications
- Mark as read
- Create notification
- Real-time updates

---

## GET Notifications
GET /api/notifications?studentId=1042&page=1&limit=20

Response:
{
  "success": true,
  "data": []
}

---

## POST Notification
POST /api/notifications

{
  "studentId": 1042,
  "type": "Event",
  "message": "New event available"
}

---

## PATCH Mark as Read
PATCH /api/notifications/:id/read

---

## Real-Time System
Using WebSockets (Socket.io)

When notification created:
emit event to user