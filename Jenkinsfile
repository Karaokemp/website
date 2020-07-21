pipeline {
  agent any
  stages {
    stage('Install test dependencies') {
      steps {
        sh '''npm cache clean --force
npm install'''
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