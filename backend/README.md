# README #

Make sure that you have docker-compose installed. Then run `docker-compose build` and then `docker-compose up` to start the database and the backend.

# Commands
docker ps -a
lldocker exec -it aeb47c66a28c bash
psql -U TIE tie-DB

; at the end of sql query

\dt -> Shows tables
\d table_name