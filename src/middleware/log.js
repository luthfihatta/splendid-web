const logReq = (req, res, next) => {
    console.log("Log req ke API ini, PATH:", req.path);
    next(); 
}

export default logReq;