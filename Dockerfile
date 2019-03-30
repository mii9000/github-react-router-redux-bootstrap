# build off node
FROM node AS build

# TODO pass token
ENV REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN=${TOKEN}

# change to app dir
WORKDIR /app

# copy everything inside the container with exclusions of dockerignore
COPY . ./

# install packages
RUN npm install

# run test without watch mode
RUN npm run test:nowatch

# create dist build
RUN npm run build

# get nginx
FROM nginx AS server

# copy dist build to serve from nginx
COPY --from=build /app/build /usr/share/nginx/html
