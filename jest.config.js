module.exports = {
    reporters: [
      [ 'jest-junit.xml', {
        outputDirectory: 'reports',
        outputName: 'jest-junit.xml',
      } ]
    ]
  };