const { customError } = require("./customResponces")

async function catchDbErrors(statment){

try {
    return await statment
} catch (error) {
    throw new customError(error.message)
}

}
module.exports=catchDbErrors