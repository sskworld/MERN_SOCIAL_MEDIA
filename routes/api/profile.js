const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const Profile = require('../../models/profile');
const User = require('../../models/user');

router.get('/me', auth, async (req,res) => {
    try {
        let profile = await Profile.findOne({ user : req.user.id }).populate('user', ['name', 'avatar']);
        
        if(!profile) {
            return res.status(400).json({ msg : 'There is no profile for this User' })
        }

        res.json(profile)

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})

module.exports = router;