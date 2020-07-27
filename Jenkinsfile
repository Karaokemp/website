pipeline {
  agent any
  triggers { pollSCM('* * * * *') }
  when { 
            changeset "frontend/**"
        }
  stages {
    stage('Install dependencies') {
      steps {
        sh 'cd frontend'
        sh 'npm install'
      }
    }

    stage('Unit Tests') {
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