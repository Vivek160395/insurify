FROM openjdk:11
ADD ./target/user-service-0.0.1-SNAPSHOT.jar /usr/src/user-service-0.0.1-SNAPSHOT.jar
WORKDIR usr/src
ENV MONGO_URI=mongodb://localhost:27017/insurifyd
ENTRYPOINT ["java","-jar", "user-service-0.0.1-SNAPSHOT.jar"]