const sql = require("mssql");
const {initializeCustomer,initializeBill}= require('../config/firebase');
class hoaDonController {
    async lastID(req,res,next){
        var request = new sql.Request();
        var sql_query =
          "select Max(IDHoaDon) as Length from HoaDon";
        await request.query(sql_query, async function (err, recordset) {
           if (err) res.send(err);
           console.log(recordset.recordset[0]);
           await res.send({ result: recordset.recordset[0] });
        });
    }
    async create(req,res,next){
      try {
        const item = await {
          ID:Number(req.body.ID)+1,
          IDBan:Number(req.body.IDBan),
          IDKhachHang: req.body.IDKhachHang,
          TrangThai: req.body.TrangThai,
          PhuongThuc: req.body.PhuongThuc,
          NgayLap: Date(req.body.NgayLap),
          Detail:JSON.parse(req.body.Detail),   
        };
        const itemFirebase= await{
          IDTable:Number(req.body.IDBan),
          CardID:req.body.IDKhachHang,
          Date:req.body.NgayLap,
          IDVoucher:1,
          PriceSale:0,
          Detail:JSON.parse(req.body.DetailFirebase)
        }
        var detailQuery="";
        var congThucQuery="select NguyenLieu.IDNguyenLieu, NguyenLieu.SoLuongTon, sum(CongThuc.SoLuong) as SoLuong From NguyenLieu,CongThuc where CongThuc.IDNguyenLieu = NguyenLieu.IDNguyenLieu and (";
        item.Detail.forEach((data)=>{
          var temp="Insert into CT_HoaDon(IDHoaDon,IDMonAn,SoLuong,GiaBan) values("+ item.ID+","+data.IDMonAn+","+ data.quantity+","+data.GiaBan+")\n";
          congThucQuery=congThucQuery.concat("CongThuc.IDMon="+ data.IDMonAn + "or ") ;
          detailQuery=detailQuery.concat(temp);
        });  
        congThucQuery=congThucQuery.slice(0,congThucQuery.length-3)+") \n group by NguyenLieu.IDNguyenLieu,NguyenLieu.SoLuongTon";    
        var request = new sql.Request();
        var quantityChange = await (await request.query(congThucQuery)).recordset;
        var updateStock="";
        await quantityChange.forEach((data)=>{
          let temp=data.SoLuongTon - data.SoLuong;
          updateStock= updateStock.concat("Update NguyenLieu set SoLuongTon="+temp+" where IDNguyenLieu="+data.IDNguyenLieu +"\n");
        })
        request
          .input("IDBan", sql.Int, item.IDBan)
          .input("IDKhachHang", sql.Int, item.IDKhachHang)
          .input("TrangThai", sql.Int, item.TrangThai)
          .input("IDPhuongThuc", sql.Int, item.PhuongThuc)
          .input("NgayLap", sql.DateTime, item.NgayLap);
        var sql_query =
          "Insert into HoaDon(IDBan,IDKhachHang,TrangThai,IDPhuongThuc,NgayLap) values(@IDBan,@IDKhachHang,@TrangThai,@IDPhuongThuc,@NgayLap)\n";
        sql_query=sql_query.concat(detailQuery);  
        sql_query=sql_query.concat(updateStock); 
        const firebase= initializeBill();
        const res= firebase.firestore().collection('bills').doc(String(item.ID)).set(itemFirebase)
        await request.query(sql_query);
        res.send('success');
      } catch (err) {
        console.log(err);
        res.send("Không thành công!");
      }
    }
    getHoaDon(req, res, next) {

      console.log("Query Nhap Kho", req.query)
      const date = req.query.date
      let addSql =""
      if(date)
       addSql = ` and HoaDon.NgayLap = '${date}'`
    
      var request = new sql.Request();
      var sql_query =
        "Select *,PhuongThucThanhToan.IDPhuongThuc as IDPT from HoaDon,PhuongThucThanhToan where HoaDon.IDPhuongThuc=PhuongThucThanhToan.IDPhuongThuc"+addSql;
      request.query(sql_query, function (err, recordset) {
        if (err) res.send(err);
        const data = recordset.recordset
        data.forEach(item =>{
          // console.log(item.NgayLap.getDate())
          const d = new Date(item.NgayLap)
          const  date = `${item.NgayLap.getDate()}/${item.NgayLap.getMonth()+1}/${item.NgayLap.getFullYear()}`;
          item.NgayLap = date
          
          item.NgayLapFormat =  d.toISOString().substring(0,10)
        })
    
        res.send({ result: data  });
      });
    }
    getChiTietHoaDon(req, res, next) {
        const id = req.params.id
      var request = new sql.Request();
      var sql_query =
        `Select * from CT_HoaDon, MonAn where IDHoaDon = ${id} and CT_HoaDon.IDMonAn = MonAn.IDMon`;
      request.query(sql_query, function (err, recordset) {
        if (err) res.send(err);
        const data = recordset.recordset
    
        res.send({ result: data  });
      });
    }
    getPhuongThuc(req, res, next) {
      var request = new sql.Request();
      var sql_query =
        `Select * from PhuongThucThanhToan`;
      request.query(sql_query, function (err, recordset) {
        if (err) res.send(err);
        const data = recordset.recordset
    
        res.send({ result: data  });
      });
    }
    
    updateHoaDon(req, res, next) {
      const ID = req.params.id
      console.log("ID: "+ID)
      data =  req.body.data
      console.log("data", data)
      // console.log(req.body.data.chiTiet)
    
      xoaCTHoaDonCu(ID)
    
      data.chiTiet.forEach(item => {
        insertHoaDon(item,ID)
      });
    
      var request = new sql.Request();
    
     var sql_query =`Update HoaDon set IDBanAn =${data.idBanAn},IDPhuongThuc=${data.idPTTT},NgayLap='${data.ngayLap}' where IDHoaDon=${ID};`;
      request.query(sql_query, function (err, resp) {
        if (err) console.error(err);
      });
    
      
    
      res.send({ok:true})
    }
    async insertHoaDon(item, IDHoaDon) {
      var request = new sql.Request();
      console.log(item)
      var GiaBan = await getGiaBan(item.idMonAn)
      console.log(GiaBan)
      
      var sql_query =
        `insert into CT_HoaDon(IDHoaDon,IDMonAn,SoLuong,GiaBan) values(${IDHoaDon},${item.idMonAn},${item.soLuong},${GiaBan});
        `;
      request.query(sql_query, function (err, recordset) {
        if (err) {
            console.log(err)
          return;
          };
      });
    }
    async getGiaBan(id) {
      var request = new sql.Request();
      console.log("ID Mon an:", id)
      
      var sql_query =
        `Select GiaBan from MonAn where IDMon = ${id}`;
        return new Promise((resolve, reject)=>{
          request.query(sql_query, function (err, recordset) {
        if (err) {
            console.log(err)
          return;
          };
          resolve(recordset.recordset[0].GiaBan)
      });
        })
      
    }
    
    xoaCTHoaDonCu(ID){
      var request = new sql.Request();
    
     var sql_query =`delete from CT_HoaDon where IDHoaDon=${ID};`;
      request.query(sql_query, function (err, resp) {
        if (err) console.error(err);
      });
    }
    
    getDanhSachBan(req, res, next) {
    var request = new sql.Request();
    var sql_query =
      `Select * from BanAn`;
    request.query(sql_query, function (err, recordset) {
      if (err) res.send(err);
      const data = recordset.recordset
    
      res.send({ result: data  });
    });
    }
    
    getMonAn(req, res, next) {
      var request = new sql.Request();
      var sql_query =
        `Select * from MonAn`;
      request.query(sql_query, function (err, recordset) {
        if (err) res.send(err);
        const data = recordset.recordset
    
        res.send({ result: data  });
      });
    }
    
    deleteHoaDon(req, res, next) {
      const ID = req.params.id
      console.log(ID)
    
      xoaCTHoaDonCu(ID)
      var request = new sql.Request();
    
     var sql_query =`delete from HoaDon where IDHoaDon=${ID}`;
      request.query(sql_query, function (err, resp) {
        if (err) throw err;
        res.send({ok:true})
      });
    }
}
module.exports = new hoaDonController();

