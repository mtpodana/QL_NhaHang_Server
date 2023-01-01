const express = require('express');
const router = express.Router();
const hoaDonController = require("../controllers/HoaDon");
const multer = require('multer');
const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null,"img/")
      },
});
const upload= multer({storage:storage})
router.get('/LastID',hoaDonController.lastID);
router.post("/Create",upload.single('Image'),hoaDonController.create)


router.get('/', hoaDonController.getHoaDon);
router.get('/PhuongThuc', hoaDonController.getPhuongThuc);

router.get('/MonAn', hoaDonController.getMonAn);
router.get('/DanhSachBan', hoaDonController.getDanhSachBan)
router.get('/:id', hoaDonController.getChiTietHoaDon);
// router.get('/ChiTiet/:id', hoaDonController.getChiTietPhieuNhap);
router.put('/:id', hoaDonController.updateHoaDon);
router.delete('/:id', hoaDonController.deleteHoaDon);
// router.get('/NguyenLieu', hoaDonController.getNguyenLieu);
// router.get('/DonViTinh', hoaDonController.getDonViTinh);


// router.post('/', hoaDonController.insertPhieuNhap);


module.exports= router;