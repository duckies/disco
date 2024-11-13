FROM oven/bun:latest AS build

WORKDIR /app

COPY . .
RUN bun install  --frozen-lockfile --production
RUN bun --filter '@repo/bot' build

FROM gcr.io/distroless/base-debian12
COPY --from=build /app/dist/bot /

ENTRYPOINT ["/bot"]