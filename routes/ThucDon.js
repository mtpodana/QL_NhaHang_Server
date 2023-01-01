const express = require('express');
const router = express.Router();
const thucDonController = require("../controllers/ThucDon");
const multer = require('multer');
const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null,"img/")
      },
      filename:(req, file, cb) => {
        cb(null, req.body.TenMon+"."+file.mimetype.split("/")[1])
      },
});
const upload= multer({storage:storage})
router.get('/',thucDonController.index);
router.get('/NguyenLieu',thucDonController.listNguyenLieu);
router.get('/PhanLoai',thucDonController.listPhanLoai);
router.get('/LastID',thucDonController.lastId);
router.post('/Create',upload.single('Image'),thucDonController.create);
router.post('/Update',upload.single('Image'),thucDonController.update);
router.get('/Detail/:id',thucDonController.detail);
router.get('/Search/:keyword',thucDonController.search);
router.get('/Cate/:IDCate',thucDonController.searchWithIDCate);
router.delete('/Delete/:id',thucDonController.destroy);
router.get('/OOS',thucDonController.outOfStock);

module.exports= router;