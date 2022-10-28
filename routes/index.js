var express = require('express');
var router = express.Router();
var fs = require('fs');
var url = require('url');
var multer = require('multer')
var storage  = multer.diskStorage({ 
  destination(req, file, cb) {
    cb(null, `public/file/`);
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}__${file.originalname}`);
  },
});
var uploader = multer({storage: storage});

var requestIp = require('request-ip');
var formidable = require('formidable');
const { exec } = require('child_process');

const exeCMD = require('../controllers/exe_cmd')
const userIp = require('../controllers/user_ip')

//var __dirname2 = 'C:/Users/jimin/vscode-workspace/express_test'

// router.use(express.static(__dirname2 + '/public'))
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.sendFile(__dirname2 + '/views' + '/main_page.html');
// });
// router.get('/line', function(req, res, next) {
//   res.sendFile(__dirname2 + '/views' + '/line_page.html');
// });
// router.get('/bar', function(req, res, next) {
//   res.sendFile(__dirname2 + '/views' + '/bar_page.html');
// });

var i = "hello"
//router.route('/').get(exeCMD.exeCMD_line)
router.get('/', function(req, res, next) {
  console.log(i)
  //var ip =  userIp.getUserIp()
  //console.log(ip)
  //console.log(`${ip}`)
  // var ip = requestIp.getClientIp(req);
  // ip = userIp.changeIptoLong(`${ip}`)
  // console.log(ip)
  //var userIp = userIp.changeIptoLong(ip);
  //console.log(userIp)
  //userIp.generateIp();
 // exeCMD.exeCMD_line();
  // generateIP();
  res.render('main_page');
});
router.get('/line', function(req, res, next) {
  res.render('line_page', { title: 'Express' });
});
router.get('/bar', function(req, res, next) {
  res.render('bar_page', { title: 'Express' });
});
router.post('/upload/line',uploader.single('userfile'), function(req, res, next) {
  console.log('파일 업로드')
});


// router.get('/upload/line', function(req, res, next) {
//   var ip = requestIp.getClientIp(req)
//   function ip_long(ip){
//       var ips = ip.split('.');
//       var iplong = 0;
//       with(Math){
//           iplong= 
//               ips[0]*pow(256,3)+
//               ips[1]*pow(256,2)+
//               ips[2]*pow(256,1)+
//               ips[3]*pow(256,0);
//       }
//       return iplong;
//   }
//   global.userIp = ip_long(ip)
//   global.upload_path = `/Users/jimin/vscode-workspace/express_test/public/images/userFile/`;
//   global.s = `ip=${userIp} userfilename=${userIp}`
//   console.log(s)
//   fs.mkdir(`${upload_path}${userIp}`, function(err) {
//     if (err) {
//       console.log("userfile directory already exists")
//     } else {
//       console.log("New userfile directory successfully created.")
//     }
//   })
//   var form = new formidable.IncomingForm();
//   form.parse(req, function (err, fields, files){
//       // oldpath : temporary folder to which file is saved to
//       var oldpath = files.userfile.path;
//       var file = files.userfile.name;
//       global.userColumn = fields.userColumn;
//       global.moveHTML = `${req.url}`.split('/')[1];
//       console.log(userColumn)
//       var filename = file.split('.').slice(0,-1).join('.');
//       var newpath = upload_path + `${userIp}/` + `${userIp}.csv`;
//       // copy the file to a new location
//       fs.rename(oldpath, newpath, function (err) {
//           if (err) throw err;
//           // you may respond with another html page
          
//           if(moveHTML =="upload_line"){
//               res.write(upload_line);
//           }
//           else{
//               res.write(upload_bar);
//           }
//           return res.end();
//       });  
//   });
// });
router.get('/image' && typeof userColumn !== "undefined" && moveHTML=="upload_line", function(req, res, next) {
  console.log(userColumn+" haha");
  console.log(typeof userColumn)
  exeCMD(s)
  .then(function(){
      fs.readFile(`D:/vscdoe-workspace-for Express/express_test/public/images//userGraph/${userIp}/${userColumn}.png`, function(err, data) {
          if(err){
              console.log("No IMAGE");
              res.end();
          }
          else{
              res.writeHead(200, {'Content-Type': 'image/png'});
              res.write(data);
              console.log("image upload");
              res.end();
          }
      })     
  })    
});
router.get('/image2' && typeof userColumn !== "undefined" && moveHTML=="upload_bar", function(req, res, next) {
  console.log(userColumn+" haha");
  console.log(typeof userColumn)
  exeCMD2(s)
  .then(function(){
      fs.readFile(`D:/vscdoe-workspace-for Express/express_test/public/images//userGraph/${userIp}/${userColumn}.png`, function(err, data) {
          if(err){
              console.log("No IMAGE");
              res.end();
          }
          else{
              res.writeHead(200, {'Content-Type': 'image/png'});
              res.write(data);
              console.log("image upload");
              res.end();
          }
      })     
  })    
});
module.exports = router;
