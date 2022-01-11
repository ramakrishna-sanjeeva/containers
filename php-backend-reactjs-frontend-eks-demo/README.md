# php-backend-reactjs-frontend-eks-demo

Demonstrates a sample container implementation with PHP based back-end and ReactJS based front-end.
The PHP back-end serves a JSON document which is rendered by the ReactJS based front-end project.

Build the container images and push the images to a Docker/ECR registry. Update the deployment definitions to reflect the Docker/ECR registry URI's in the *-deployment.yaml for both the modules below. 

    docker build -t php-backend php-backend/
    docker build -t reactjs-frontend reactjs-frontend/consuming-restful-api-in-react/

The deployment model assumed NLB+Nginx Ingress used for the application ingress and is deployed in a namespace with name "php-reactjs". 

To create the namespace, execute the following command.

    kubectl create ns php-reactjs

All K8S resource definitions are available in folder gitops-k8s-deployment. Update the php-backend-deployment.yaml by setting the right Docker/ECR image repository URI. Deploy the back-end module. 

    kubectl apply -f php-backend-deployment.yaml -n php-reactjs
    kubectl apply -f php-backend-service.yaml -n php-reactjs
    kubectl apply -f php-backend-nginx-ingress.yaml -n php-reactjs

Post deployment, verify the verify the php back-end deployment is working properly by curling against the service endpoint. This should return a JSON
document with HTTP response code 200.

    curl --location --request GET 'http://<NLB-DNS-Name>/php-backend/contacts.php'

Update the reactjs-frontend-deployment.yaml by setting the right Docker/ECR image repository URI and replace the environment variable BACKED_ENDPOINT by setting the NLB DNS name. Deploy the front-end module. 

    kubectl apply -f reactjs-frontend-deployment.yaml -n php-reactjs
    kubectl apply -f reactjs-frontend-service.yaml -n php-reactjs
    kubectl apply -f reactjs-frontend-nginx-ingress.yaml -n php-reactjs

Verify you are able to access the application at the following URL. The UI will display a list of address information by fetching the data from back-end API. 

    http://<NLB-DNS-Name>



