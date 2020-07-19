pipeline {
  agent any
  stages {
    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Unit Tests') {
      steps {
         withNPM(npmrcConfig:'ci-nprc') {
            sh 'ls'
        }
      
      }
    }

  }
}