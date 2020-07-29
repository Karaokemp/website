pipeline {
  triggers {
    pollSCM('* * * * *')
  }
  agent any
  stages{
     stage('build'){
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
                 CI=true
                 //npm_config_prefix='frontend
                 JEST_JUNIT_OUTPUT_DIR='../reports'
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
      steps{
        echo "Passed?"
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
        matrix {
    axes {
        axis {
            name 'PLATFORM'
            values 'linux', 'mac', 'windows'
        }
        axis {
            name 'BROWSER'
            values 'chrome', 'edge', 'firefox', 'safari'
        }
        axis {
            name 'ARCHITECTURE'
            values '32-bit', '64-bit'
        }
    }
    stages{
      stage('try'){
        steps{
           echo "Do Build for ${PLATFORM} ${ARCHITECTURE} - ${BROWSER}"
        }
      }
    }
}
       }  
  }   
}