const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// @desc  Set goal
// @route  POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
    // Validate goal data
    if (!req.body.text) {
        res.status(400);
        throw new Error("Please add a text field");
    }

    const goal = await Goal.create({
        // User id will should be set in authentication middleware
        user: req.user.id,
        text: req.body.text
    });

    res.status(200).json(goal);
});

// @desc  Get goals
// @route  GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    // User id will should be set in authentication middleware
    const goals = await Goal.find({ user: req.user.id });

    res.status(200).json(goals);
});

// @desc  Update goal
// @route  PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    // Validate goal id
    if (!goal) {
        res.status(400);
        throw new Error("Goal not found");
    }

    // User id will should be set in authentication middleware
    const user = await User.findById(req.user.id);

    // Check for user
    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }
    
    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, 
        req.body, 
        {
            new: true
        });

    res.status(200).json(updatedGoal);
});

// @desc  Delete goal
// @route  DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    // Validate goal id
    if (!goal) {
        res.status(400);
        throw new Error("Goal not found");
    }

    // User id will should be set in authentication middleware
    const user = await User.findById(req.user.id);

    // Check for user
    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }
    
    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    await goal.deleteOne();

    res.status(200).json({ "id": req.params.id });
});

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
};