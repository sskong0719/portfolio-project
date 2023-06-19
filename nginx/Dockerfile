FROM nginx

COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY ./cert.pem /etc/nginx/cert.pem
COPY ./private.key /etc/nginx/private.key

# COPY ./default.conf /etc/nginx/sites-available/default.conf
# COPY ./cert.pem /etc/letsencrypt/live/samuelkong.dev/fullchain.pem
# COPY ./private.key /etc/letsencrypt/live/samuelkong.dev/privkey.pem