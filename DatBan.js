var sql = require('mssql');

function getPhieuDatBan(req, res, next){
    console.log(req.query)

    var request = new sql.Request();
    var sql_query =
      "select * from PhieuDatBan";

      if(req.query.ten)
        sql_query+= ` where  TenKhachHang LIKE '%${req.query.ten}%'`
      if(req.query.date){
          const d = new Date(req.query.date)
          const mm = d.getMonth()+1
          const dd = d.getDate()
          const yy = d.getFullYear()
        sql_query+= ` WHERE  (DATEPART(yy, ThoiGianDat) = ${yy}
        AND    DATEPART(mm, ThoiGianDat) = ${mm}
        AND    DATEPART(dd, ThoiGianDat) = ${dd})`
        }
    request.query(sql_query, function (err, recordset) {
      if (err) res.send(err);
      res.send({ result: recordset.recordset });
    });
}
function findPhieuDatBan(req, res, next){
    const data = req.body.data
    console.log(data)
    var request = new sql.Request();
    var sql_query =
      "select * from PhieuDatBan";
     request.query(sql_query, function (err, recordset) {
      if (err) res.send(err);
      res.send({ result: recordset.recordset });
    });
}

function updatePhieuDatBan(req, res, next){

    const id = req.params.id;
    const data = req.body.data
    console.log(id, data)

    var request = new sql.Request();
    var sql_query =
      `update PhieuDatBan set ThoiGianDat ='${data.ngay}', TenKhachHang='${data.tenKhachHang}', SoNguoiDat=${data.soNguoiDat} where IDPhieuDat = ${id}`;

     request.query(sql_query, function (err, recordset) {
      if (err) res.send({ok: false});
      else
      res.send({ ok:true });
    });
}
function createPhieuDatBan(req, res, next){

    
    const data = req.body.data
    console.log(data)

    var request = new sql.Request();
    var sql_query =
      `insert into PhieuDatBan(ThoiGianDat,TenKhachHang,SoNguoiDat) values ('${data.ngay}','${data.tenKhachHang}',${data.soNguoiDat}) `;

     request.query(sql_query, function (err, recordset) {
      if (err) res.send({ok: false});
      else
      res.send({ ok:true });
    });
}
function deletePhieuDatBan(req, res, next){

    
    const id = req.params.id
    console.log(req.params.id)
    var request = new sql.Request();
    var sql_query =
      `delete from PhieuDatBan where IDPhieuDat = ${id} `;

     request.query(sql_query, function (err, recordset) {
      if (err) res.send({ok: false});
      else
      res.send({ ok:true });
    });
}

    module.exports = {
       getPhieuDatBan,
       updatePhieuDatBan,
       createPhieuDatBan,deletePhieuDatBan

        
    } 

   