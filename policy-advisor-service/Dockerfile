FROM openjdk:11
ADD ./target/policy-advisor-service-0.0.1-SNAPSHOT.jar /usr/src/policy-advisor-service-0.0.1-SNAPSHOT.jar
WORKDIR usr/src
ENTRYPOINT ["java","-jar", "policy-advisor-service-0.0.1-SNAPSHOT.jar"]