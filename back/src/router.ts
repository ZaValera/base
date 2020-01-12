import path from 'path';
import express from  'express';

import {b} from 'src/index';

export const router = express.Router();

router.get('*', (req, res) => {
    console.log(path.join(__dirname, '../../front/build/index.html'));
    res.sendFile(path.join(__dirname, '../../front/build/index.html'));
});
