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
            changeset "frontend/**"
        }
      steps {
        sh 'cd frontend'
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