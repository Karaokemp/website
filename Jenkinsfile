pipeline {
  agent none 
  triggers {
    pollSCM('* * * * *')
  }
  stages{
    stage('Lint'){
          steps{
            echo "Linting Code...."
       }
     }
     stage('build'){
       environment {
                 CI=true
                 //npm_config_prefix='frontend
                 JEST_JUNIT_OUTPUT_DIR='../reports'
               }
       parallel{
         stage('frontend'){
           agent {
              docker { image 'node:14-alpine' }
           }
           environment {
              SERVICE='frontend'
            }
           /*when {
            changeset 'frontend/**'
          }*/
           stages{
             stage('Install packages') {
          steps {
            dir("${SERVICE}"){
              sh 'npm install'
            }
          }
        }
             stage('Unit Tests') {
          environment {
            JEST_JUNIT_OUTPUT_NAME="${SERVICE}.xml"
          }
      steps {
        dir("${SERVICE}"){
          sh 'npm test'
        }
        junit "reports/${SERVICE}.xml"
      }
    }
    stage('Build Artifacts'){
          steps{
            echo "Building Artifacts"
       }
     }
    stage('Publish Artifacts'){
          steps{
            echo "Publishing Artifacts"
       }
     }
           }
         }
         
         stage('backend'){
           agent {
              docker { image 'node:14-alpine' }
           }
            environment {
              SERVICE='backend'
            }
            /*when {
        changeset 'backend/**'
      }*/
              stages{
            stage('Install packages') {
      /*when {
        changeset 'backend/**'
      }*/
      steps {
        dir("${SERVICE}"){
          sh 'npm install'
        }      
    }
  }
    stage('Unit tests'){
      environment {
          JEST_JUNIT_OUTPUT_NAME="${SERVICE}.xml"
      }
      steps{
        dir("${SERVICE}"){
          sh 'npm test'

        }
        junit "reports/${SERVICE}.xml"
      }
    }
    stage('Build Artifacts'){
          steps{
            echo "Pubbuilding Artifacts"
       }
     }
    stage('Publish Artifacts'){
          steps{
            echo "Publishing Artifacts"
       }
     }
         }
           }
       }
       
     }
     stage('Deploy'){
       parallel{
         stage('Integration'){
           agent any
            steps{
              echo "Deploying to Integration"
           }
         }
         stage('QA'){
           agent any
           steps{
             echo "Deploying to QA"
           }
         }
       }
     }
     stage('Acceptance Tests'){
       agent any
        steps{
            echo 'Testing...'
        }
       }
       stage('Deploy to Production') {
         agent any
            
            steps {
              input {
                  message("Deploy to Production?")
                  ok "Deploy!"
                  submitter "alice,bob"
            }
                echo "${Deployer} deployed to production! He is to blame!"
          }            
        }   
  }  
}