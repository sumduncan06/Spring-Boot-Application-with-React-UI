# Shopping List Spring Boot Application with React UI

This repository contains a Spring Boot microservice with RESTful APIs and a React frontend UI.

## What Does This App Do?

This application is a shopping list manager with microservice features:

- **Shopping List CRUD**: add, ,view, update, and delete shopping items with quantities
- **Configuration Endpoint (`/config`)**: Displays environment variables and ConfigMap data
- **Fibonacci Generator (`/fib`)**: Generates Fibonacci sequences of specified length (1, 10, etc..)
- **Swagger UI**: Interactive API documentation

## Prerequisites

- Docker Desktop with Kubernetes enabled
- Node.js and npm installed
- Java 21 (for Spring Boot)
- Gradle installed
- kubectl installed and configured
- DockerHub account

## Repository Structure
```
spring-boot-application-with-react-ui/
├── SpringBootProject/       # Spring Boot backend
│   ├── src/
│   ├── build.gradle
│   └── Dockerfile
├── reactui/                 # React frontend
│   ├── src/
│   ├── public/
│   ├── nginx.conf
│   ├── Dockerfile
│   └── package.json
├── k8s/                     # Kubernetes manifests
│   ├── spring-deployment.yaml
│   ├── spring-service.yaml
│   ├── react-deployment.yaml
│   ├── react-service.yaml
│   └── configmap.yaml
└── screenshots/
```

## How to Build and Run This Application

### 1. Clone the Repository
```bash
git clone https://github.com/sumduncan06/spring-boot-application-with-react-ui
cd spring-boot-application-with-react-ui
```

### 2. Build the Spring Boot Container

Navigate to the Spring Boot project directory:
```bash
cd SpringBootProject
```

Build the project with Gradle:
```bash
./gradlew clean build
```

Build the Docker image (use your own DockerHub username):
```bash
docker build -t <your-dockerhub-username>/spring-backend:v4.1.2 .
```

Push to DockerHub:
```bash
docker push <your-dockerhub-username>/spring-backend:v4.1.2
```

### 3. Build the React UI Container

Navigate to the React UI directory:
```bash
cd ../reactui
```

Install dependencies:
```bash
npm install
```

Build the React app for production:
```bash
npm run build
```

Build the Docker image:
```bash
docker build -t <your-dockerhub-username>/react-frontend:v4.1.2 .
```

Push to DockerHub:
```bash
docker push <your-dockerhub-username>/react-frontend:v4.1.2
```

### 4. Update Kubernetes Manifests

Navigate to the k8s directory:
```bash
cd ../k8s
```

**IMPORTANT:** Update the image names in the deployment files to match your DockerHub username:

In `spring-deployment.yaml`:
```yaml
image: <your-dockerhub-username>/spring-backend:v4.1.2
```

In `react-deployment.yaml`:
```yaml
image: <your-dockerhub-username>/react-frontend:v4.1.2
```

### 5. Deploy to Kubernetes

Apply all Kubernetes manifests:
```bash
kubectl apply -f configmap.yaml
kubectl apply -f spring-deployment.yaml
kubectl apply -f spring-service.yaml
kubectl apply -f react-deployment.yaml
kubectl apply -f react-service.yaml
```

Verify deployment:
```bash
kubectl get services,deployments,pods,configmaps
```

You should see:
- 3 Spring Boot pods (Running)
- 2 React pods (Running)
- spring-service (ClusterIP)
- react-service (NodePort)
- microservice-config ConfigMap

### 6. Access the Application

#### Option 1: NodePort
Open your browser to:
```
http://localhost:30000
```

#### Port Forwarding (If NodePort doesn't work)
If the NodePort doesn't work, use port forwarding:
```bash
kubectl port-forward service/react-service 3000:80
```

Then access at:
```
http://localhost:3000
```

**Note:** Keep the port-forward terminal window open while using the app.

### 7. Using the Application

#### Shopping List CRUD Operations
1. Enter an item name and quantity
2. Click "Add" to add the item
3. Click "Edit" to modify an existing item
4. Click "Delete" to remove an item

#### Configuration Data
1. Click "Load Config" to view environment variables
2. Look for `DATA_MICROSERVICE: MyOtherMicroservice` in the output

#### Fibonacci Sequence
1. Enter a number (e.g., 10) for the sequence length
2. Click "Generate" to see the Fibonacci sequence

#### Swagger UI
To access the Swagger API documentation:
```bash
kubectl port-forward service/spring-service 8080:8080
```

Then open:
```
http://localhost:8080/swagger-ui/index.html
```

### 8. Viewing Logs

To view the logs for config endpoint calls:
```bash
# Get pod names
kubectl get pods

# View logs for a specific Spring pod
kubectl logs <spring-pod-name>
```
### 9. Clean Up

Delete all Kubernetes resources:
```bash
kubectl delete -f k8s/configmap.yaml
kubectl delete -f k8s/spring-deployment.yaml
kubectl delete -f k8s/spring-service.yaml
kubectl delete -f k8s/react-deployment.yaml
kubectl delete -f k8s/react-service.yaml
```

Or delete all at once:
```bash
kubectl delete -f k8s/
```

Verify deletion:
```bash
kubectl get all
```

## Screenshots

### Restful Commands in Action:
<img width="1334" height="359" alt="Screenshot 2025-11-02 at 2 37 37 PM" src="https://github.com/user-attachments/assets/73714fb1-9df6-4842-813b-961bf32cb246" />


### Fibonacci in Action
<img width="1322" height="152" alt="Screenshot 2025-11-02 at 2 37 04 PM" src="https://github.com/user-attachments/assets/f90f4364-0ad8-43d5-924a-49b21885e35d" />


### Config Data in Action
<img width="1336" height="329" alt="Screenshot 2025-11-02 at 2 36 59 PM" src="https://github.com/user-attachments/assets/0fb02336-f510-4b3e-b665-8608ddb4deb2" />


