# dotnet-container-with-self-signed-certs

Certain use cases of ASP DotNet Core project requires end to end SSL and as such the DotNet application needs to expose HTTPS endpoint. In these cases, we leverage a self-signed certificate to be generated and ASP DotNet Core's Kestrel Web Server configuration to enable the HTTPS endpoint. 

The Dockerfile script provides a reference implementation for performing the same as part of the Docker build process. It
leverages multi-stage build by including the build step to compile the project and generate the self-signed certificate
and then include the build artifacts in the runtime image. 

**Update the password**

