## Description

A demo project for Laravel

## Run

```shell
$ docker build -t demo-laravel-todo:latest .
$ docker run -e DB_CONNECTION=sqlite -p 8089:80 --name demo-laravel-todo -d demo-laravel-todo:latest
```

or

```shell
$ docker-compose up -d
```

After service is up, open `localhost:8090`.

> Uploading file cannot work since aws client is not configured in the docker.
