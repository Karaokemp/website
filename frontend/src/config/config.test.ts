import Config from './Config'
let config:Config
let preEnv:string
describe.skip('by default',()=>{
  beforeAll(()=>{
    preEnv = process.env.ENVIRONMENT!
    process.env['ENVIRONMENT'] = '';
    config = new Config()
  });
  test('should get local environment', () => {
      expect(config.ENVIRONMENT).toBe('LOCAL');  
  });
  test('should get correct backend url', () => {
    expect(config.URLS.KARAOKEMP_BACKEND).toBe('localhost:4001');  
});
  afterAll(()=>{
    process.env['ENVIRONMENT'] = preEnv
  });
})

describe.skip('if test',()=>{
  beforeAll(()=>{
    preEnv = process.env.ENVIRONMENT!
    process.env['ENVIRONMENT'] = 'TEST';
    config = new Config()
  });
  test('should get test environment', () => {
      expect(config.ENVIRONMENT).toBe('TEST');  
  });
  test('should get correct backend url', () => {
    expect(config.URLS.KARAOKEMP_BACKEND).toBe('backend:4001');  
});
  afterAll(()=>{
    process.env['ENVIRONMENT'] = preEnv
  });
})