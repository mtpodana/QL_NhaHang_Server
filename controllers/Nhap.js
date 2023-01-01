var sql = require("mssql");

function getPhieuNhap(req, res, next) {
  var request = new sql.Request();

  console.log("Query Nhap Kho", req.query)
  const date = req.query.date
  let addSql =""
  if(date)
   addSql = ` where NgayNhap = '${date}'`
  var sql_query =
    "Select * from PhieuNhap"+ addSql;
    
  request.query(sql_query, function (err, recordset) {
    if (err) res.send(err);
    const data = recordset.recordset
    data.forEach(item =>{
      // console.log(item.NgayNhap.getDate())
      const  date = `${item.NgayNhap.getDate()}/${item.NgayNhap.getMonth()+1}/${item.NgayNhap.getFullYear()}`;
      item.NgayNhap = date
    })

    res.send({ result: data  });
  });
}

async function insertPhieuNhap(req, res, next) {

    const data = await req.body.data
    // console.log(data)

  var request = new sql.Request();
  var sql_query = `insert into PhieuNhap(NgayNhap) values('${data.NgayNhap}');SELECT MAX(IDPhieuNhap) AS idPhieuNhap FROM PhieuNhap`;
  request.query(sql_query, function (err, result) {
    if (err) {
      res.send(err);
      return;
    }
    const idPhieuNhap = result.recordset[0].idPhieuNhap
    data.dataNguyenLieu.forEach(item => {
        console.log(item)
        insertNguyenLieu(item,idPhieuNhap)
    });



    console.log(result)
    res.send({ ok: true });
  });
}

function insertNguyenLieu(item, idPhieuNhap) {
    var request = new sql.Request();
    console.log(item)
    var sql_query =
      `insert into CT_PhieuNhap(IDPhieuNhap,IDNguyenLieu,SoLuong,GiaNhap) values(${idPhieuNhap},${item.IDNguyenLieu},${item.SoLuong},${item.GiaNhap});
      UPDATE NguyenLieu SET SoLuongTon = SoLuongTon + ${item.SoLuong}
      WHERE IDNguyenLieu=${item.IDNguyenLieu};
      `;
    request.query(sql_query, function (err, recordset) {
      if (err) {
          console.log(err)
        return;
        };
    });
  }


  function getChiTietPhieuNhap(req, res, next) {
    const ID = req.params.id
    var request = new sql.Request();
    var sql_query =
    `Select CT_PhieuNhap.IDNguyenLieu, NgayNhap, TenNguyenLieu, CT_PhieuNhap.SoLuong, CT_PhieuNhap.GiaNhap from PhieuNhap, CT_PhieuNhap,NguyenLieu where PhieuNhap.IDPhieuNhap = CT_PhieuNhap.IDPhieuNhap and PhieuNhap.IDPhieuNhap=${ID} and CT_PhieuNhap.IDNguyenLieu = NguyenLieu.IDNguyenLieu`;
    request.query(sql_query, function (err, resp) {
      if (err) res.send(err);
      else
      res.send({ result: {NgayNhap: resp.recordset[0]&&resp.recordset[0].NgayNhap.toISOString().substring(0,10), list: resp.recordset}  });
    });
  }
  async function updatePhieuNhap(req, res, next) {
    const ID = req.params.id
    data = await req.body.data
    // console.log(req.body)

    xoaSoLuongTonkho(data.dataLast.list)


    xoaCTPhieuNhapCu(ID)

    data.dataNguyenLieu.forEach(item => {
      console.log(item)
      insertNguyenLieu(item,ID)
    });

    var request = new sql.Request();
    console.log(data.NgayNhap)

   var sql_query =`Update PhieuNhap set NgayNhap = '${data.NgayNhap}' where IDPhieuNhap=${ID};`;
    request.query(sql_query, function (err, resp) {
      if (err) console.error(err);
    });

    

    res.send({ok:true})
  }

  function xoaSoLuongTonkho(list){
    var request = new sql.Request();
    // console.log(list)

    list.forEach(item=>{
      var sql_query =`UPDATE NguyenLieu SET SoLuongTon = SoLuongTon - ${item.SoLuong}
      WHERE IDNguyenLieu=${item.IDNguyenLieu};`;
    request.query(sql_query, function (err, resp) {
      if (err) console.error(err);
    });
    })
  }
  function xoaCTPhieuNhapCu(ID){
    var request = new sql.Request();

   var sql_query =`delete from CT_PhieuNhap where IDPhieuNhap=${ID};`;
    request.query(sql_query, function (err, resp) {
      if (err) console.error(err);
    });
  }

  async function deletePhieuNhap(req, res, next) {
    const ID = req.params.id
    data = await req.body.result.list
    console.log(req.body.result.list)

    xoaSoLuongTonkho(data)
    console.log('id----------------'+ID)


    xoaCTPhieuNhapCu(ID)

    var request = new sql.Request();

   var sql_query =`delete from PhieuNhap where IDPhieuNhap=${ID};`;
    request.query(sql_query, function (err, resp) {
      if (err) console.error(err);
    });

    

    res.send({ok:true})
  }



module.exports = {
    insertPhieuNhap,
    getPhieuNhap,
    getChiTietPhieuNhap,
    updatePhieuNhap,
    deletePhieuNhap
};
