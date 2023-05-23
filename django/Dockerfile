FROM python:3.8-slim-buster

WORKDIR /django

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

CMD [ "python3", "main.py", "runserver", "0.0.0.0:8000"]

FROM python:3.11

ENV HOME /root
WORKDIR /root

RUN apt-get update

COPY /root .

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

EXPOSE 5000

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait


CMD /wait && python3 -u main.py
