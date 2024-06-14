FROM python:3.11

ENV HOME /root
WORKDIR /root

RUN apt-get update

COPY . .

RUN pip3 install -r requirements.txt

# The React build files will be available at /root/react-build due to the shared volume
ENV FLASK_ENV production
EXPOSE 5000

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && python3 -u app.py
