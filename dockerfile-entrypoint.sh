#!/bin/bash

sed -ir "s/DOCKER_ENV_API_ACCESS_POINT/$API_ACCESS_POINT/gm" /usr/share/nginx/html/app.js
sed -ir "s/DOCKER_ENV_SSL_ENABLE/$SSL_ENABLE/gm" /usr/share/nginx/html/app.js
nginx -g "daemon off;"