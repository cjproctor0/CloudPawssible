pipeline {
    agent any

    stages {
        stage("build image") {
            steps {
                echo "building web app docker image..."
                withCredentials([usernamePassword(credentialsId: 'docker-hub-repo', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                    sh 'docker build -t hyrollproctor/my-repo:webapp-1.1 .'
                    sh "echo $PASS | docker login -u $USER --password-stdin"  // may need docker host if using ECR in future
                    sh 'docker push hyrollproctor/my-repo:webapp-1.1'
                }
            }
        }

        stage("test") {
            steps {
                echo "testing web app..."
            }
        }

        stage("deploy") {
            steps {
                echo "deploying web app..."
            }
        }
    }
}