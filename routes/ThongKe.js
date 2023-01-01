const express = require('express');
const router = express.Router();
const hoaDonController = require("../controllers/ThongKe");


router.get('/', hoaDonController.getDoanhThu);
router.get('/Ngay', hoaDonController.getDoanhThuNgay);
router.get('/Thang', hoaDonController.getDoanhThuThang);
router.get('/Dem', hoaDonController.getcountHD);



module.exports= router;