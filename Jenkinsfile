pipeline {
  agent any
  stages {
    stage('Install test dependencies') {
      steps {
        sh 'npm install --cross-env'
      }
    }

    stage('Unit Tests') {
      steps {
        withNPM(npmrcConfig: 'ci-nprc') {
          sh 'ls'
        }

      }
    }

  }
}