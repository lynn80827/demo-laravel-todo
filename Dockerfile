FROM ubuntu
RUN apt-get -y update
RUN apt-get -y install curl nginx php7.0 php7.0-fpm php7.0-mysql php7.0-sqlite3
RUN apt-get -y install php7.0-mbstring php-xml php7.0-zip
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
WORKDIR /home
COPY . ./laravel
RUN chown -R www-data:www-data laravel/
RUN chmod -R 755 laravel/storage
RUN chmod -R 755 laravel/public
WORKDIR laravel
RUN composer install
RUN echo "\ndaemon off;" >> /etc/nginx/nginx.conf
COPY ./nginx.default.conf /etc/nginx/sites-available/default
CMD service php7.0-fpm start & nginx
EXPOSE 80
