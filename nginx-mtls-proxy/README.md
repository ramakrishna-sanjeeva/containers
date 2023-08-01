# Deploying application on Amazon ECS with MTLS configuration enabled via Nginx Proxy

Using Nginx as proxy to perform MTLS
Nginx container initialization routine expects the server, client certificates and Nginx configuration file to be available in S3 bucket. Configure the following environment variables

    S3 folder structure
    /nginx-mtls-config
        /conf
            nginx.conf
        /certs
            server.key
            server.crt
            ca.crt

S3_NGINX_CONF_PATH - Path to the folder in S3 which has the certificates and configuration. Ex: S3_NGINX_CONF_PATH = s3://<S3-Bucket>/nginx-mtls-config
AWS_DEFAULT_REGION - AWS region of deployment

Solution Architecture Reference

[![ArchitectureRef](/nginx-mtls-proxy/images/architecture.png 'Architecture Ref')]