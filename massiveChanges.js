const ips = [

]

const passwords = [
  
]


const scp = require('node-scp');
const SSH = require('simple-ssh');

async function sendFile(ip,password,user,port,folder) {
  try {
    const client = await scp({
      host: ip,
      port: port,
      username: user,
      password: password      
    })
    // para actualizar tienda
    //await client.uploadFile('./mail.php', '/usr/share/nginx/html/'+folder+'/config/mail.php')        
    
    // para actualizar panel
    await client.uploadFile('./mail.php', '/usr/share/nginx/html/samurai/config/mail.php')        
    
    
    client.close() 
  } catch (e) {
    console.log(e)
  }
}

function bringData(ip,password){  
  var ssh = new SSH({
    host: ip,
    user: 'root',
    pass: password
  });
  ssh
  .exec('cat /usr/share/nginx/html/samurai/.env  | grep PATH_PAGE', { 
    out: function (stdout) {        
      var string = stdout;
      var parts = string.split("=");
      var folder = parts[1].trim();
      let user = 'root';
      let port = 22;
      console.log(folder);
      console.log(ip);
      console.log(password);
      sendFile(ip,password,user,port,folder);
    },
    err: function(stderr) {
      console.log("there was an error");
      console.log("ip "+ ip);
      
      console.log(stderr); 
    } 
  })
  .start();
}
for(var i = 0 ; i < ips.length ;i++){
  var ip = ips[i];
  var password = passwords[i];
  console.log("ip : "+ip);
  console.log("password : "+password);
  bringData(ip,password);
}



