const express = require('express');
const router = express.Router();
const datBanController = require("../controllers/DatBan");

router.get('/', datBanController.getPhieuDatBan);
router.put('/:id', datBanController.updatePhieuDatBan);

router.post('/', datBanController.createPhieuDatBan);
router.delete('/:id', datBanController.deletePhieuDatBan);

module.exports= router;