pipeline {
  triggers {
    pollSCM('* * * * *')
  }
  agent any
  stages{
     stage('build services'){
       parallel{
         stage('build frontend'){
           stages{
             stage('frontend A'){
               steps{
                 echo 'A'
               }
             }
             stage('frontend B'){
               steps{
                 echo 'B'
               }
             }
           }
         }
          /*stages{
           stage('Install frontend packages') {
          when {
            changeset 'frontend/**'
          }
          steps {
            sh 'npm install --prefix frontend'
          }
        } 

         }*/
           stage('build backend'){
             steps{
               echo 'build backend'
             }
            /*stages{
            stage('Install backend packages') {
      when {
        changeset 'backend/**'
      }
      steps {
        sh 'npm install --prefix backend'
      }
    }
         } */
           }
       }
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

  
