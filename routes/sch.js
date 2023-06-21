const express = require('express');
const router  = express.Router();
const schController = require('../controllers/sch');

//routers
router.get('/sch', schController.getAllSch);
router.post('/sch', schController.uploadImg, schController.newSch);
router.delete('/sch', schController.deleteAllSch);

router.get('/Sch/:id', schController.getOneSch);
router.delete('/Sch/:id', schController.deleteOneSch);
router.put('/Sch/:id',schController.updateOneSch);

module.exports = router;