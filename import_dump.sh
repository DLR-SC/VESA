#!/bin/sh

# Wait until ArangoDB is ready
until arangosh --server.endpoint tcp://arangodb:8529 \
               --server.username root \
               --server.password "$ARANGO_ROOT_PASSWORD" \
               --javascript.execute-string 'db._version();' >/dev/null 2>&1; do
  echo 'Waiting for ArangoDB...'
  sleep 5
done

echo 'Restoring database...'

# Restore the database
arangorestore --server.endpoint tcp://arangodb:8529 \
              --server.username root \
              --server.password "$ARANGO_ROOT_PASSWORD" \
              --input-directory arango-dump \
              --create-database true \
              --server.database "$ARANGO_DB_NAME"
