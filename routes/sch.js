const express = require('express');
const router  = express.Router();
const schController = require('../controllers/sch');


router.get('/sch', schController.getAllSch);
router.post('/sch', schController.uploadImg, schController.newSch);
router.delete('/sch', schController.deleteAllSch);

router.get('/Sch/:name', schController.getOneSch);
router.delete('/Sch/:name', schController.deleteOneSch);

module.exports = router;