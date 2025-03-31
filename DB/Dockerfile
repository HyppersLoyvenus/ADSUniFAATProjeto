FROM postgres:17.4

ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=faat
ENV POSTGRES_DB=Escola

COPY Escola.sql /docker-entrypoint-initdb.d/

EXPOSE 5432