const AsyncError = (reqhandler)=>{
    return (req, res, next)=>{
        Promise.resolve(reqhandler(req, res , next)).catch(err=>next(err))
    }
}
module.exports = AsyncError