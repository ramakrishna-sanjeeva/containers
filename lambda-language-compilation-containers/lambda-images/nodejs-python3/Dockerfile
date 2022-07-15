FROM public.ecr.aws/lambda/nodejs:16
LABEL maintainer="RamaKrishnaSanjeeva" 

RUN yum install -y python3 \
    bash \
    && yum clean all \
  	&& rm -rf /var/cache/yum

# Copy function code
COPY app.js ${LAMBDA_TASK_ROOT}

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "app.handler" ]