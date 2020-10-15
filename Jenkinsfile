pipeline {
  agent none
  triggers {
    pollSCM('* * * * *')
  }
  stages{
     stage('Build'){
       environment {
                 JEST_JUNIT_OUTPUT_DIR='../reports'
               }
       parallel{
         stage('Frontend'){
                 agent {
    dockerfile {
        filename 'Dockerfile.agent'
        args '-v /var/run/docker.sock:/var/run/docker.sock'
        args '-v frontend_cache:/var/jenkins_home/workspace/karaokemp-website_master/frontend/node_modules/'
        args '-v builder_cache:/builder_cache'
    }
}

           environment {
              SERVICE='frontend'
            }
            when {
              anyOf {
                changeset "frontend/**"
                changeset "*"
              }
            }
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
            sh "echo 'FRONTEND_LAST_BUILD=COMMIT-${GIT_COMMIT}'>> /builder_cache/metadata.properties"
            sh "source /builder_cache/metadata.properties"
            sh "echo '$FRONTEND_LAST_BUILD'"
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
         
         stage('Backend'){
           agent {
    dockerfile {
        filename 'Dockerfile.agent'
        args '-v /var/run/docker.sock:/var/run/docker.sock'
                args '-v backend_cache:/var/jenkins_home/workspace/karaokemp-website_master/backend/node_modules/'
    }
}
            when {
              anyOf {
                changeset "backend/**"
                changeset "*"
              }
            }
            environment {
              SERVICE='backend'
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
            stage('Cloud'){
                 agent {
    dockerfile {
        filename 'Dockerfile.agent'
        args '-v /var/run/docker.sock:/var/run/docker.sock'
    }
}
 when {
              anyOf {
                changeset "cloud/**"
                changeset "*"
              }
            }
                 
stages{
  stage("Package changes"){
    steps{
             dir('cloud'){
               withAWS(credentials:"aws", region:"eu-central-1"){
                 sh "sam package \
                    --template-file template.yaml \
                    --output-template-file packaged.yaml \
                    --s3-bucket karaokemp-artifacts \
                    --s3-prefix karaokemp-website/${GIT_COMMIT}/cloud-services"
                    s3Upload(includePathPattern:"packaged.yaml",bucket:"karaokemp-artifacts/karaokemp-website/COMMIT-${GIT_COMMIT}/cloud-services")
                    s3Upload(includePathPattern:"samconfig.toml",bucket:"karaokemp-artifacts/karaokemp-website/COMMIT-${GIT_COMMIT}/cloud-services")
                    archiveArtifacts artifacts: "packaged.yaml"
                    archiveArtifacts artifacts: "samconfig.toml"
              }    
             }
           }
  }
}         
         }
       }
     }
       stage('Deploy') {
         agent any
            
            steps {
              build job: '../website-deployment/master', parameters:[string(name: "DEPLOY_COMMIT", value:"${GIT_COMMIT}"), string(name: "ENVIRONMENT", value:"integration")]
            }
        }   
  }  
}
boolean needToBeBuilt(String subProject){
  anyOf {
                changeset "${subProject}/**"
                changeset "*"
              }
}