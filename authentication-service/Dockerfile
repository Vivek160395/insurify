FROM openjdk:11
ADD ./target/authentication-service-0.0.1-SNAPSHOT.jar /usr/src/authentication-service-0.0.1-SNAPSHOT.jar
WORKDIR usr/src
EXPOSE 8086
ENTRYPOINT ["java","-jar", "authentication-service-0.0.1-SNAPSHOT.jar"]