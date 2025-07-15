#!/bin/bash

set -e

echo "⏳ Waiting for MySQL to be ready..."
until nc -z -v -w30 mysql 3306
do
  echo "⛔ MySQL is unavailable - sleeping"
  sleep 2
done

echo "✅ MySQL is up - continuing"

echo "📦 Installing composer dependencies..."
composer install --no-interaction

echo "📦 Installing node modules..."
npm install

echo "🗝️ Generating app key..."
php artisan key:generate

echo "🔐 Caching config..."
php artisan config:cache

echo "🧬 Running migrations..."
php artisan migrate --force

echo "🚀 Starting Laravel server on port 8000..."
php artisan serve --host=0.0.0.0 --port=8000 &

echo "📦 Building assets..."
npm run build

echo "⚡ Starting Vite dev server on port 5173..."
npm run dev