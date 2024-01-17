FROM node:lts AS runtime
WORKDIR /sbih

COPY . .

RUN npm install

ENV HOST=0.0.0.0
ENV port=8069
EXPOSE 8069
CMD node index.js