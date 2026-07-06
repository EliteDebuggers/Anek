import express from 'express';
import {
  createIssue,
  getIssues,
  getMyReports,
  getMyContributions,
  getNearbyIssues,
  getHeatmapData,
  getIssueById,
  updateIssue,
  deleteIssue,
  upvoteIssue,
  takeResponsibility,
  dropResponsibility,
  resolveIssue
} from '../controllers/issueController.js';
import { protect, optionalProtect } from '../middleware/authMiddleware.js';
import { multerUpload } from '../middleware/uploadMiddleware.js';
import { validateIssue, validateIssueUpdate } from '../validators/issueValidator.js';

const router = express.Router();

router.post('/', protect, multerUpload.array('evidence', 5), validateIssue, createIssue);
router.get('/', optionalProtect, getIssues);
router.get('/my-reports', protect, getMyReports);
router.get('/my-contributions', protect, getMyContributions);
router.get('/nearby', optionalProtect, getNearbyIssues);
router.get('/heatmap', optionalProtect, getHeatmapData);
router.get('/:id', optionalProtect, getIssueById);

router.patch('/:id', protect, multerUpload.array('evidence', 5), validateIssueUpdate, updateIssue);
router.delete('/:id', protect, deleteIssue);

router.post('/:id/upvote', protect, upvoteIssue);
router.post('/:id/take-responsibility', protect, takeResponsibility);
router.post('/:id/drop-responsibility', protect, dropResponsibility);
router.post('/:id/resolve', protect, resolveIssue);

export default router;
