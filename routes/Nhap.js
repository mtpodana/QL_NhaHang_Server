const express = require('express');
const router = express.Router();
const nhapKhoController = require("../controllers/Nhap");


router.get('/', nhapKhoController.getPhieuNhap);
router.get('/ChiTiet/:id', nhapKhoController.getChiTietPhieuNhap);
router.put('/:id', nhapKhoController.updatePhieuNhap);
router.delete('/:id', nhapKhoController.deletePhieuNhap);
// router.get('/NguyenLieu', nhapKhoController.getNguyenLieu);
// router.get('/DonViTinh', nhapKhoController.getDonViTinh);


router.post('/', nhapKhoController.insertPhieuNhap);


module.exports= router;