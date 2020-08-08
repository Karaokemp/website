pipeline {
  agent none 
  triggers {
    pollSCM('* * * * *')
  }

  parameters {
                string(
                    name: 'branch',
                    defaultValue: 'master',
                    description: 'Branch of code to be deployed'
                )
                choice(
                    name: 'service',
                    choices: 'calcs-service\naudits-service\nrate-alerts',
                    description: 'Service to be cleaned'
                )
                choice(
                    name: 'environment',
                    choices: 'uat1\nuat2\nprod',
                    description: 'Environement whose services need cleanup'
                )
     } // close parameters
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
              input{
		message "Press Ok to continue"
		submitter "user1,user2"
	}
                echo "${Deployer} deployed to production! He is to blame!"
          }            
        }   
  }  
}