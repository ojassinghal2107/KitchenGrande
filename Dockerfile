# Stage 1: Build the jar using Maven
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
# Copy the pom.xml and source code into the container
COPY . .
# Build the application
RUN mvn clean package -DskipTests

# Stage 2: Run the jar
FROM openjdk:17-jdk-slim
WORKDIR /app
# Copy the jar from the target folder of the build stage
# We use a wildcard (*) so it finds your jar regardless of the version number
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]