#!/usr/bin/env bash

CONSOLE_NAME="referally-console"
INTEGRATION_NAME="referally-integration"
CONSOLE_SERVER_DIR="/opt/referally_clients/${CONSOLE_NAME}"
INTEGRATION_SERVER_DIR="/opt/referally_clients/${INTEGRATION_NAME}"
SERVICE_NAME="referally-service"

echo -e "########## Deploying config ..."
SSH_USER=""
SSH_KEY_FILE=""
SSH_SERVER=""
SERVER_FULL=${SSH_USER}@${SSH_SERVER}

SQL_USER=""
SQL_PASSWORD=""
SQL_DB_NAME=""

chmod 600 ${SSH_KEY_FILE}

echo -e "########## Server accessing"
mkdir -p ~/.ssh/
touch ~/.ssh/known_hosts
echo -e "Host *\n\tStrictHostKeyChecking no\n\n" >~/.ssh/config

echo -e "########## Create database"
ssh -i ${SSH_KEY_FILE} ${SERVER_FULL} "mysql -u ${SQL_USER} -p${SQL_PASSWORD} -e 'drop database ${SQL_DB_NAME}'"
ssh -i ${SSH_KEY_FILE} ${SERVER_FULL} "mysql -u ${SQL_USER} -p${SQL_PASSWORD} -e 'create database ${SQL_DB_NAME}'"
echo -e "########## Add init data"
ssh -i ${SSH_KEY_FILE} ${SERVER_FULL} mysql -u ${SQL_USER} -p${SQL_PASSWORD} ${SQL_DB_NAME} <referally-data/src/data/create.sql
ssh -i ${SSH_KEY_FILE} ${SERVER_FULL} mysql -u ${SQL_USER} -p${SQL_PASSWORD} ${SQL_DB_NAME} <referally-data/src/data/addTestData.sql

echo -e "########## Clear old builds of '$CONSOLE_NAME'"
ssh -i ${SSH_KEY_FILE} ${SERVER_FULL} "rm -r ..${CONSOLE_SERVER_DIR}/*"
echo -e "########## Copying '$CONSOLE_NAME' to '$SSH_SERVER'"
scp -i ${SSH_KEY_FILE} -r ${CONSOLE_NAME}/build/dist/* ${SERVER_FULL}:${CONSOLE_SERVER_DIR}

echo -e "########## Clear old builds of '$INTEGRATION_NAME'"
ssh -i ${SSH_KEY_FILE} ${SERVER_FULL} "rm -r ..${INTEGRATION_SERVER_DIR}/*"
echo -e "########## Copying '$INTEGRATION_NAME' to '$SSH_SERVER'"
scp -i ${SSH_KEY_FILE} -r ${INTEGRATION_NAME}/build/dist/* ${SERVER_FULL}:${INTEGRATION_SERVER_DIR}

echo -e "########## Copying '$SERVICE_NAME' to '$SSH_SERVER'"
scp -i ${SSH_KEY_FILE} ${SERVICE_NAME}/build/libs/${SERVICE_NAME}.war ${SERVER_FULL}:/opt/tomcat/webapps/${SERVICE_NAME}.war
echo -e "########## restart Tomcat ..."
ssh -i ${SSH_KEY_FILE} ${SERVER_FULL} 'systemctl restart tomcat'
