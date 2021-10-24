# Nimble

## Week 1 Releases

-   Landing Page
-   Routing
-   Authentication
-   Refresh Token
-   Email Verification
-   Listing Projects
-   API for adding Team Members
-   Basic Backlog screen
-   Basic Retrospectives screen
-   User Profile
-   API for Sprints
-   Payments integration with Razorpay
-   Redis integration
-   Added Workflows for Github Actions

## Week 2 Releases

-   Minor Fixes to Landing Screen
-   Added Poker, Scrum Board, Standups, Retrospectives & Reports
-   Added Backlogs
-   Added Filters to backlogs
-   Added Dummy Login Buttons
-   Added Footer below Landing Page
-   Added Dyte meeting Integration
-   Added Sprint Navigation Ui

## Week 3 Releases

-   Profile screen
-   UI screens connectivity
-   Starting & Stopping of Sprint
-   Minor UI fixes
-   Error boundary
-   Bug Fixes

## Week 4 Releases

-   Final App with complete flow

### Api Documentations


# Nimble



## Indices

* [Micro](#micro)

  * [comments](#1-comments)
  * [test](#2-test)

* [Ungrouped](#ungrouped)

  * [add ticket](#1-add-ticket)
  * [addMembertoProject](#2-addmembertoproject)
  * [all sprints of project](#3-all-sprints-of-project)
  * [alldevelopers](#4-alldevelopers)
  * [alldevelopersofAProject](#5-alldevelopersofaproject)
  * [changeTicketStatus](#6-changeticketstatus)
  * [createOrder](#7-createorder)
  * [delete ticket](#8-delete-ticket)
  * [forgotpassword](#9-forgotpassword)
  * [get user data](#10-get-user-data)
  * [getAllTickets](#11-getalltickets)
  * [getReportsData](#12-getreportsdata)
  * [incrementStoryPoint](#13-incrementstorypoint)
  * [login](#14-login)
  * [register](#15-register)
  * [updateTicket](#16-updateticket)
  * [user update](#17-user-update)


--------


## Micro



### 1. comments



***Endpoint:***

```bash
Method: GET
Type: RAW
URL: http://localhost:4001/posts/8f2a7626/comments
```



***Body:***

```js        
{
    "content" : "Second post comment"
}
```



### 2. test



***Endpoint:***

```bash
Method: GET
Type: RAW
URL: http://localhost:4000/posts
```



***Body:***

```js        
{
    "content" : "First post content"
}
```



## Ungrouped



### 1. add ticket



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:5000/api/addTicket
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJ2aXBhbiBrdW1hciIsImVtYWlsIjoidmlwYW4xNjExNkBpaWl0ZC5hYy5pbiIsInJvbGUiOnsiX2lkIjoiNjE0YjA1NjI0NTA0ZmVlNDY5ZDYwYmExIiwibmFtZSI6InNjcnVtbWFzdGVyIn19LCJpYXQiOjE2MzI5MzUwOTF9.aqTb5_G9WjnG4_PzkSfefTMwna_MpC-J6ghtFmOdqHo |  |



***Body:***

```js        
{
    "projectId": "61546b7864bccbe191f15977",
        "ticketDetails": {
        "ticketId": "MK5R45",
        "title": "Test Ticket 4",
        "description": "This is a fourth ticket.",
        "assignee": "team member 4",
        "priority": "HIGH",
        "type": "BUG",
        "storyPoints": "0",
        "sprint": "",
        "status": ""
    }

}
```



### 2. addMembertoProject



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:5000/api/addMemberToProject
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJ2aXBhbiBrdW1hciIsImVtYWlsIjoidmlwYW4xNjExNkBpaWl0ZC5hYy5pbiIsInJvbGUiOnsiX2lkIjoiNjE0YjA1NjI0NTA0ZmVlNDY5ZDYwYmExIiwibmFtZSI6InNjcnVtbWFzdGVyIn19LCJpYXQiOjE2MzI5MzUwOTF9.aqTb5_G9WjnG4_PzkSfefTMwna_MpC-J6ghtFmOdqHo |  |



***Body:***

```js        
{
    "projectId": "61546b7864bccbe191f15977",
    "memberId" : "6158a91522e0576a80953245"
}
```



### 3. all sprints of project



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:5000/api/sprints/61546b7864bccbe191f15977
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1M2RkM2NlY2JkMjQ3MGQyMzIyNzI4IiwibmFtZSI6IlZpcGFuIHRlc3QiLCJlbWFpbCI6InZpcGFuMTYxMTZAaWlpdGQuYWMuaW4iLCJyb2xlIjp7Il9pZCI6IjYxNGIwNTYyNDUwNGZlZTQ2OWQ2MGJhMSIsIm5hbWUiOiJzY3J1bW1hc3RlciJ9fSwiaWF0IjoxNjM0MzE2NzM2fQ.0-DEJ9uyQGRs9JjB4rEC-ceArCK_OvMTi3PspUYZdcw |  |



### 4. alldevelopers



***Endpoint:***

```bash
Method: GET
Type: RAW
URL: http://localhost:5000/api/alldevelopers
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJ2aXBhbiBrdW1hciIsImVtYWlsIjoidmlwYW4xNjExNkBpaWl0ZC5hYy5pbiIsInJvbGUiOnsiX2lkIjoiNjE0YjA1NjI0NTA0ZmVlNDY5ZDYwYmExIiwibmFtZSI6InNjcnVtbWFzdGVyIn19LCJpYXQiOjE2MzI5MzUwOTF9.aqTb5_G9WjnG4_PzkSfefTMwna_MpC-J6ghtFmOdqHo |  |



### 5. alldevelopersofAProject



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:5000/api/alldevelopersOfAProject
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJ2aXBhbiBrdW1hciIsImVtYWlsIjoidmlwYW4xNjExNkBpaWl0ZC5hYy5pbiIsInJvbGUiOnsiX2lkIjoiNjE0YjA1NjI0NTA0ZmVlNDY5ZDYwYmExIiwibmFtZSI6InNjcnVtbWFzdGVyIn19LCJpYXQiOjE2MzI5MzUwOTF9.aqTb5_G9WjnG4_PzkSfefTMwna_MpC-J6ghtFmOdqHo |  |



***Body:***

```js        
{
    "projectId": "61546b7864bccbe191f15977"
}
```



### 6. changeTicketStatus



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:5000/api/changeTicketStatus
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1M2RkM2NlY2JkMjQ3MGQyMzIyNzI4IiwibmFtZSI6IlZpcGFuIHRlc3QiLCJlbWFpbCI6InZpcGFuMTYxMTZAaWlpdGQuYWMuaW4iLCJyb2xlIjp7Il9pZCI6IjYxNGIwNTYyNDUwNGZlZTQ2OWQ2MGJhMSIsIm5hbWUiOiJzY3J1bW1hc3RlciJ9fSwiaWF0IjoxNjM0Mjk3MDc4fQ.IKXcq_du0TGIEKiHTJDlMzSZ-8SZ5Bh1cD2NGrs-hGM |  |



***Body:***

```js        
{
    "projectId": "61546b7864bccbe191f15977",
    "ticketId": "TY7963",
    "status" : ""
}
```



### 7. createOrder



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:5000/api/createOrder
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1M2RkM2NlY2JkMjQ3MGQyMzIyNzI4IiwibmFtZSI6IlZpcGFuIHRlc3QiLCJlbWFpbCI6InZpcGFuMTYxMTZAaWlpdGQuYWMuaW4iLCJyb2xlIjp7Il9pZCI6IjYxNGIwNTYyNDUwNGZlZTQ2OWQ2MGJhMSIsIm5hbWUiOiJzY3J1bW1hc3RlciJ9fSwiaWF0IjoxNjM0NzQ3OTE2fQ.Fm_gVfpoza1dUREA49SoHLG9Sf0UnSXNb4fspZLYyIY |  |



***Body:***

```js        
{
    "email": "vipan16116@iiitd.ac.in",
    "amount" : 1000
}

```



### 8. delete ticket



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:5000/api/deleteTicket
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJ2aXBhbiBrdW1hciIsImVtYWlsIjoidmlwYW4xNjExNkBpaWl0ZC5hYy5pbiIsInJvbGUiOnsiX2lkIjoiNjE0YjA1NjI0NTA0ZmVlNDY5ZDYwYmExIiwibmFtZSI6InNjcnVtbWFzdGVyIn19LCJpYXQiOjE2MzI5MzUwOTF9.aqTb5_G9WjnG4_PzkSfefTMwna_MpC-J6ghtFmOdqHo |  |



***Body:***

```js        
{
    "projectId": "61546b7864bccbe191f15977",

        "ticketId": "MK5R45"
       
    
}
```



### 9. forgotpassword



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: http://localhost:5000/forgotpassword
```



***Body:***

```js        
{
        "email": "vipan16116@iiitd.ac.in"

}
```



### 10. get user data



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:5000/api/login
```



***Body:***

```js        
{
    "email": "vipan16116@iiitd.ac.in",
    "password": "huyp63bj8",
    "checked": true
}
```



### 11. getAllTickets



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:5000/api/getAllTickets
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1M2RkM2NlY2JkMjQ3MGQyMzIyNzI4IiwibmFtZSI6IlZpcGFuIHRlc3QiLCJlbWFpbCI6InZpcGFuMTYxMTZAaWlpdGQuYWMuaW4iLCJyb2xlIjp7Il9pZCI6IjYxNGIwNTYyNDUwNGZlZTQ2OWQ2MGJhMSIsIm5hbWUiOiJzY3J1bW1hc3RlciJ9fSwiaWF0IjoxNjM0MjMzMjkzfQ.5KZynmti50DlOHKhPvzIgv_jf_OCj6H2agSbbW6sDUc |  |



***Body:***

```js        
{
    "projectId": "61546b7864bccbe191f15977"
 
}
```



### 12. getReportsData



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:5000/api/getReportsData
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJ2aXBhbiBrdW1hciIsImVtYWlsIjoidmlwYW4xNjExNkBpaWl0ZC5hYy5pbiIsInJvbGUiOnsiX2lkIjoiNjE0YjA1NjI0NTA0ZmVlNDY5ZDYwYmExIiwibmFtZSI6InNjcnVtbWFzdGVyIn19LCJpYXQiOjE2MzI5MzUwOTF9.aqTb5_G9WjnG4_PzkSfefTMwna_MpC-J6ghtFmOdqHo |  |



***Body:***

```js        
{
    "sprintId": "12312sdfdsf"
}
```



### 13. incrementStoryPoint



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:5000/api/incrementStoryPoint
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJ2aXBhbiBrdW1hciIsImVtYWlsIjoidmlwYW4xNjExNkBpaWl0ZC5hYy5pbiIsInJvbGUiOnsiX2lkIjoiNjE0YjA1NjI0NTA0ZmVlNDY5ZDYwYmExIiwibmFtZSI6InNjcnVtbWFzdGVyIn19LCJpYXQiOjE2MzI5MzUwOTF9.aqTb5_G9WjnG4_PzkSfefTMwna_MpC-J6ghtFmOdqHo |  |



***Body:***

```js        
{
    "sprintId": "12312sdfdsf",
    "payload" : {
        "ticketId" : "KK1234",
        "storyPoints" : 20
    }
}
```



### 14. login



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:5000/api/login
```



***Body:***

```js        
{
    "email": "vipan16116@iiitd.ac.in",
    "password": "huyp63bj8",
    "checked": true
}
```



### 15. register



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:5000/api/register
```



***Body:***

```js        
{
    "email": "vipan16116@gmail.com",
    "password" : 123456,
    "name" : "vipan",
    "_id" : "scrummaster"

}
```



### 16. updateTicket



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:5000/api/updateTicket
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1M2RkM2NlY2JkMjQ3MGQyMzIyNzI4IiwibmFtZSI6IlZpcGFuIHRlc3QiLCJlbWFpbCI6InZpcGFuMTYxMTZAaWlpdGQuYWMuaW4iLCJyb2xlIjp7Il9pZCI6IjYxNGIwNTYyNDUwNGZlZTQ2OWQ2MGJhMSIsIm5hbWUiOiJzY3J1bW1hc3RlciJ9fSwiaWF0IjoxNjM0MzU5MjQ2fQ.jZ0Sw0RqIXr6AVHTmbfNFOX13rnlxxA19fg5nk6ULqU |  |



***Body:***

```js        
{
    "projectId": "61546b7864bccbe191f15977",
    "ticketDetails": {
        "ticketId": "RR4354",
            "title": "Test Ticket 3",
            "description": "This is a second ticket. This is updated......",
            "assignee": "6158a91522e0576a80953245",
            "priority": "HIGH",
            "type": "USER_STORY",
            "storyPoints": "5.5",
            "sprint": "61549f283b2f9feb4e8e6b43",
            "status": "TODO",
            "_id": "6169b79b9fc8ff36f7759951"
    }
}
```



### 17. user update



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:5000/api/user
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1M2RkM2NlY2JkMjQ3MGQyMzIyNzI4IiwibmFtZSI6IlZpcGFuIGt1bWFyIiwiZW1haWwiOiJ2aXBhbjE2MTE2QGlpaXRkLmFjLmluIiwicm9sZSI6eyJfaWQiOiI2MTRiMDU2MjQ1MDRmZWU0NjlkNjBiYTEiLCJuYW1lIjoic2NydW1tYXN0ZXIifX0sImlhdCI6MTYzNDA1Mjg1NH0.pj2iqk6aUrzVEF4ZaJ4Aoj_KXs_5uqAKSJUaCBNHl1M |  |



***Body:***

```js        
{
    "email": "vipan16116@iiitd.ac.in",
    "password": "**************",
    "checked": true
}
```



***Available Variables:***

| Key | Value | Type |
| --- | ------|-------------|
| local | http://localhost:5000 |  |



