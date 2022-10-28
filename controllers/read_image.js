export default async function readIMG(){
    fs.readFile(`C:/Users/jimin/vscode-workspace/express_test/public/images//userGraph/${userIp}/${userColumn}.png`, function(err, data) {
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
}