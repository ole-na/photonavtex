FROM openjdk:15

MAINTAINER Olena Tretyak <olena.tretyak@yahoo.de>

ADD backend/target/photoNavTex.jar app.jar

CMD [ "sh", "-c", "java -Dserver.port=$PORT -Dspring.data.mongodb.uri=$MONGO_DB_URI  -jar /app.jar" ]