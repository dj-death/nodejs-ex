#!/bin/sh

APP_NAME="SSE"


################################
#      STOP PM2 INSTANCE	   #
################################
pm2 stop "$APP_NAME"