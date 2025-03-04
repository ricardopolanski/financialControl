# Starting from scratch

## 1️. Clone the Repository
``` bash
git clone <repository_url>
cd <project_directory>   Replace <project_directory> with the actual name
```

## 2️. Set up the Backend (Express)
```bash
cd server
npm install   Install backend dependencies
```

## 3️. Configure the Database
### 3.1. Download and Install Docker Desktop:

- Windows/macOS: Go to the official Docker website (https://www.docker.com/products/docker-desktop) and download the appropriate installer for your operating system. Follow the installation instructions provided on the website.
    
- Linux: Docker installation on Linux varies depending on the distribution. Refer to the official Docker documentation for your specific distribution (https://docs.docker.com/engine/install/).

### 3.2. Start Docker Desktop:

> After installation, start Docker Desktop. You might need to accept some terms and conditions.  Make sure Docker is running before proceeding. You should see the Docker icon in your system tray or menu bar.

### 3.3 Pull the PostgreSQL Image:

Open a terminal or command prompt.  Use the following command to pull the latest PostgreSQL image from Docker Hub:
```bash
docker run -d --name my_postgres -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -e POSTGRES_DB=mydatabase -p 5432:5432 postgres
```

### 3.4. Start Postgres:

Back to Docker Desktop and start the Postgres if this one wasn't started.

# Steps to sync your local code with git master branch

### 1- Disconnect from Postgres DB if you'r connected (DBeaver)

### 2- Stop you backend service, if this one is running

### 3- Do you have any changes in your local branch? No? Skipp to step 3.2

#### 3.1- In your local branch run
```bash
git stash -m 'type your comment here to know what you are saving'
```

#### 3.2- Checkout to master branch
```bash
git checkout master
```

#### 3.3- Pull the remote changes into your local
```bash
git pull
```

#### 3.4- Checkout to your local branch
```bash
git checkout "local-branch"
```

#### 3.5- Merge the master branch into your feature branch
```bash
git merge master
```

#### 3.5- Apply the changes you saved locally
```bash
git stash apply
```

#### 3.6- Recreate DB
```bash
npm run db:recreate
```

#### 3.6- Start Backend
```bash
npm run start
```

# Jira Project Board
https://financial-control.atlassian.net/jira/software/projects/FC/boards/1

# TestRail Board
https://financialcontrol.testrail.io/