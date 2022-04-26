# This Dockerfile uses multi-stage builds as recommended in
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md
#
FROM node:16 AS frontend
WORKDIR /usr/src/app/sd-frontend

COPY ["packages/sd-frontend/package.json", "package.json"]
COPY ["packages/sd-frontend/package-lock.json", "package-lock.json"]

# See: https://stackoverflow.com/questions/18136746/npm-install-failed-with-cannot-run-in-wd
RUN npm ci --unsafe-perm
COPY packages/sd-frontend .
RUN npm run build

FROM node:16 AS backend
WORKDIR /usr/src/app/sd-backend

COPY ["packages/sd-backend/package.json", "package.json"]
COPY ["packages/sd-backend/package-lock.json", "package-lock.json"]

RUN npm ci --production --unsafe-perm

FROM node:16-alpine AS production
WORKDIR /usr/src/app
COPY --from=frontend /usr/src/app/sd-frontend/dist sd-frontend/dist
COPY --from=backend /usr/src/app/sd-backend/node_modules sd-backend/node_modules
COPY . .

EXPOSE 3000

CMD cd backend && node index.js
