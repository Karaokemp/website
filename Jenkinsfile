#!/usr/bin/env groovy
pipeline {
  agent none
  triggers {
    pollSCM('* * * * *')
  }
  stages{
    stage('Check'){
       agent {
    dockerfile {
        filename 'Dockerfile.agent'
        args '-v /var/run/docker.sock:/var/run/docker.sock'
        args '-v builder_cache:/builder_cache'
    }
}
      steps{
        echo "Put here any step to try..."
      }
    }
     stage('Build'){
       environment {
                 JEST_JUNIT_OUTPUT_DIR='../reports' 
               }
       parallel{
         stage('Frontend'){
            when {
              anyOf {
                changeset "frontend/**"
                changeset "*"
              }
            }
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
              sh "echo '${GIT_COMMIT}' > /builder_cache/FRONTEND_LAST_BUILD"
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
         
         stage('Backend'){
            when {
              anyOf {
                changeset "backend/**"
                changeset "*"
              }
            }
           agent {
    dockerfile {
        filename 'Dockerfile.agent'
        args '-v /var/run/docker.sock:/var/run/docker.sock'
                args '-v backend_cache:/var/jenkins_home/workspace/karaokemp-website_master/backend/node_modules/'
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
            stage('Cloud'){
              agent {
                dockerfile {
                  filename 'Dockerfile.agent'
                  args '-v /var/run/docker.sock:/var/run/docker.sock'
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
       stage('Import Missing Artifacts'){
         
         parallel{
           stage('Frontend'){
              when {
                not {
                  anyOf {
                    changeset "frontend/**"
                    changeset "*"
                  }
                }
               }
              agent {
    dockerfile {
        filename 'Dockerfile.agent'
        args '-v /var/run/docker.sock:/var/run/docker.sock'
        args '-v frontend_cache:/var/jenkins_home/workspace/karaokemp-website_master/frontend/node_modules/'
        args '-v builder_cache:/builder_cache'
    }
}
             steps{
                withAWS(credentials:"aws", region:"eu-central-1"){
                  sh 'aws s3 sync s3://karaokemp-artifacts/karaokemp-website/COMMIT-$(cat /builder_cache/FRONTEND_LAST_BUILD)/frontend \
                      s3://karaokemp-artifacts/karaokemp-website/COMMIT-${GIT_COMMIT}/frontend'
             }
                
                }
           }
           stage('Backend'){
             when {
               not{
                 anyOf {
                  changeset "backend/**"
                  changeset "*"
                }
              }
            }
             steps{
               echo 'BACKEND_LAST_BUILD'
             }
           }
         }
       }
       stage('Deploy') {
         agent any
            
            steps {
              build job: '../website-deployment/master',
              parameters:[string(name: "DEPLOY_COMMIT", value:"${GIT_COMMIT}"), string(name: "ENVIRONMENT", value:"integration")]
            }
        }   
  }  
}