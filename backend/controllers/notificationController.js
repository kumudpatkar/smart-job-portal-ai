import Notification from "../models/Notification.js";
import { getIO } from "../socket/socket.js";
/*
==================================================
Create Notification
==================================================
*/

export const createNotification = async (
  userId,
  title,
  message,
  type = "info",
  link = "",
  icon = "Bell"
) => {
  try {
    const notification = await Notification.create({
      user: userId,
      title,
      message,
      type,
      link,
      icon,
    });

    // Send notification instantly using Socket.IO
    try {
      const io = getIO();

      io.to(userId.toString()).emit(
        "new_notification",
        notification
      );
    } catch (err) {
      console.log("Socket not initialized");
    }

    return notification;
  } catch (error) {
    console.log(error);
    return null;
  }
};
/*
==================================================
Get User Notifications
GET /api/notifications
==================================================
*/

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user.id,
    })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notifications.length,
      notifications,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
==================================================
Mark One Notification as Read
PUT /api/notifications/:id/read
==================================================
*/

export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    notification.isRead = true;

    await notification.save();

    res.status(200).json({
      success: true,
      notification,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
==================================================
Mark All Notifications as Read
PUT /api/notifications/read-all
==================================================
*/

export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      {
        user: req.user.id,
        isRead: false,
      },
      {
        isRead: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "All notifications marked as read.",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
==================================================
Delete Notification
DELETE /api/notifications/:id
==================================================
*/

export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully.",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
==================================================
Unread Notification Count
GET /api/notifications/unread-count
==================================================
*/

export const unreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      user: req.user.id,
      isRead: false,
    });

    res.status(200).json({
      success: true,
      unread: count,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};