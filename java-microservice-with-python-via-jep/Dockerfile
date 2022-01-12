# Use Amazon Corretto image as builder image
FROM public.ecr.aws/amazoncorretto/amazoncorretto:8 as builder
RUN yum install -y maven
COPY math-service /usr/src/math-service
RUN mvn -f /usr/src/math-service/pom.xml clean package

# Use Amazon Corretto image as base
FROM public.ecr.aws/amazoncorretto/amazoncorretto:8

# Install Python3 and JEP
RUN yum update -y && \
    yum install -y gcc && \
    yum install -y python3-devel && \
    pip3 install numpy && \
    pip3 install wheel && \
    pip3 install jep && \
    yum -y clean all  && \
    rm -rf /var/cache/yum

COPY --from=builder /usr/src/math-service/target/math-service-0.0.1-SNAPSHOT.jar /usr/app/math-service-0.0.1-SNAPSHOT.jar
ENV LD_LIBRARY_PATH=/usr/local/lib64/python3.7/site-packages/jep/

ENTRYPOINT ["java", "-Djava.library.path=/usr/local/lib64/python3.7/site-packages/jep/", "-jar", "/usr/app/math-service-0.0.1-SNAPSHOT.jar"]