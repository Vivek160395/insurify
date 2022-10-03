FROM openjdk:11
ADD ./target/insurance-service-0.0.1-SNAPSHOT.jar /usr/src/insurance-service-0.0.1-SNAPSHOT.jar
WORKDIR usr/src
ENTRYPOINT ["java","-jar", "insurance-service-0.0.1-SNAPSHOT.jar"]