const express = require("express");
const router = express.Router();

// Dummy data
let notifications = [
  {
    id: "n1",
    studentId: 1042,
    type: "Event",
    message: "Hackathon coming!",
    isRead: false,
    createdAt: new Date(),
  },
];

//  GET notifications
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: notifications,
  });
});

//  POST create notification
router.post("/", (req, res) => {
  const { studentId, type, message } = req.body;

  const newNotification = {
    id: `n${notifications.length + 1}`,
    studentId,
    type,
    message,
    isRead: false,
    createdAt: new Date(),
  };

  notifications.push(newNotification);

  res.status(201).json({
    success: true,
    message: "Notification created",
    data: newNotification,
  });
});

//  PATCH mark as read
router.patch("/:id/read", (req, res) => {
  const { id } = req.params;

  const notification = notifications.find((n) => n.id === id);

  if (!notification) {
    return res.status(404).json({
      success: false,
      message: "Notification not found",
    });
  }

  notification.isRead = true;

  res.status(200).json({
    success: true,
    message: "Marked as read",
  });
});

//  PATCH mark all as read
router.patch("/read-all", (req, res) => {
  notifications = notifications.map((n) => ({
    ...n,
    isRead: true,
  }));

  res.status(200).json({
    success: true,
    message: "All notifications marked as read",
  });
});

module.exports = router;