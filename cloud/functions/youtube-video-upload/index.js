const MSG = "HELLO! This is DreckGuy !!! Created this code on local workstation"
exports.handler = async function(event) {
  return new Promise(function(resolve) {
      resolve(MSG)
   
    })
}