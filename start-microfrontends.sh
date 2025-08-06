#!/bin/bash

# App names and corresponding ports
apps=("host-app" "price-widget" "portfolio-widget" "newsfeed-app" "wallet-app")
ports=(5000 5001 5002 5003 5004)

# Loop over arrays
for i in "${!apps[@]}"; do
  app=${apps[$i]}
  port=${ports[$i]}
  echo "🚀 Starting $app on port $port..."

  (
    cd "$app" || exit
    npm install
    npm run build
    npm run preview -- --port "$port" &
  )
done

echo "✅ All micro frontends are starting in background."
