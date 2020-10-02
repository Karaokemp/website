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
              withAWS(credentials:"aws", region:"eu-central-1"){
                  s3Upload(workingDir:"build",includePathPattern:"**",bucket:"karaokemp-artifacts/karaokemp-website/COMMIT-${GIT_COMMIT}/${SERVICE}")
              }
            }
      }
    }
    /*stage('Create Docker image'){
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
     }*/
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

            when {
            changeset "backend/**"
          }
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
    /*stage('Create Docker image'){
          when{false}
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
     }*/
         }
           }
            stage('Cloud services'){
              environment{
                SERVICE='cloud-functions'
              }
                 agent {
    dockerfile {
        filename 'Dockerfile.agent'
        //label 'my-defined-label'
        args '-v /var/run/docker.sock:/var/run/docker.sock'
    }
}
          
           stages{
             stage('youtube-video-upload') {
               environment{
                 FUNCTION="youtube-video-upload"
               }
         stages{
           stage("install packages"){
              steps {
            dir("${SERVICE}/${FUNCTION}"){
              sh 'npm install'
            }
          }
           }
          stage("run"){
              steps {
            dir("${SERVICE}/${FUNCTION}"){
              sh 'npm start'
            }
          }
           }
           stage ('push artifact') {
            steps {
                zip zipFile: "${FUNCTION}.zip", archive: true, dir:"${SERVICE}/${FUNCTION}"
                withAWS(credentials:"aws", region:"eu-central-1"){
                    s3Upload(file:"${FUNCTION}.zip",bucket:"karaokemp-artifacts/karaokemp-website/COMMIT-${GIT_COMMIT}/${SERVICE}")
                }
                sh "rm -rf ${FUNCTION}.zip"
                sh 'printenv'
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
              build job: '../website-deployment/master', parameters:[string(name: "DEPLOY_COMMIT", value:"${GIT_COMMIT}")]
            }
        }   
  }  
}