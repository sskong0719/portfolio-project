FROM nginx

COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY ./cert.pem /root/cert.pem
COPY ./private.key /root/private.key

RUN chmod -R 755 /root