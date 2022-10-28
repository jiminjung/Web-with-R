var express = require('express');
var router = express.Router();
var fs = require('fs');
var url = require('url');
var multer = require('multer')

var storage  = multer.diskStorage({ 
  destination(req, file, cb) {
    cb(null, `public/file/${userIp}`);
  },
  filename(req, file, cb) {
   // cb(null, `${Date.now()}__${file.originalname}`);
    global.filename =  `${file.originalname}`
    cb(null, `${userIp}.csv`);
  },
});
var uploader = multer({storage: storage});
const R = require('r-integration');

var requestIp = require('request-ip');
var formidable = require('formidable');
const { exec } = require('child_process');

//const exeCMD = require('../controllers/exe_cmd')
//const userIp = require('../controllers/user_ip')

//var ip = "210.117.128.200"
//var ip = requestIp.getClientIp(req)


function makeDirectory(ip){
    //var ip = "210.117.128.200"
    function ip_long(ip){
        var ips = ip.split('.');
        var iplong = 0;
        with(Math){
            iplong= 
                ips[0]*pow(256,3)+
                ips[1]*pow(256,2)+
                ips[2]*pow(256,1)+
                ips[3]*pow(256,0);
        }
        return iplong;
    }
    global.userIp = ip_long(ip)
    var upload_path = `D:/vscode-workspace-for-Express/express_test/public/file/`;
    var savedfilename ="파프리카_1분 데이터_11월 1차"
    
    global.s = `ip=${userIp} userfilename=${userIp}`
    

    fs.mkdir(`${upload_path}${userIp}`, function(err) {
        if (err) {
          console.log("userfile directory already exists")
        } else {
          console.log("New userfile directory successfully created.")
        }
    })
}

function exeR(){
    var result = R.executeRScript("D:\\vscode-workspace-for-Express\\express_test\\public\\rscripts\\test.R");
    console.log(result)
}
function changeFilename(){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files){
        // oldpath : temporary folder to which file is saved to
        var oldpath = files.userfile.path;
        var file = files.userfile.name;
        global.userColumn = fields.userColumn;
        global.moveHTML = `${req.url}`.split('/')[1];
        console.log(userColumn)
        var filename = file.split('.').slice(0,-1).join('.');
        var newpath = upload_path + `${userIp}/` + `${userIp}.csv`;
        
        // copy the file to a new location
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            // you may respond with another html page
            
            if(moveHTML =="upload_line"){
 //               res.write(upload_line);
            }
            else{
   //             res.write(upload_bar);
            }
 //           resolve();
 //           return res.end();
        });  
    });
}

function exeCMD(s){
    return new Promise(function(resolve,reject){
       exec(`"C:\\Program Files\\R\\R-4.1.2\\bin\\R.exe" CMD BATCH --no-save --no-restore "--args ${s}" mk_line2.R mk_line2.Rout`, (err, stdout, stderr) => {
        if (err) {
            if (err.code === 1) {
              // leaks present
              console.log(err);
              resolve(stdout);
            } else {
              // gitleaks error
              console.log(err);
              reject(err);
            }
          } else {
            // no leaks
            resolve(stdout);
            console.log("image making")
          }
        });
    });
}
function exeCMD2(s){
    return new Promise(function(resolve,reject){
        exec(`R CMD BATCH --no-save --no-restore "--args ${s}" mk_bar.R mk_bar.Rout`, (err, stdout, stderr) => {
            if (err || stderr) {
            // node couldn't execute the command
                console.log(err);
                //res.write(upload_html);
                resolve();
            }
            else{
                console.log("image making") ;
                resolve();
            } 
        });
    });
}
router.get('/', function(req, res, next) {
    res.render('main_page');
    next();
});
router.get('/line', function(req, res, next) {
    var ip = requestIp.getClientIp(req)
    makeDirectory(ip);
    res.render('line_page');
    next();
});
router.get('/bar', function(req, res, next) {
    res.render('bar_page', { title: 'Express' });
    next();
});
router.post('/upload_line',uploader.single('userfile'), function(req, res, next) {
    console.log('파일 업로드');
    console.log(s);
    console.log("selected Column="+req.body.userColumn);
    console.log("filename="+filename);
    exeCMD(s)
 

});




module.exports = router;
