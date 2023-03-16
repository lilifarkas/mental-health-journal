FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["MentalHealth.csproj", "."]
RUN dotnet restore "./MentalHealth.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "MentalHealth.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MentalHealth.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
RUN apt-get update  && apt-get install wget unzip zip -y
ENV ASPNETCORE_HTTPS_PORT=443
ENTRYPOINT ["dotnet", "MentalHealth.dll"]
