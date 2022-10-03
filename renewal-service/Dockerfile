FROM openjdk:11
ADD ./target/renewal-service-0.0.1-SNAPSHOT.jar /usr/src/renewal-service-0.0.1-SNAPSHOT.jar
WORKDIR usr/src
ENTRYPOINT ["java","-jar", "renewal-service-0.0.1-SNAPSHOT.jar"]