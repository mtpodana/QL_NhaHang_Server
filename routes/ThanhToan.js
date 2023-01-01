const express = require('express');
const router = express.Router();
const thanhToanController = require("../controllers/ThanhToan");
const multer = require('multer');
const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null,"img/")
      },
});
const upload= multer({storage:storage})
router.get('/Ban',thanhToanController.listBan);
router.get('/Order',thanhToanController.listOrder);
router.post("/Save",upload.single('Image'),thanhToanController.saveOrder)
router.get("/Delete/:id",thanhToanController.deleteOrder)
router.get("/Customer/:id",thanhToanController.findCustomer)
router.post("/AddTable",thanhToanController.addTable)
module.exports= router;