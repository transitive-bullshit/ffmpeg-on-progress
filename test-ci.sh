#!/bin/bash

# Stop on error
set -e

# Install dependencies

echo travis_fold:start:Dependencies

wget http://johnvansickle.com/ffmpeg/builds/ffmpeg-git-64bit-static.tar.xz
tar xf ffmpeg-git-64bit-static.tar.xz

mkdir -p $HOME/bin
cp ffmpeg-git-*-static/{ffmpeg,ffprobe,ffserver} $HOME/bin
cp ffmpeg-git-*-static/{ffmpeg,ffprobe} $(pwd)

export PATH=$(pwd)/bin:$PATH

echo travis_fold:end:Dependencies

# Install nvm if needed

echo travis_fold:start:nvm

if [ ! -d ~/.nvm ]; then
	wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.6.1/install.sh | sh
fi
source ~/.nvm/nvm.sh
nvm install $NODE_VERSION

echo travis_fold:end:nvm

# Print versions

echo travis_fold:start:Versions

echo "node version: $(node --version)"
echo "npm version: $(npm --version)"
echo "yarn version: $(yarn --version)"
echo "ffmpeg version: $(ffmpeg -version)"

echo travis_fold:end:Versions

# Install dependencies
echo travis_fold:start:npm-install

yarn install

echo travis_fold:end:npm-install

# Run tests
yarn test
