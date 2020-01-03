const path = require('path');
const router = require('express').Router();

function getRouter(front) {
    return router.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, `../front/${front}/dist/index.html`));
    });
}

module.exports = getRouter;