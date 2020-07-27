pipeline {
  agent any
  triggers { pollSCM('* * * * *') }
  stages {
    stage('Install dependencies') {
      steps {
        sh 'cd frontend'
        sh 'npm install'
      }
    }

    stage('Unit Tests') {
      when { 
            changeset "frontendz/**"
        }
      steps {
        sh 'cd frontend'
        sh 'CI=true JEST_JUNIT_OUTPUT_DIR="./reports" npm test'
      
      }
    }

  }
  post {
        always {
            sh    'cd frontend'
            junit 'reports/junit.xml'
            sh    'ls'
        }
    }
  }