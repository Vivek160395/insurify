FROM openjdk:11
ADD ./target/purchase-insurance-service-0.0.1-SNAPSHOT.jar /usr/src/purchase-insurance-service-0.0.1-SNAPSHOT.jar
WORKDIR usr/src
ENTRYPOINT ["java","-jar", "purchase-insurance-service-0.0.1-SNAPSHOT.jar"]