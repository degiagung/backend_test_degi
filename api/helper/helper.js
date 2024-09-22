
class Helper {
    code_success  = '00'
    code_error    = '11'
    res_success   = 200 
    res_failed    = 500 
    info_success  = 'SUCCESS'
    info_failed   = 'FAILED'
    
    response(code, data, message, res){
        res.status(code).json({
            payload :{
                code    : code,
                data    : data,
                message : message,
            },
        })
    }

}


module.exports = Helper;