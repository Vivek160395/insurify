FROM openjdk:11
ADD ./target/purchase-insurance-service-0.0.1-SNAPSHOT.jar /usr/src/purchase-insurance-service-0.0.1-SNAPSHOT.jar
WORKDIR usr/src
ENV MONGO_URI=mongodb://localhost:27017/customer_insurance_db
ENTRYPOINT ["java","-jar", "purchase-insurance-service-0.0.1-SNAPSHOT.jar"]