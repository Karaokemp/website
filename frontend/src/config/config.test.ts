import config from "./config";
describe('by default',()=>{
  test('should get local environment', () => {
    expect(config.ENVIRONMENT).toBe('LOCAL');
  });
})



  test('should get correct backend url ', () => {
    expect(config.URLS.KARAOKEMP_BACKEND).toBe('localhost:4001');
  });