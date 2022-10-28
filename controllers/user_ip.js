
const { NotExtended } = require('http-errors');
const requestIp = require('request-ip');

module.exports ={

  getUserIp : function(req, res){
    var ip = requestIp.getClientIp(req);
    return this.ip;
  }
  // ,
  // changeIptoLong : function(ip){
  //   var ips = ip.split('.');
  //   var iplong = 0;
  //   with(Math){
  //       iplong= 
  //           ips[0]*pow(256,3)+
  //           ips[1]*pow(256,2)+
  //           ips[2]*pow(256,1)+
  //           ips[3]*pow(256,0);
  //   }
  //   return iplong;
  // }
}

  
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
//   }
// }