const AsyncError = (reqhandler)=> async (req, res, next)=> {
     try {
        await reqhandler(req, res, next)
     } catch (error) {
        next(error)
     }
}
module.exports = AsyncError


