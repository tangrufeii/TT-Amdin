FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /build
COPY tt-admin-backend/ tt-admin-backend/
RUN mvn -f tt-admin-backend/pom.xml -pl tt-admin-server -am -DskipTests package

FROM eclipse-temurin:21-jre
WORKDIR /app
RUN mkdir -p /app/resources/plugins /app/resources/temp /var/log/tt-admin
COPY --from=build /build/tt-admin-backend/tt-admin-server/target/*.jar /app/app.jar
EXPOSE 8080
ENV TZ=Asia/Shanghai
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
