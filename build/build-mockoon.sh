#!/bin/sh

TAG=$1

if [ -z "$TAG" ]; then
  echo "TAG variable not set."
  exit 1
fi

docker build ./react-app/mockoon -t $TAG
