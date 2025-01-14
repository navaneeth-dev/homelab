#!/bin/sh

echo "Setting up primary server 1"
k3sup install --host 192.168.2.162 \
--user ubuntu \
--cluster \
--local-path kubeconfig \
--context default \
--k3s-extra-args "--disable traefik"

echo "Fetching the server's node-token into memory"

export NODE_TOKEN=$(k3sup node-token --host 192.168.2.162 --user ubuntu)

