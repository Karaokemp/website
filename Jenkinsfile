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
        sh 'cat /builder_cache/BACKEND_LAST_BUILD' 
        sh 'docker tag dreckguy/karaokemp-website-backend:$(cat /builder_cache/BACKEND_LAST_BUILD) dreckguy/karaokemp-website-backend:"${GIT_COMMIT}"'

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
                args '-v builder_cache:/builder_cache'

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
              sh "echo '${GIT_COMMIT}' > /builder_cache/BACKEND_LAST_BUILD"
            sh 'cat /builder_cache/BACKEND_LAST_BUILD'
          }
     }
         }
           }
            stage('Cloud'){
               when {
              anyOf {
                changeset "cloud/**"
                changeset "*"
              }
            }
              agent {
                dockerfile {
                  filename 'Dockerfile.agent'
                  args '-v /var/run/docker.sock:/var/run/docker.sock'
                  args '-v cloud_cache:/var/jenkins_home/workspace/karaokemp-website_master/cloud/node_modules/'
                  args '-v builder_cache:/builder_cache'


    }
}

                 
stages{
  stage("compile"){
    steps{
      dir('cloud'){
        sh 'npm install'
        sh 'npm run build'
      }
    }
  }
  stage("Package changes"){
    steps{
             dir('cloud'){
               withAWS(credentials:"aws", region:"eu-central-1"){
                 sh "sam package \
                    --template-file template.yaml \
                    --output-template-file packaged.yaml \
                    --s3-bucket karaokemp-artifacts \
                    --s3-prefix karaokemp-website/COMMIT-${GIT_COMMIT}/cloud-services"
                    s3Upload(includePathPattern:"packaged.yaml",bucket:"karaokemp-artifacts/karaokemp-website/COMMIT-${GIT_COMMIT}/cloud-services")
                    s3Upload(includePathPattern:"samconfig.toml",bucket:"karaokemp-artifacts/karaokemp-website/COMMIT-${GIT_COMMIT}/cloud-services")
                    archiveArtifacts artifacts: "packaged.yaml"
                    archiveArtifacts artifacts: "samconfig.toml"
                    sh "echo '${GIT_COMMIT}' > /builder_cache/CLOUD_LAST_BUILD"
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
            stage('Cloud'){
              when {
                not {
                  anyOf {
                    changeset "cloud/**"
                    changeset "*"
                  }
                }
               }
              agent {
    dockerfile {
        filename 'Dockerfile.agent'
        args '-v /var/run/docker.sock:/var/run/docker.sock'
        args '-v builder_cache:/builder_cache'
    }
}
             steps{
                withAWS(credentials:"aws", region:"eu-central-1"){
                  sh 'aws s3 sync s3://karaokemp-artifacts/karaokemp-website/COMMIT-$(cat /builder_cache/CLOUD_LAST_BUILD)/cloud-services \
                      s3://karaokemp-artifacts/karaokemp-website/COMMIT-${GIT_COMMIT}/cloud-services'
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
             agent {
    dockerfile {
        filename 'Dockerfile.agent'
        args '-v /var/run/docker.sock:/var/run/docker.sock'
        args '-v builder_cache:/var/jenkins_home/workspace/karaokemp-website_master/backend/builder_cache/'
    }
}
             steps{
               echo 'use last built backend...'
               sh 'docker pull dreckguy/karaokemp-website-backend:$(cat /builder_cache/BACKEND_LAST_BUILD)'
               sh 'docker tag dreckguy/karaokemp-website-backend:$(cat /builder_cache/BACKEND_LAST_BUILD) dreckguy/karaokemp-website-backend:"${GIT_COMMIT}"'
               sh "docker push dreckguy/karaokemp-website-backend:${GIT_COMMIT}"
             }
            }
           }
         }
          stage('Integration') {
         agent any
            
            steps {
              build job: '../web-deployment/master',
              parameters:[string(name: "DEPLOY_COMMIT", value:"${GIT_COMMIT}"), string(name: "ENVIRONMENT", value:"integration")]
            }
        }
        stage('Production'){
          agent any
           steps {
              build job: '../web-deployment/master',
              parameters:[string(name: "DEPLOY_COMMIT", value:"${GIT_COMMIT}"), string(name: "ENVIRONMENT", value:"production")]
            }
        }
       }
}