import path from 'path';
import express from  'express';

export const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../front/build/index.html'));
});
