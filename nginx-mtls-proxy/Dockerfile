FROM nginx:1.25.1-bookworm
RUN apt-get update && apt-get install -y awscli \
 && rm -rf /var/lib/apt/lists/*
COPY initialize.sh /initialize.sh
RUN chmod +x /initialize.sh
ENTRYPOINT ["/initialize.sh"]
CMD ["nginx", "-g", "daemon off;"]