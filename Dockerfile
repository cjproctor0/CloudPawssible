FROM nginx:alpine

COPY ./index.html /usr/share/nginx/html/index.html

# CMD ["systemctl", "status", "nginx"]