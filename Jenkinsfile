pipeline 
{
    agent any
    environment
    {
        DOCKER_IMAGE_NAME = "procstar/nodejs-alpine"
    }
    stages 
    {
        stage('Build') 
        {
            steps 
            {
                echo 'Running build automation...'
                echo 'Nothing to build, just showing this for information only..'
            }
        }
        stage('Build Docker Image') 
        {
            when 
            {
                branch 'master'
            }
            steps 
            {
                script 
                {
                    app = docker.build("procstar/nodejs-alpine")
                }
            }
        }
        stage('Push Docker Image') 
        {
            when 
            {
                branch 'master'
            }
            steps 
            {
                script
                {
                    /* Finally, we'll push the image with two tags:
                    * First, the incremental build number from Jenkins
                    * Second, the 'latest' tag. */
                    withCredentials([usernamePassword( credentialsId: 'docker_hub_login', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) 
                    {
                        docker.withRegistry('', 'docker_hub_login') 
                        {
                            sh "docker login -u ${USERNAME} -p ${PASSWORD}"
                            app.push("${env.BUILD_NUMBER}")
                            app.push("latest")
                        }
                    }
                }
            }
        }
        stage('DeployToProduction') 
        {
            when 
            {
                branch 'master'
            }
            steps 
            {         
                kubernetesDeploy (
                    kubeconfigId: 'kubeconfig',
                    configs: 'nodejs-alpine-kube.yml',
                    enableConfigSubstitution: true
                )
            }
        }
    }
}
