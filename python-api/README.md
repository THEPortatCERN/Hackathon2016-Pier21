# relevancy
relevancy api

on Heroku

https://pier21.herokuapp.com/

sample request:
https://pier21.herokuapp.com/article?url=http://edition.cnn.com/2016/10/15/africa/niger-us-kidnap/index.html


To Run:


`pip install -r requirements.txt`

`export DATABASE_URL= {url to psql db}`

`python create_db.py`

`python views.py`

call:

`curl -H "Content-Type: application/json" -X POST -d '{"something":"asfd"}' http://127.0.0.1:5000/article`


expected response:

  ```
  {
  "article": {
    "something": "asfd"
  },
  "relevancy": false
}

```

on heroku

call:

`curl -H "Content-Type: application/json" -X POST -d '{"something":"asfd"}' http://pier21.herokuapp.com/article`
