pipeline {
  agent any
  stages {
    stage('Install test dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Unit Tests') {
      steps {
        withNPM(npmrcConfig: 'CI=true')
      }
    }

  }
  environment {
    CI = 'true'
  }
}