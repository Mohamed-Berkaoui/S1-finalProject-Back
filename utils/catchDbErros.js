const { customError, customFail } = require("./customResponces")

async function catchDbErrors(statment){

try {
    return await statment
} catch (error) {
  throw new customFail(error.message)
}

}
module.exports=catchDbErrors