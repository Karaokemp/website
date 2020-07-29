pipeline {
  triggers {
    pollSCM('* * * * *')
  }
  agent any
   parallel {
        

        stage('Install frontend packages') {
          when {
            changeset 'frontend/**'
          }
          steps {
            sh 'npm install --prefix frontend'
          }
        }

        stage('Install backend packages') {
      when {
        changeset 'backend/**'
      }
      steps {
        sh 'npm install --prefix backend'
      }
    }

      }

    

    /*stage(' Frontend Unit Tests') {
      when {
        changeset 'frontend/**'
      }
      steps {
        sh 'CI=true JEST_JUNIT_OUTPUT_DIR="../reports" npm test --prefix frontend'
        junit 'reports/junit.xml'
      }
    } */

  }
