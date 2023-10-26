#! /bin/sh
echo "AWS Region is $AWS_DEFAULT_REGION"
echo "S3 location is $S3_NGINX_CONF_PATH"
aws s3 cp $S3_NGINX_CONF_PATH/certs/server.key /etc/nginx/conf.d/
aws s3 cp $S3_NGINX_CONF_PATH/certs/server.crt /etc/nginx/conf.d/
aws s3 cp $S3_NGINX_CONF_PATH/certs/ca.crt /etc/nginx/conf.d/
aws s3 cp $S3_NGINX_CONF_PATH/conf/nginx.conf /etc/nginx/nginx.conf
echo "Starting the Nginx server"
nginx -g 'daemon off;'