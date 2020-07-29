pipeline {
  triggers {
    pollSCM('* * * * *')
  }
  agent any
  stages{
     stage('services'){
       parallel{
         stage('frontend'){
           /*when {
            changeset 'frontend/**'
          }*/
           stages{
             stage('Install packages') {
          
          steps {
            sh 'npm install'
          }
        } 
             stage('Unit Tests') {
               environment {
                 CI=true
                 //npm_config_prefix='frontend'
                 JEST_JUNIT_OUTPUT_DIR='../reports'
                 JEST_JUNIT_OUTPUT_NAME='frontend.xml'
               }
      steps {
        sh  'npm test prefix=frontend'
        junit 'reports/frontend.xml'
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