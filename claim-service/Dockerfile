FROM openjdk:11
ADD ./target/claim-service-0.0.1-SNAPSHOT.jar /usr/src/claim-service-0.0.1-SNAPSHOT.jar
WORKDIR usr/src
ENTRYPOINT ["java","-jar", "claim-service-0.0.1-SNAPSHOT.jar"]