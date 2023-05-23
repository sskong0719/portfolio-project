FROM python:3.8-slim-buster

WORKDIR /django

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

CMD [ "python3", "main.py", "runserver", "0.0.0.0:8000"]