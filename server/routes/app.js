const express = require('express');
const controler = require('../controlers/app')

const router = express.Router();

router.get('/test', controler.test)
router.post('/add',controler.add)
router.get('/get',controler.get)
router.get('/getOne',controler.getOne)
router.post('/get',controler.postGet)
router.get('/categories',controler.categories)
router.post('/categories',controler.POSTcategories)
router.post('/translate',controler.POSTtranslate)
router.post('/edit',controler.edit)
router.delete('/:id',controler.deleteword)

module.exports = router;