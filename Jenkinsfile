// test comment
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

        stage("deploy to EC2") {
            steps {
                echo "deploying web app..."
                script {
                    def shellCmd = "bash ./server-cmds.sh hyrollproctor/my-repo:${IMAGE_NAME}"
                    def ec2Instance = "ec2-user@54.241.85.48"

                    sshagent(['ec2-server-key']) {
                        sh "scp -o StrictHostKeyChecking=no server-cmds.sh ${ec2Instance}:/home/ec2-user"
                        sh "scp -o StrictHostKeyChecking=no docker-compose.yaml ${ec2Instance}:/home/ec2-user"
                        sh "ssh -o StrictHostKeyChecking=no ${ec2Instance} ${shellCmd}"
                    }
                }
            }
        }
    }
}