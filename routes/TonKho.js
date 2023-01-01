const express = require('express');
const router = express.Router();
const tonKhoController = require("../controllers/TonKho");


router.get('/NguyenLieu', tonKhoController.getNguyenLieu);
router.get('/DonViTinh', tonKhoController.getDonViTinh);


router.post('/NguyenLieu', tonKhoController.createNguyenLieu);
router.put('/NguyenLieu/Them', tonKhoController.themNguyenLieu);
router.put('/NguyenLieu/Xoa', tonKhoController.xoaNguyenLieu);
router.put('/NguyenLieu/Thay', tonKhoController.thayNguyenLieu);



module.exports= router;