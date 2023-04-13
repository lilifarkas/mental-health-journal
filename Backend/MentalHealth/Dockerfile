FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["MentalHealth.csproj", "./"]
RUN dotnet restore "./MentalHealth.csproj"
COPY . .
RUN dotnet build "MentalHealth.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "MentalHealth.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "MentalHealth.dll"]


## Use an official .NET runtime as a parent image
#FROM mcr.microsoft.com/dotnet/runtime:6.0 AS runtime
#
## Set the working directory to /app
#WORKDIR /app
#
## Copy the csproj file to the container
#COPY *.csproj ./
#
## Restore dependencies
#RUN dotnet restore
#
## Copy the rest of the code to the container
#COPY . .
#
## Build the app
#RUN dotnet publish -c Release -o out
#
## Use an official .NET runtime as a parent image
#FROM mcr.microsoft.com/dotnet/aspnet:6.0
#
## Set the working directory to /app
#WORKDIR /app
#
## Copy the app files from the build stage to the container
#COPY --from=build /app/out .
#
## Set the command to start the app
#CMD ["dotnet", "MentalHealth.dll"]


#FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
#WORKDIR /app
#
#FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
#WORKDIR /src
#COPY ["MentalHealth.csproj", "."]
#RUN dotnet restore "./MentalHealth.csproj"
#COPY . .
#WORKDIR "/src/."
#RUN dotnet build "MentalHealth.csproj" -c Release -o /app/build
#
#FROM build AS publish
#RUN dotnet publish "MentalHealth.csproj" -c Release -o /app/publish /p:UseAppHost=false
#
#FROM base AS final
#WORKDIR /app
#COPY --from=publish /app/publish .
#ENV ASPNETCORE_HTTPS_PORT=443
#ENTRYPOINT ["dotnet", "MentalHealth.dll"]
