# java-microservice-with-python-via-jep Demo

Demonstrates a Java micro-service packaged as container leveraging Spring Boot REST and integrates with Python via JEP (https://github.com/ninia/jep) 

The micro-service exposes a REST API endpoint performing simple addition in Python. 

Build the container image by executing the following command.  

    docker build -t math-service-api-jep .

Run the image on Docker using the following command. 

	docker run -p 8080:8080 math-service-api-jep

Sample Endpoint Invocation

    curl --location --request POST 'http://localhost:8080/performAddition' --header 'Content-Type: application/json' --data-raw '{"a": 100, "b": 200}'
    
    {"c":300}


