module.exports = {

    exeCMD_line : function(req, res){
        console.log("line test gogo");
    }

// export default async function exeCMD_line(s){
//         exec(`R CMD BATCH --no-save --no-restore "--args ${s}" mk_line.R mk_line.Rout`, (err, stdout, stderr) => {
//             if (err || stderr) {
//             // node couldn't execute the command
//                 console.log("cmd execute waiting")
//                 //res.write(upload_html);
//             }
//             else{
//                 console.log("image making") 
//             } 
//         });
//   }
// export default async function exeCMD_bar(s){
    
//         exec(`R CMD BATCH --no-save --no-restore "--args ${s}" mk_bar.R mk_bar.Rout`, (err, stdout, stderr) => {
//             if (err || stderr) {
//             // node couldn't execute the command
//                 console.log("cmd execute waiting")
//                 //res.write(upload_html);
//             }
//             else{
//                 console.log("image making") 
//             } 
//         });

//   }
}