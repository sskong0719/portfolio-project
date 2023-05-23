FROM python:3.11

ENV HOME /root
WORKDIR /root

RUN apt-get update

COPY /backend .

RUN pip3 install -r requirements.txt

EXPOSE 5000

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait


CMD /wait && python3 sample_data.py && python3 -u main.py
