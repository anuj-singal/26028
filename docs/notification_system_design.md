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
```

#  Stage 3 — Query Optimization

##  Problem Statement

The following query is slow:

SELECT * FROM notifications
WHERE studentID = 1042 AND isRead = false
ORDER BY createdAt ASC;

---

##  Issues in the Query

1. No indexing → full collection scan
2. Sorting on large dataset is expensive
3. Fetching all columns using SELECT * is inefficient

---

##  Optimization Strategy

### 1. Create Composite Index

In MongoDB:

```js
{ studentId: 1, isRead: 1, createdAt: -1 }
```

# ✅ Stage 4 — Performance Improvement

## 🚨 Problem
Frequent database queries increase load and slow down system.

---

## ⚡ Solution: Caching using Redis

- Cache frequently accessed notifications
- Reduce database hits
- Improve response time

---

## 🔄 Cache Strategy

- Cache GET requests for 60 seconds
- Use request URL as cache key
- Invalidate cache after POST/PATCH

---

## 🚀 Additional Improvements

### 1. Pagination
Avoid loading large datasets

### 2. Read Replicas
Separate read and write operations

### 3. Background Jobs
Process heavy tasks asynchronously

### 4. Horizontal Scaling
Deploy multiple backend instances with load balancer

---

## 🎯 Result

- Faster API responses
- Reduced database load
- Scalable architecture