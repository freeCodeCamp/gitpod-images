# Gitpod Dockerfile have non standard format for tags, we use latest and then we use our own tag
FROM gitpod/workspace-base:latest
USER gitpod

# Dazzle does not rebuild a layer until one of its lines are changed. Increase this counter to rebuild this layer.
ENV TRIGGER_REBUILD=1

ARG MONGOSH_VERSION=1.8.0
ARG MONGODB_VERSION=6.0.4
ARG UBUNTU_VERSION=ubuntu2204
ARG NODE_VERSION=18
ARG NVM_VERSION=0.39.3
ARG PNPM_VERSION=8

RUN echo "Installing MongoDB $MONGODB_VERSION and MongoSH $MONGOSH_VERSION"

# Install MongoDB Shell aka MongoSH (was part of Mongo 5, but, is separate now)
RUN mkdir -p /tmp/mongosh && \
  cd /tmp/mongosh && \
  wget -qOmongosh.tgz https://downloads.mongodb.com/compass/mongosh-$MONGOSH_VERSION-linux-x64.tgz && \
  tar xf mongosh.tgz && \
  cd mongosh-* && \
  sudo cp bin/* /usr/local/bin/ && \
  rm -rf /tmp/mongosh

# Install MongoDB
# Source: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu-tarball/#install-mongodb-community-edition
RUN mkdir -p /tmp/mongodb && \
  cd /tmp/mongodb && \
  wget -qOmongodb.tgz https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-$UBUNTU_VERSION-$MONGODB_VERSION.tgz && \
  tar xf mongodb.tgz && \
  cd mongodb-* && \
  sudo cp bin/* /usr/local/bin/ && \
  rm -rf /tmp/mongodb && \
  sudo mkdir -p /data/db && \
  sudo chown gitpod:gitpod -R /data/db

# from https://www.gitpod.io/docs/introduction/languages/javascript#node-versions
# install nvm
RUN bash -c 'wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v$NVM_VERSION/install.sh | bash \
    && source $HOME/.nvm/nvm.sh && nvm install $NODE_VERSION \
    && nvm use $NODE_VERSION && nvm alias default $NODE_VERSION \
    && npm i -g pnpm@$PNPM_VERSION'

RUN echo "nvm use default &>/dev/null" >> ~/.bashrc.d/51-nvm-fix
