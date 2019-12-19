const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const { check, validationResult } = require('express-validator')

// @route  get api/profile me
// @desc   get current users profile
// @access public

router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar'])
        if (!profile) {
            return res.status(400).json({msg: 'There is no profile for this user'})
        }
        res.json(profile)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('server error')
        
    }
})

// @route  post api/profile
// @desc   create or update user profile
// @access private
router.post('/', [auth, [ 
    check('status', 'status is required')
        .not()
        .isEmpty(),
    check('skills', 'skilllls is required')

] ],  
async (req, res) => {
const errors = validationResult(req)
if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
}

const {
    company,
    website,
    location,
    status,
    skills,
    bio,
    githubusername,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram
} = req.body;

// build profile object
const profileFields = {};
profileFields = req.user.id;
if(company) profileFields.company = company;
if(website) profileFields.website = website;
if(location) profileFields.location = location;
if(bio) profileFields.bio = bio;
if(status) profileFields.status = status;
if(githubusername) profileFields.githubusername = githubusername;
if (skills) {
    profileFields.skills = skills.split(',').map(skill => skill.trim())
}
console.log(skills);
res.send('hello')
})

module.exports = router;