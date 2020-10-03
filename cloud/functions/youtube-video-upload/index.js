const MSG = "HELLO! This is DreckGuy !!! Created this short code on local workstation"
exports.handler = async (event)=>{
  return new Promise((resolve)=>{
    throw new Error("Test Error!")
      resolve(MSG)
    })
}