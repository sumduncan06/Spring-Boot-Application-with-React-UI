# Spring-Boot-Application-with-React-UI

This repository contains a Spring Boot microservice with a RESTful CRUD API and a React frontend UI, deployed on a local Kubernetes cluster using Docker Desktop.

## What Does This App Do?

This Shopping List application utlizes a Spring Boot microservice with a RESTful API and a React Frontend UI to perform CRUD Applications. Users will be able to name and select its quantity before adding it to the list. The list of items will be displayed on the page and users will be able to update items in the list or delete items entirely from the list.

## Prerequisites

- Docker Desktop with Kubernetes enabled. 2 KIND clusters are required for this application.
- Node.js and npm installed.
- Java 21 (for Spring Boot).
- Gradle installed.
- kubectl installed and configured.
  
## How to Build and Run this Application

### 1. Download the React UI, SpringBootProject, and K8s folders.

These folders should contain:

- (K8s) 4 Yaml Files
- (REACT UI) APP.js along with nginx files, and json files
- (SPRING BOOT PROJECT) gradle and java files located in src

### 2. Build the Spring Boot Container
Open terminal and navigate to the "springbootproject" folder. 

Now build a container image using the following command: ```docker build -t <your-user-dockerhub-name>/spring-backend:1.0.0 .```

Hit enter and let the image build.

Now, push the image to dockerhub using the following command: `docker push <your-dockerhub-username>/spring-backend:1.0.0`

Next, build the project. Run `./gradlew clean build`

You have now successfully built your spring boot container.

### 3. Build the REACT UI container

Open a new terminal window and navigate to the "reactui" folder.

Install dependencies with `npm install`

Run build using `npm run build`

Build the image with: `docker build -t <your-dockerhub-username>/react-frontend:v1.0.0 .`

Push the image to dockerhub with `docker push <your-dockerhub-username>/react-frontend:v1.0.0`

You have now successfully built your reactui container and set the application up for execution.

### 4. Kubernetes Deployment

Now navigate to the K8s folder. In the "react-deployment.yaml" file under image, change "sumduncan06/my-spring-app:v1.0.1" to your image name. You can find your specific image under `docker images` if you get stuck. Changing this ensure that the kubernetes will pull from your image. Do the same for the "spring-deployment.yaml" file as well.

<img width="920" height="601" alt="Screenshot 2025-10-04 at 8 47 48 PM" src="https://github.com/user-attachments/assets/ac8f09b1-6531-4bc4-ac4b-65ca24ff48c0" />

Now deploy the kubernetes. Run the following commands in your K8 terminal:

`kubectl apply -f spring-deployment.yaml`

`kubectl apply -f spring-service.yaml`

`kubectl apply -f react-deployment.yaml`

`kubectl apply -f react-service.yaml`

Run `kubectl get all` to make sure you have 4 pods total.

### 5. Access REACTUI & Run the front/backend applications

Navigate back to your "springbootcontainer" terminal. Run `./gradlew clean bootRun`

Navigate to your "reactui" terminal. Run `npm start`. The app will run at `http://localhost:3000` in your browser.

#### Expected Output:
<img width="1405" height="1046" alt="Screenshot 2025-10-04 at 9 24 55 PM" src="https://github.com/user-attachments/assets/3b5b3b23-e9f4-4c49-85d6-930d3f6bb1c0" />

### Performing CRUD Operations

Enter an item's name and select its quantity. After you hit `add` you should see the item and the quantity displayed. If you'd like to edit the item, hit `edit`. You will then be able to edit the name and quantity of the item. To remove an item from the list, hit `delete`.

<img width="1793" height="1053" alt="Screenshot 2025-10-04 at 8 22 52 PM" src="https://github.com/user-attachments/assets/5980bbce-27d9-435f-bed8-1cbb15c23f80" />

### Clean Up

Follow these steps when you're done using the application:

In a new terminal run `docker ps` to find running containers. 

Find the ids of the ones you want to remove, then run `docker stop (container id)`. 

Now run `docker rm (container id)` to remove the containers from your machine.

You can delete all your kubernetes manifests by running the following commands:
   
`kubectl delete -f k8s/spring-deployment.yaml`

`kubectl delete -f k8s/spring-service.yaml`

`kubectl delete -f k8s/react-deployment.yaml`

`kubectl delete -f k8s/react-service.yaml`

Finally, close all terminals and remove all folders from your machine.


 
