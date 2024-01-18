FROM node:lts AS builder
WORKDIR /sbih

COPY . .

RUN npm install

FROM node:lts AS runtime
WORKDIR /sbih

COPY --from=builder /sbih .

# Create volumes for persistent data
VOLUME /sbih/img

ENV HOST=0.0.0.0
ENV port=8069
EXPOSE 8069
CMD node index.js