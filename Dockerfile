FROM denoland/deno:latest as base

WORKDIR /app

USER deno

COPY . ./
RUN deno cache ./src/app.ts
RUN deno cache ./src/deps.ts

CMD ["run", "--allow-read", "--allow-env", "--allow-net", "./src/app.ts"]