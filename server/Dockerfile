
FROM python:3.8-slim-buster

RUN mkdir /readlists
COPY requirements.txt /readlists
WORKDIR /readlists
RUN pip3 install -r requirements.txt

COPY . /readlists

EXPOSE 5000

RUN chmod u+x ./entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]