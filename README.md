# blog
TP blog DevPlace


-------------------USERS------------------------------------------------------------------------------------------------------------------------------------------------------
POST / Create:

curl --location --request POST 'http://localhost:8000/users' \
--header 'Content-Type: application/json' \
--data-raw '{
"privilege": "READ",
"first_name": "Juan",
"last_name": "Perez",
"email_user": "emailtest902@email.com",
"pass":"123"
}'


-------------------LOGIN------------------------------------------------------------------------------------------------------------------------------------------------------

curl --location --request POST 'http://localhost:8000/login' \
--header 'Content-Type: application/json' \
--data-raw '{
"username": "emailtes2t@email.com",
"password":"1232"
}'

-------------------ARTICLES--------------------------------------------------------------------------------------------------------------------------------------------------

GET:

curl --location --request GET 'http://localhost:8000/articles' \
--header 'Content-Type: application/json' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxLCJ1c2VyX25hbWUiOiJOaWNvbGFzIEZsb3JlcyIsInByaXZpbGVnZSI6IlJFQUQvV1JJVEUiLCJpYXQiOjE2Mzg4MjQwNTN9.nLe-lW5D76ucu2TZFbT9-PRevZD8Jte7ch_Oje9b6oo' \
--data-raw ''


Search / GET:

curl --location --request GET 'http://localhost:8000/articles/search' \
--header 'Content-Type: application/json' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxLCJ1c2VyX25hbWUiOiJOaWNvbGFzIEZsb3JlcyIsInByaXZpbGVnZSI6IlJFQUQvV1JJVEUiLCJpYXQiOjE2Mzg4MjQwNTN9.nLe-lW5D76ucu2TZFbT9-PRevZD8Jte7ch_Oje9b6oo' \
--data-raw '{
    "id_article":34
}'


POST / Create:

curl --location --request POST 'http://localhost:8000/articles' \
--header 'Content-Type: application/json' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjo1LCJ1c2VyX25hbWUiOiJKdWFuMiBQZXJlejIiLCJwcml2aWxlZ2UiOiJSRUFEL1dSSVRFIiwiaWF0IjoxNjQxOTU1OTUyfQ.9HBbh6-r88MJqFNNGanl3fZlwteAp6-YLmkgNCAJeck' \
--data-raw '{

"content":"test con POST",
"title":"title0 test80 test",
"tags":["1","2","3","80"]

}'


PUT / Update: 

curl --location --request PUT 'http://localhost:8000/articles' \
--header 'Content-Type: application/json' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjo1LCJ1c2VyX25hbWUiOiJKdWFuMiBQZXJlejIiLCJwcml2aWxlZ2UiOiJSRUFEL1dSSVRFIiwiaWF0IjoxNjQxOTU1OTUyfQ.9HBbh6-r88MJqFNNGanl3fZlwteAp6-YLmkgNCAJeck' \
--data-raw '{
"id_article": 35,
"content":"comentario pasdasdador api58",
"title":"title0 test80 memi",
"tags":["1","2","3","80"]

}'


DELETE / Eliminate:

curl --location --request DELETE 'http://localhost:8000/articles' \
--header 'Content-Type: application/json' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjo1LCJ1c2VyX25hbWUiOiJKdWFuMiBQZXJlejIiLCJwcml2aWxlZ2UiOiJSRUFEL1dSSVRFIiwiaWF0IjoxNjQxOTU1OTUyfQ.9HBbh6-r88MJqFNNGanl3fZlwteAp6-YLmkgNCAJeck' \
--data-raw '{
"id_article": 34

}'
-------------------COMMENTS-------------------------------------------------------------------------------------------------------------------------------------------------

GET:

curl --location --request GET 'http://localhost:8000/comments' \
--header 'Content-Type: application/json' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjo1LCJ1c2VyX25hbWUiOiJKdWFuMiBQZXJlejIiLCJwcml2aWxlZ2UiOiJSRUFEL1dSSVRFIiwiaWF0IjoxNjQxOTU1OTUyfQ.9HBbh6-r88MJqFNNGanl3fZlwteAp6-YLmkgNCAJeck' \
--data-raw ''


Search / GET:

curl --location --request GET 'http://localhost:8000/comments/search' \
--header 'Content-Type: application/json' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjo1LCJ1c2VyX25hbWUiOiJKdWFuMiBQZXJlejIiLCJwcml2aWxlZ2UiOiJSRUFEL1dSSVRFIiwiaWF0IjoxNjQxOTU1OTUyfQ.9HBbh6-r88MJqFNNGanl3fZlwteAp6-YLmkgNCAJeck' \
--data-raw '{
"id_comment": 1
}'


POST / Create:

curl --location --request POST 'http://localhost:8000/comments' \
--header 'Content-Type: application/json' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjo1LCJ1c2VyX25hbWUiOiJKdWFuMiBQZXJlejIiLCJwcml2aWxlZ2UiOiJSRUFEL1dSSVRFIiwiaWF0IjoxNjQxOTU1OTUyfQ.9HBbh6-r88MJqFNNGanl3fZlwteAp6-YLmkgNCAJeck' \
--data-raw '{
"id_article": 38,
"content":"comentario por api 38"
}'



PUT / Update:

curl --location --request PUT 'http://localhost:8000/comments' \
--header 'Content-Type: application/json' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjo1LCJ1c2VyX25hbWUiOiJKdWFuMiBQZXJlejIiLCJwcml2aWxlZ2UiOiJSRUFEL1dSSVRFIiwiaWF0IjoxNjQxOTU1OTUyfQ.9HBbh6-r88MJqFNNGanl3fZlwteAp6-YLmkgNCAJeck' \
--data-raw '{
"id_comment": 1,
"content":"comentario por api 2"
}'



DELETE / Eliminate:

curl --location --request DELETE 'http://localhost:8000/comments' \
--header 'Content-Type: application/json' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjo1LCJ1c2VyX25hbWUiOiJKdWFuMiBQZXJlejIiLCJwcml2aWxlZ2UiOiJSRUFEL1dSSVRFIiwiaWF0IjoxNjQxOTU1OTUyfQ.9HBbh6-r88MJqFNNGanl3fZlwteAp6-YLmkgNCAJeck' \
--data-raw '{
"id_comment": 2
}'


