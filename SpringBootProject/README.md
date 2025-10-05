# my-spring-container

# Purpose
This repository contains a Spring Boot microservice that manages a grocery shopping list. Anyone who uses this microservice can interact with the microservice by creating, reading, updating, or deleting any item they choose.

 # What does this app do?
 - Delete items using item id
 - update items inside list
 - retrieve items by id
 - retrieve all items in list
 - add item with item name and quantity

# How to Build App
- Clone Repository
    > git clone https://github.com/sumduncan06/my-spring-container
- cd into "my-spring-container", then "springbootproject"
- Build Docker Image
    > ./gradlew bootBuildImage --imageName=my-spring-app:v1.0.0
- Run Docker Container
    > docker run --rm --name my-spring-app -p 8080:8080 my-spring-app:v1.0.0
- Access Swagger UI by copying and pasting into your web browser
    > http://localhost:8080/swagger-ui.html
