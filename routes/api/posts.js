const express = require('express')
const router = express.Router()

// @route  get api/users
// @desc   test route
// @access public

router.get('/', (req, res) => {
    res.end('post route')
})

module.exports = router;