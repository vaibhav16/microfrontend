#!/bin/bash

# Load environment variables from .env
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Kill any process using ports from 4999 to 5010
echo "🛑 Killing processes on ports 4999 to 5010..."
for port in {4999..5010}; do
  pid=$(lsof -ti tcp:$port)
  if [ -n "$pid" ]; then
    kill -9 $pid 2>/dev/null
    echo "✔️  Killed process on port $port (PID $pid)"
  fi
done

# App names and corresponding ports from .env
apps=("host-app" "price-widget" "portfolio-widget" "newsfeed-app" "wallet-app")
ports=("$HOST_APP_PORT" "$PRICE_WIDGET_PORT" "$PORTFOLIO_WIDGET_PORT" "$NEWSFEED_APP_PORT" "$WALLET_APP_PORT")

# Loop over arrays and run npm run dev
for i in "${!apps[@]}"; do
  app=${apps[$i]}
  port=${ports[$i]}
  echo "🚀 Starting $app on port $port in dev mode..."

  (
    cd "$app" || exit
    npm install
    PORT="$port" npm run dev &
  )
done

echo "✅ All micro frontends are starting in dev mode in background."
