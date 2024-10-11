
class customError extends Error{
    constructor(message,){
        super(message)
        this.status="ERROR"
        this.statusCode=400
    }
}
class customFail extends Error{
    constructor(message){
        super(message)
        this.status="FAIL"
        this.statusCode=500
    }
}

class customSuccess{
constructor(data){
    this.status="SUCCESS"
    this.data=data 
}
}


module.exports={customError,customFail,customSuccess}