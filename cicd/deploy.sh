#!/usr/bin/env bash

CONSOLE_NAME="referally-console"
INTEGRATION_NAME="referally-integration"
CLIENTS_SERVER_DIR="/opt/referally_clients/"
SERVICE_NAME="referally-service"

SSH_USER="root"
SSH_KEY_FILE="cicd/id_rsa"
SSH_SERVER="46.101.148.211"
SERVER_FULL=${SSH_USER}@${SSH_SERVER}

chmod 600 ${SSH_KEY_FILE}

mkdir -p ~/.ssh/
touch ~/.ssh/known_hosts
echo -e "Host *\n\tStrictHostKeyChecking no\n\n" >~/.ssh/config

echo -e "copying application $CONSOLE_NAME to $SSH_SERVER"
ssh -i ${SSH_KEY_FILE} ${SERVER_FULL} 'rm -r ../opt/referally_clients/referally-console/*'
scp -i ${SSH_KEY_FILE} -r ~/${CONSOLE_NAME}/build/dist ${SERVER_FULL}:${CLIENTS_SERVER_DIR}/${CONSOLE_NAME}

echo -e "copying application $INTEGRATION_NAME to $SSH_SERVER"
ssh -i ${SSH_KEY_FILE} ${SERVER_FULL} 'rm -r ../opt/referally_clients/referally-integration/*'
scp -i ${SSH_KEY_FILE} -r ~/${INTEGRATION_NAME}/build/dist ${SERVER_FULL}:${CLIENTS_SERVER_DIR}/${INTEGRATION_NAME}

echo -e "copying application $SERVICE_NAME to $SSH_SERVER"
scp -i ${SSH_KEY_FILE} ${SERVICE_NAME}/build/libs/${SERVICE_NAME}.war ${SERVER_FULL}:/opt/tomcat/webapps/${SERVICE_NAME}.war
