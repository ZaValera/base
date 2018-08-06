const path = require('path');
const router = require('express').Router();

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../front/react/dist/index.html'));
});

module.exports = router;