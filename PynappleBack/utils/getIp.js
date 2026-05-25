function getIp(req,res,next){
    let ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // If the ipAddress is IPv6, it may return '::1' for localhost, check and replace if needed
    if (ipAddress.substr(0, 7) == "::ffff:") {
      ipAddress = ipAddress.substr(7)
    }
  
    req.ipAddress = ipAddress;
    // console.log(ipAddress); // Log the IP address for debugging
    next();
}
module.exports=getIp