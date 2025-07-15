FROM php:8.3-fpm

# 1. Install system dependencies
RUN apt-get update && apt-get install -y \
    git curl unzip zip libpng-dev libonig-dev libxml2-dev libzip-dev \
    libpq-dev libjpeg-dev libfreetype6-dev gnupg ca-certificates \
    netcat-openbsd \
    imagemagick libmagickwand-dev libmagickcore-dev --no-install-recommends

# 2. PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql mbstring zip exif pcntl gd

# 2b. Install and enable Imagick
RUN pecl install imagick \
    && docker-php-ext-enable imagick

# 3. Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# 4. Install Node.js 18
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# 5. Set working directory
WORKDIR /var/www/html

# 6. Copy project files
COPY . .

# 7. Copy and configure entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# 8. Creating storage and symbolic link for images
RUN mkdir -p storage/app/public
RUN composer install --no-dev --optimize-autoloader \
    && php artisan storage:link

# 8. Default command
CMD ["/entrypoint.sh"]