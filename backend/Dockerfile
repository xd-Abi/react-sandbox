FROM node:15.10.0 as ts-compiler

WORKDIR /usr/app

# copy the package files for installation
COPY package*.json ./

# install the necessary packages
RUN npm install --only=production

COPY . ./

CMD ["node", "src/index.js"]