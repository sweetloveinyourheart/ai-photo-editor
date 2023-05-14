FROM python:3.10

WORKDIR /api

COPY . .

RUN pip install --no-cache-dir --upgrade -r /api/requirements.txt

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]