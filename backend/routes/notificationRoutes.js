import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  unreadCount,
} from "../controllers/notificationController.js";
const router = express.Router();

// =========================================
// Get My Notifications
// =========================================
router.get(
  "/",
  protect,
  getNotifications
);

router.get(
  "/unread-count",
  protect,
  unreadCount
);

// =========================================
// Mark One Notification Read
// =========================================
router.put(
  "/read/:id",
  protect,
  markAsRead
);

// =========================================
// Mark All Notifications Read
// =========================================
router.put(
  "/read-all",
  protect,
  markAllAsRead
);



// =========================================
// Delete Notification
// =========================================
router.delete(
  "/:id",
  protect,
  deleteNotification
);

export default router;