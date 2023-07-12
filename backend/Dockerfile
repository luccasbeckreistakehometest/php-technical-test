
FROM php:7.4-cli

WORKDIR /var/www/html

# Install PostgreSQL extension for PHP
RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

# Copy the PHP files to the server
COPY . .

# Expose the port for the PHP server
EXPOSE 8000

# Start the PHP server
CMD ["php", "-S", "0.0.0.0:8000"]
