FROM python:3.9-alpine3.15


WORKDIR /FlaskRooms
COPY . .


RUN pip install -r requirements.txt

ENTRYPOINT ["python"]

CMD ["python","main.py"]

