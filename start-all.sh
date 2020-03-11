#!/bin/bash
export MYSQL_USERNAME="brent"
export MYSQL_PASSWORD="JesusLives1!"
export MYSQL_DATABASE="mach2"
export FEATHERS_PORT=3030
export MYSQL_HOSTNAME=localhost  # Docker-compose gets this from the db service, but outside of docker-compose we need to init here.
export MSSQL_USER="sa"
export MSSQL_PASSWORD="S@Tsql@dmin1"
export MSSQL_DATABASE="Kors"
export MSSQL_SERVER="10.30.1.17"
( cd ~/srcnode/App13319/Feat13319 && npm run all)
