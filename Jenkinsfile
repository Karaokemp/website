pipeline {
  triggers {
    pollSCM('* * * * *')
  }
  agent any
  stages{
     stage('build'){
       environment {
                 CI=true
                 //npm_config_prefix='frontend
                 JEST_JUNIT_OUTPUT_DIR='../reports'
               }
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
               environment {
                  JEST_JUNIT_OUTPUT_NAME='frontend.xml'
               }
      steps {
        sh  'npm test --prefix=frontend'
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
    stage('Unit tests'){
      environment {
        JEST_JUNIT_OUTPUT_NAME='backend.xml'
      }

      steps{
        sh 'npm test --prefix backend'
        junit 'reports/backend.xml'
      }
    }
         }
           }
       }
     }
     stage('Publish Artifacts'){
       steps{
         echo "Publishing Artifacts"
       }
     }
     stage('Deploy'){
       parallel{
         stage('Integration'){
           steps{
             echo "Deploying to Integration"
           }
         }
         stage('QA'){
           steps{
             echo "Deploying to QA"
           }
         }
       }
     }
     stage('Acceptance Tests'){
        steps{
            echo 'Testing...'
        }
       }  
  }   
}