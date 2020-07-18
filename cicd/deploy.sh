chmod -R 775 ./*
mkdir -p build

CONSOLE_NAME="referally-console"
INTEGRATION_NAME="referally-integration"
SERVICE_NAME="referally-service"

# To increase safety, you could define this variables as environmental variables on gitlab
SSH_USER="root"
SSH_KEY="cicd/id_rsa.priv"
SSH_SERVER="46.101.148.211"

echo -e "copying application $CONSOLE_NAME to $SSH_SERVER"
scp -i ${SSH_KEY} ${CONSOLE_NAME}/build/${CONSOLE_NAME}.zip ${SSH_USER}@${SSH_SERVER}:/tmp/${CONSOLE_NAME}.zip

echo -e "copying application $INTEGRATION_NAME to $SSH_SERVER"
scp -i ${SSH_KEY} ${INTEGRATION_NAME}/build/${INTEGRATION_NAME}.zip ${SSH_USER}@${SSH_SERVER}:/tmp/${INTEGRATION_NAME}.zip

echo -e "copying application $SERVICE_NAME to $SSH_SERVER"
scp -i ${SSH_KEY} ${SERVICE_NAME}/libs/build/${SERVICE_NAME}.war ${SSH_USER}@${SSH_SERVER}:/tmp/${SERVICE_NAME}.war
