const express = require('express');
const router = express.Router();
var fetchuser=require('../middleware/fetchUser');
const User = require('../models/User');
const Role = require('../models/Role');
const { body, validationResult } = require('express-validator');

router.post('/assign-role', [
    body('userId', 'Invalid user ID').isMongoId(),
    body('roleName', 'Role name is required').not().isEmpty(),
    ],
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { userId, roleName } = req.body;

        let role = await Role.findOne({ roleName });
        if (!role) {
            role = new Role({ roleName });
            await role.save();
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.roles.push(role);
        await user.save();

        res.status(200).json({ message: 'Role assigned successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
