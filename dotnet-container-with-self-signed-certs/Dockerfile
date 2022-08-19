# 1 - Build
FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /app
 
RUN mkdir self-signed-certs \
    && dotnet dev-certs https -ep self-signed-certs/aspnetapp.pfx -p pass@2022
COPY *.sln .
COPY HelloWorld HelloWorld
 
RUN dotnet restore
RUN dotnet publish -c Release -o out

# 2 - Runtime
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app 
COPY --from=build /app/out ./
COPY --from=build /app/self-signed-certs/aspnetapp.pfx .
ENV ASPNETCORE_URLS="https://+;http://+"
ENV ASPNETCORE_HTTPS_PORT=443
ENV ASPNETCORE_HTTP_PORT=80
ENV ASPNETCORE_Kestrel__Certificates__Default__Password="mypass123"
ENV ASPNETCORE_Kestrel__Certificates__Default__Path=/app/aspnetapp.pfx
ENTRYPOINT ["dotnet", "HelloWorld.dll"]
