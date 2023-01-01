var sql = require('mssql');
const { ReturnValueToken } = require('tedious/lib/token/token');

function getNguyenLieu(req, res, next){


  console.log("Query Nguyen lieu", req.query)
  const TenNguyenLieu = req.query.TenNguyenLieu
  let addSql =""
  if(TenNguyenLieu)
   addSql = ` and TenNguyenLieu Like '%${TenNguyenLieu}%'`

    var request = new sql.Request();
    var sql_query =
      "select IDNguyenLieu,TenNguyenLieu,DonViTinh,SoLuongTon,DonGia from NguyenLieu,DonViTinh where NguyenLieu.IDDVT=DonViTinh.IDDVT"+addSql;
     request.query(sql_query, function (err, recordset) {
      if (err) res.send(err);
      res.send({ result: recordset.recordset });
    });
}

function getDonViTinh(req, res, next){
    var request = new sql.Request();
    var sql_query =
      "select * from DonViTinh";
     request.query(sql_query, function (err, recordset) {
      if (err) res.send(err);
      res.send({ result: recordset.recordset });
    });
}
async function createNguyenLieu(req, res, next){
    const data = await req.body.data
    console.log(data)
    var request = new sql.Request();
    var sql_query =`INSERT INTO NguyenLieu(TenNguyenLieu, IDDVT, SoLuongTon, DonGia) VALUES(N'${data.TenNguyenLieu}', ${data.IDDVT}, ${data.SoLuongTon},${data.DonGia})`;
    // var sql_query="Insert into NguyenLieu(TenNguyenLieu,IDDVT,SoLuongTon,DonGia) values("+data.tenNguyenLieu+","+Number.parseInt(data.donViTinh)+","+Number.parseInt(data.soLuongTon)+Number.parseInt(data.donGia)+")\n";


     request.query(sql_query, function (err, recordset) {
      if (err) {
          res.send({ok: false, err: err});
        return;
        }
      res.send({ ok: true });
    });
}

function themNguyenLieu(req, res, next){
  console.log(req.body)
  const soLuong = req.body.SoLuong;
  const IDNguyenLieu = req.body.IDNguyenLieu;
  var request = new sql.Request();
  var sql_query =
   ` UPDATE NguyenLieu SET SoLuongTon = SoLuongTon + ${soLuong}
    WHERE IDNguyenLieu=${IDNguyenLieu};`;
   request.query(sql_query, function (err, recordset) {
    if (err) 
      res.send({ok:false, err})
    else
    res.send({ ok:true});
  });
}
function thayNguyenLieu(req, res, next){
  console.log(req.body)
  const soLuong = req.body.SoLuong;
  const IDNguyenLieu = req.body.IDNguyenLieu;
  var request = new sql.Request();
  var sql_query =
   ` UPDATE NguyenLieu SET SoLuongTon = ${soLuong}
    WHERE IDNguyenLieu=${IDNguyenLieu};`;
   request.query(sql_query, function (err, recordset) {
    if (err) 
      res.send({ok:false, err})
    else
    res.send({ ok:true});
  });
}
function xoaNguyenLieu(req, res, next){
  console.log(req.body)
  const soLuong = req.body.SoLuong;
  const IDNguyenLieu = req.body.IDNguyenLieu;
  var request = new sql.Request();
  var sql_query =
   ` UPDATE NguyenLieu SET SoLuongTon = SoLuongTon - ${soLuong}
    WHERE IDNguyenLieu=${IDNguyenLieu};`;
   request.query(sql_query, function (err, recordset) {
    if (err) 
      res.send({ok:false, err})
    else
    res.send({ ok:true});
  });
}

module.exports = {
    getNguyenLieu,
    getDonViTinh,
    createNguyenLieu,
    themNguyenLieu,
    xoaNguyenLieu,
    thayNguyenLieu
    
} 


