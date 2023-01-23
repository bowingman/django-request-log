# django-request-log

## This app is a simple CRUD user app and logs all of the requests on that app.

## How to run

`pip install -r requirments.txt`

`python manage.py migrate`

`python manage.py runserver`

## DataBase

- Added Request Log Model
  - Fields: `method`, `path`, `remote_address`, `timestamp`

## Other Libaries

- Added `JsonTree`
