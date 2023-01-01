const express = require('express');
const thucDonController = require("../controllers/ThucDon");
const router = require('express').Router();
router.get('/',thucDonController.index());
module.exports = router;