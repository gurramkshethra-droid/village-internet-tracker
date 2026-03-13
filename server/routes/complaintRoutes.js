const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  addComplaint,
  getComplaints,
  updateStatus,
  deleteComplaint
} = require("../controllers/complaintController");

router.post("/add", protect, addComplaint);
router.get("/", protect, getComplaints);
router.put("/:id/status", protect, updateStatus);
router.delete("/:id", protect, deleteComplaint);

module.exports = router;