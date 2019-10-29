#!/bin/bash

sed -ir "s/DOCKER_ENV_SSL_ENABLE/$SSL_ENABLE/gm" /usr/share/nginx/html/app.js
sed -ir "s/DOCKER_ENV_INTERCOM_APP_ID/$INTERCOM_APP_ID/gm" /usr/share/nginx/html/app.js

nginx -g "daemon off;"
