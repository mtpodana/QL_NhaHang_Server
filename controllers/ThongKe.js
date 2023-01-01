var sql = require("mssql");

function getDoanhThu(req, res, next) {
    var request = new sql.Request();
    var sql_query =
      `SELECT MONTH(hd.NgayLap) as "Thang", SUM(ct.SoLuong*ct.GiaBan) AS "Tong"
      FROM HoaDon hd,CT_HoaDon ct
      where hd.IDHoaDon= ct.IDHoaDon
      GROUP BY MONTH(hd.NgayLap);`;
    request.query(sql_query, function (err, recordset) {
      if (err) res.send(err);
      const data = recordset.recordset
    
      res.send({ result: data  });
    });
    }
function getDoanhThuNgay(req, res, next) {
    var request = new sql.Request();
    var sql_query =
      `SELECT hd.NgayLap as "Thang", SUM(ct.SoLuong*ct.GiaBan) AS "Tong"
      FROM HoaDon hd,CT_HoaDon ct
      where hd.IDHoaDon= ct.IDHoaDon and hd.NgayLap = CONVERT (date, SYSDATETIME())
      Group By hd.NgayLap`;
    request.query(sql_query, function (err, recordset) {
      if (err) res.send(err);
      const data = recordset.recordset
    
      res.send({ result: data[0]  });
    });
    }
function getDoanhThuThang(req, res, next) {
    var request = new sql.Request();
    var sql_query =
      `SELECT hd.NgayLap as "Thang", SUM(ct.SoLuong*ct.GiaBan) AS "Tong"
      FROM HoaDon hd,CT_HoaDon ct
      where hd.IDHoaDon= ct.IDHoaDon and Month(hd.NgayLap )= Month(SYSDATETIME())
      Group By hd.NgayLap`;
    request.query(sql_query, function (err, recordset) {
      if (err) res.send(err);
      const data = recordset.recordset
    
      res.send({ result: data[0]  });
    });
    }
function getcountHD(req, res, next) {
    var request = new sql.Request();
    var sql_query =
      `Select COUNT(IDHoaDon) as tong from HoaDon`;
    request.query(sql_query, function (err, recordset) {
      if (err) res.send(err);
      const data = recordset.recordset
    
      res.send({ result: data[0]  });
    });
    }

module.exports = {
    getDoanhThu,
    getDoanhThuNgay,
    getDoanhThuThang,
    getcountHD
};