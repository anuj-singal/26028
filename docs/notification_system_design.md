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



#  Stage 2 — Database Design

## Database Choice

We use **MongoDB (NoSQL database)** for this system.

###  Why MongoDB?
- Handles large volumes of notifications efficiently
- Flexible schema for different notification types
- High write scalability (important for real-time systems)
- Easy horizontal scaling using sharding

---

##  Notification Schema

Each notification document will have the following structure:

```json
{
  "_id": "ObjectId",
  "studentId": 1042,
  "type": "Event | Placement | Result",
  "message": "Notification message",
  "isRead": false,
  "createdAt": "2026-05-04T10:00:00Z"
}