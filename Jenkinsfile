pipeline {
  triggers {
    pollSCM('* * * * *')
  }
  agent any
  stages{
     stage('build services'){
       parallel{
         stage('frontend'){
           /*when {
            changeset 'frontend/**'
          }*/
           stages{
             stage('Install packages') {
          
          steps {
            sh 'npm install --prefix frontend'
          }
        } 
             stage('Unit Tests') {
      steps {
        sh 'CI=true JEST_JUNIT_OUTPUT_DIR="../reports" npm test --prefix frontend'
        junit 'reports/junit.xml'
      }
    }
           }
         }
         
           stage('backend'){
            /*when {
        changeset 'backend/**'
      }*/
              stages{
            stage('Install packages') {
      /*when {
        changeset 'backend/**'
      }*/
      steps {
        sh 'npm install --prefix backend'
      }
    }
         }
           }
       }
     }
       
  }   
}