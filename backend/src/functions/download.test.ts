import download from "./download";
describe('download function',()=>{
    test('should work',()=>{
        const mammals = new URL('https://www.youtube.com/watch?v=AUjmpbd-U2Q&vl=en')
       download(mammals).then((response)=>{
           expect(response).toContain('.mp4')
        

       }).catch((msg)=>{
           console.log(msg)
       })
    })
})