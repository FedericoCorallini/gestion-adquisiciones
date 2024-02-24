FROM maven:3.8.5-openjdk-17

COPY . /app/back
WORKDIR /app/back

ENV MYSQL_ROOT_PASSWORD=12345678
ENV MYSQL_DATABASE=adquisiciones
ENV MYSQL_PASSWORD=12345678
ENV DB_USERNAME=root

EXPOSE 3310 8080

CMD ["java", "-jar", "/app/back/target/adquisiciones-0.0.1-SNAPSHOT.jar"]