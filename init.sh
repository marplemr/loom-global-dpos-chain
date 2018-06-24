#!/bin/bash
echo "updating linux"
sudo apt-get update
sudo apt -y install curl unzip make git

echo "installing go"
curl -O https://dl.google.com/go/go1.10.2.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.10.2.linux-amd64.tar.gz

echo "sourcing go"
echo -e "\nexport PATH=\$PATH:/usr/local/go/bin:~/gopath/bin" >>  ~/.bash_profile
. ~/.bash_profile

echo "installing protobuff"
export PROTOBUF_VERSION=3.5.1
curl -OL https://github.com/google/protobuf/releases/download/v${PROTOBUF_VERSION}/protoc-${PROTOBUF_VERSION}-linux-x86_64.zip
sudo unzip -o protoc-${PROTOBUF_VERSION}-linux-x86_64.zip -d /usr/local
sudo chmod +x /usr/local/bin/protoc

echo "installing go deps"
mkdir -p ~/gopath/bin
export GOPATH=~/gopath
curl https://raw.githubusercontent.com/golang/dep/master/install.sh > install.sh
. ./install.sh

echo "installing loom"
curl -OL https://storage.googleapis.com/private.delegatecall.com/loom/linux/build-186/loom
chmod +x loom

export GOPATH=~/gopath
export PATH=$GOPATH/bin:$PATH
./loom spin weave-blueprint
cd blueprint
export GOPATH=$GOPATH:`pwd`
make deps
make
cd build

../../loom init
cp ../genesis.example.json genesis.json

../../loom run
