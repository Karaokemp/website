import Config from './Config'
let config:Config;
let preEnv:string;
describe('by default',()=>{
  beforeAll(()=>{
    preEnv = process.env.ENVIRONMENT!
    process.env.ENVIRONMENT = '';
    config = new Config();
  })
  test('should get local environment', () => {
    expect(config.ENVIRONMENT).toBe('LOCAL');
  });
})



  test('should get correct backend url ', () => {
    expect(config.URLS.KARAOKEMP_BACKEND).toBe('localhost:4001');
  });
