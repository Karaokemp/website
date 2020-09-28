pipeline {
  agent none
  triggers {
    pollSCM('* * * * *')
  }
  stages{
    stage('Lint'){
          steps{
            echo "Linting Code..."
       }
     }
     stage('build'){
       environment {
                 JEST_JUNIT_OUTPUT_DIR='../reports'
               }
       parallel{
         stage('frontend'){
                 agent {
    dockerfile {
        filename 'Dockerfile.agent'
        //label 'my-defined-label'
        args '-v /var/run/docker.sock:/var/run/docker.sock'
    }
}
           environment {
              SERVICE='frontend'
            }
           /*when {
            //changeset "frontend/**"
            changeset "*"
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
          sh 'npm run test:ci'
        }
        junit "reports/${SERVICE}.xml"
      }
    }

    stage("Create S3 Artifacts"){
      steps{
         dir("${SERVICE}"){
              sh 'npm run build'
              archiveArtifacts artifacts: "build/**/*.*", fingerprint: true
              //s3Upload( entries:{bucket:"karaokemp-artifacts/karaokemp-website",sourceFile:"build/**/*.*"})

            }
      }
    }
    stage('Create Docker image'){
          steps{
            dir("${SERVICE}"){
                script{
                  docker.withRegistry( '', 'dockerhub'){
                      def image = docker.build("dreckguy/karaokemp-website-${SERVICE}")
                      image.push('latest')
                      image.push("${GIT_COMMIT}")

    }
                }
            }
       }
     }
           }
         }
         
         stage('backend'){
           agent {
    dockerfile {
        filename 'Dockerfile.agent'
        //label 'my-defined-label'
        args '-v /var/run/docker.sock:/var/run/docker.sock'
    }
}
            environment {
              SERVICE='backend'
            }

            /*when {
            //changeset "backend/**"
            changeset "*"
          }*/
              stages{
            stage('Install packages') {
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
          sh 'npm run test:ci'

        }
        junit "reports/${SERVICE}.xml"
      }
    }
    stage('Create Docker image'){
          steps{
            dir("${SERVICE}"){
                script{
                  docker.withRegistry( '', 'dockerhub'){
                      def image = docker.build("dreckguy/karaokemp-website-${SERVICE}")
                      image.push('latest')
                      image.push("${GIT_COMMIT}")

    }
                }
            }
       }
     }
         }
           }
            stage('Cloud services'){
                 agent {
    dockerfile {
        filename 'Dockerfile.agent'
        //label 'my-defined-label'
        args '-v /var/run/docker.sock:/var/run/docker.sock'
    }
}
          
           stages{
             stage('s3-upload') {
               environment{
                 SERVICE="youtube-video-upload"
               }
         stages{
           stage("install packages"){
              steps {
            dir("cloud/${SERVICE}"){
              sh 'npm install'
            }
          }
           }
          stage("run"){
              steps {
            dir("cloud/${SERVICE}"){
              sh 'npm start'
            }
          }
           }
           stage ('push artifact') {
            steps {
                zip zipFile: "${SERVICE}.zip", archive: true, dir:"cloud/${SERVICE}"
                archiveArtifacts artifacts: "${SERVICE}.zip", fingerprint: true
            }
        }
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
              build job: '../website-deployment/master'


            }
        }   
  }  
}