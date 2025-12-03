import express from 'express';
import { Task } from '../models/Task';

const router = express.Router();

// @route   GET /api/tasks
// @desc    Get all tasks for user
router.get('/', async (req, res) => {
  try {
    const { category, completed, priority, search, sort = '-createdAt' } = req.query;
    
    // Build query
    const query: any = { user: req.user._id };
    
    if (category && category !== 'All') {
      query.category = category;
    }
    
    if (completed !== undefined) {
      query.completed = completed === 'true';
    }
    
    if (priority && priority !== 'All') {
      query.priority = priority;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } },
      ];
    }
    
    // Execute query
    const tasks = await Task.find(query)
      .sort(sort as string)
      .lean();
    
    // Get stats
    const totalTasks = await Task.countDocuments({ user: req.user._id });
    const completedTasks = await Task.countDocuments({ 
      user: req.user._id, 
      completed: true 
    });
    const pendingTasks = totalTasks - completedTasks;
    
    res.json({
      success: true,
      count: tasks.length,
      stats: { totalTasks, completedTasks, pendingTasks },
      data: tasks,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// @route   POST /api/tasks
// @desc    Create a task
router.post('/', async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      user: req.user._id,
    });
    
    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// @route   PUT /api/tasks/:id
// @desc    Update a task
router.put('/:id', async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found',
      });
    }
    
    // Make sure user owns task
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized',
      });
    }
    
    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    
    res.json({
      success: true,
      data: task,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found',
      });
    }
    
    // Make sure user owns task
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized',
      });
    }
    
    await task.deleteOne();
    
    res.json({
      success: true,
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// @route   GET /api/tasks/stats
// @desc    Get task statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await Task.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 },
          completed: {
            $sum: { $cond: [{ $eq: ['$completed', true] }, 1, 0] },
          },
        },
      },
    ]);
    
    const categoryStats = await Task.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);
    
    res.json({
      success: true,
      data: {
        priorityStats: stats,
        categoryStats,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;