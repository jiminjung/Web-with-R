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

var _url = req.url;
var ip = requestIp.getClientIp(req)

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
var userIp = ip_long(ip)
var upload_path = `/Users/jimin/vscode-workspace/express_test/public/file/`;

const s = `ip=${userIp} userfilename=${userIp}`

function makeDirectory(){
    fs.mkdir(`${upload_path}${userIp}`, function(err) {
        if (err) {
          console.log("userfile directory already exists")
        } else {
          console.log("New userfile directory successfully created.")
        }
    })
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
                res.write(upload_line);
            }
            else{
                res.write(upload_bar);
            }
            resolve();
            return res.end();
        });  
    });
}

function exeCMD(s){
        exec(`R CMD BATCH --no-save --no-restore "--args ${s}" mk_line.R mk_line.Rout`, (err, stdout, stderr) => {
            if (err || stderr) {
            // node couldn't execute the command
                console.log("cmd execute waiting")
                //res.write(upload_html);
                resolve();
            }
            else{
                console.log("image making") 
                resolve();
            } 
    });
}
function exeCMD2(s){
    return new Promise(function(resolve,reject){
        exec(`R CMD BATCH --no-save --no-restore "--args ${s}" mk_bar.R mk_bar.Rout`, (err, stdout, stderr) => {
            if (err || stderr) {
            // node couldn't execute the command
                console.log("cmd execute waiting")
                //res.write(upload_html);
                resolve();
            }
            else{
                console.log("image making") 
                resolve();
            } 
        });
    });
}

router.get('/upload_line'|'/upload_bar', function(req, res, next) {
  makeDirectory();
});
router.get('image' && typeof userColumn !== "undefined" && moveHTML=="upload_line", function(req,res){
    console.log(userColumn+" haha");
    console.log(typeof userColumn)
    console.log(userColumn+" in image2");
    console.log(typeof userColumn)
    exeCMD(s)
    .then(function(){
        fs.readFile(`C:/Users/jimin/vscode-workspace/Web_with_R/userGraph/${userIp}/${userColumn}.png`, function(err, data) {
            if(err){
                console.log("No IMAGE");
                resolve();
                res.end();
            }
            else{
                res.writeHead(200, {'Content-Type': 'image/png'});
                res.write(data);
                //res.write(upload_html);
                console.log("image upload");
                resolve();
                res.end();
            }
        })     
    })   
})


module.exports = router;
