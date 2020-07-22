pipeline {
  agent any
  triggers { pollSCM('* * * * *') }
  stages {
    stage('Install test dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Unit Tests') {
      steps {
        sh 'CI=true JEST_JUNIT_OUTPUT_DIR="./reports" npm test'
      }
      
    }
    

  }
  post {
        always {
            junit 'reports/junit.xml'
        }
    }
}