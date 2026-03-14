const logReq = (req, res, next) => {
    console.log("Log Req to this API, PATH:", req.path);
    next(); 
}

export default logReq;