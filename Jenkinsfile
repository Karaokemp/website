pipeline {
  agent any
  triggers { pollSCM('* * * * *') }
  stages {
    stage('Install dependencies') {
      steps {
        sh 'npm install --prefix frontend'
      }
    }

    stage('Unit Tests') {
      /*when { 
            changeset "frontend/**" 
        } */
      steps {

        sh 'CI=true JEST_JUNIT_OUTPUT_DIR="./reports" npm test --prefix frontend'
      
      }
    }

  }
  post {
        always {
            junit 'frontend/reports/junit.xml'
            sh    'ls'
        }
    }
  }