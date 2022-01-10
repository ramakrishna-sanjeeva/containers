FROM amazonlinux:2

RUN yum update -y && \
    amazon-linux-extras install -y lamp-mariadb10.2-php7.2 php7.2 && \
    yum install -y httpd && \
    yum install -y python-setuptools && \
    easy_install supervisor==4.2.2 && \ 
    yum -y clean all  && \
    rm -rf /var/cache/yum

COPY supervisord.conf /etc/supervisord.conf
COPY php/* /var/www/html/
CMD ["/usr/bin/supervisord", "-n"]
