const express = require("express");
const router = express.Router();
const Notification = require("../models/notification.model");
const cache = require("../middlewares/cache");
const { client } = require("../config/redis");
const notificationQueue = require("../queue/notification.queue");


//  GET notifications (with caching)
router.get("/", cache, async (req, res) => {
  try {
    let { studentId, isRead, page = 1, limit = 10 } = req.query;

    if (studentId) studentId = Number(studentId);
    if (isRead !== undefined) isRead = isRead === "true";

    const query = {};
    if (studentId) query.studentId = studentId;
    if (isRead !== undefined) query.isRead = isRead;

    const notifications = await Notification.find(query)
      .select("studentId type message isRead createdAt")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Notification.countDocuments(query);

    res.status(200).json({
      success: true,
      data: notifications,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//stage 5
router.post("/bulk", async (req, res) => {
  try {
    const { students, message } = req.body;

    for (let studentId of students) {
      await notificationQueue.add("send_notification", {
        studentId,
        message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Notifications queued successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//  POST create notification
router.post("/", async (req, res) => {
  try {
    const { studentId, type, message } = req.body;

    const notification = await Notification.create({
      studentId,
      type,
      message,
    });

    //  Clear cache after write
    await client.flushAll();

    res.status(201).json({
      success: true,
      data: notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//  PATCH mark as read
router.patch("/:id/read", async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    notification.isRead = true;
    await notification.save();

    //  Clear cache
    await client.flushAll();

    res.status(200).json({
      success: true,
      message: "Marked as read",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//  PATCH mark all as read
router.patch("/read-all", async (req, res) => {
  try {
    await Notification.updateMany({}, { isRead: true });

    //  Clear cache
    await client.flushAll();

    res.status(200).json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;