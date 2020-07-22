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
        sh 'CI=true npm test'
        ls
      }
    }
    

  }
  post {
        always {
            junit 'reports/jest-junit.xml'
        }
    }
}