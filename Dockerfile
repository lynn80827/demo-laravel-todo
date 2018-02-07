FROM ubuntu
RUN apt-get -y update; apt-get -y install curl nginx php7.0 php7.0-fpm php7.0-mysql php7.0-sqlite3 php7.0-mbstring php-xml php7.0-zip
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
ENV APP_KEY=base64:JOwaQpGnmey+MnBJH7mLUYQguOSqRok311jD2QYdC6Q=
ENV APP_ENV=dev
ENV APP_DEBUG=true
ENV APP_LOG_LEVEL=debug
WORKDIR /home
COPY . ./laravel
WORKDIR laravel
RUN composer install
RUN chown -R www-data:www-data /home/laravel
RUN chmod -R 755 /home/laravel/storage
RUN chmod -R 755 /home/laravel/public
RUN echo "\ndaemon off;" >> /etc/nginx/nginx.conf
COPY ./nginx.default.conf /etc/nginx/sites-available/default
RUN sed -e 's/;clear_env = no/clear_env = no/' -i /etc/php/7.0/fpm/pool.d/www.conf
RUN mkdir /run/php
CMD php artisan migrate; php-fpm7.0; nginx
EXPOSE 80
