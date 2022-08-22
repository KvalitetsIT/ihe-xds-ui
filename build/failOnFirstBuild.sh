#!/bin/sh

echo "${GITHUB_REPOSITORY}"
echo "${DOCKER_SERVICE}"
if [ "${GITHUB_REPOSITORY}" != "kvalitetsit/ihe-xds" ] && [ "${DOCKER_SERVICE}" = "kvalitetsit/ihe-xds" ]; then
  echo "Please run setup.sh REPOSITORY_NAME"
  exit 1
fi
