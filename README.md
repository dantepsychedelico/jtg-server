# JTG-SERVER

## CREATE WITH DOCKER

- build with docker `docker build -t jtg-server .`
- run with docker `docker run --name jtg-server -d --link mongo-4:db --restart always -p 3000:3000 jtg-server`
- log with docker `docker log -f jtg-server`
