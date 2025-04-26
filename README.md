# Discord Bot CI/CD Pipeline 🚀

Automatically deploy your Discord bot to a VPS using Docker + GitHub Actions.  

---

## ⚡ Features
- Auto-deploy on every Git push
- Pre-configured Jest testing
- Dockerized environment
- Separate dev/production bot setups

---

## 🛠️ Prerequisites
- GitHub account
- Docker Hub account
- Ubuntu VPS (22.04+ recommended)
- Discord Developer Portal Application

---

## 🚀 Quick Start

### 1. Create Project from Template
Click **[Use this template](https://github.com/vinmeza/cicd-baseline-discordbot/generate)** to create your new repo.

### 2. Docker Hub Setup
1. Create new Docker Hub repository  
2. Add these GitHub Secrets to your repo:
   ```
   DOCKERHUB_USERNAME = Your Docker Hub username
   DOCKERHUB_PASSWORD = Your Docker Hub password/access token
   DOCKERHUB_REPO = your-dockerhub-username/repo-name```

### 3. VPS Configuration (Ubuntu)
SSH into your VPS with sudo privileges and do the following:
1. Install Docker
    ```
    sudo apt-get update && sudo apt-get install docker.io
    
2. Create deployment user
    ```bash
    sudo adduser [your linux username]
    sudo usermod -aG docker [your linux username]
3. Add these GitHub Secrets:
    ```bash
    VPS_HOST = [your.vps.ip.address]
    VPS_SSH_PORT = [the custom port to SSH into your VPS. Default is 22]
    VPS_USERNAME = [your linux username]

### 4. SSH Key Generation. 
You also need to generate an SSH key pair to be able to login to your VPS through GitHub Actions. This step might require more configuration depending on your VPS's settings.
These instructions are for Windows.
1. On your local machine, open PowerShell and generate an SSH key pair.
   ```
   ssh-keygen #Create it with no passphrase and note down where you created it. You will need the files for the next steps.  
2. Copy the key to the VPS.
    ```
    type [the path to the location of the SSH key that ends with .pub] | ssh [your linux username]@[server IP address or hostname] 'cat >> .ssh/authorized_keys'
3. (Optional) If you are using a custom SSH port, add the -p option to the ssh command. Likeso:
    ```
    type [the path to the location of the SSH key that ends with .pub] | ssh [your linux username]@[server IP address or hostname] -p [custom port] 'cat >> .ssh/authorized_keys'
4. Test the connection.
   ```
   ssh [your linux username]@[server IP address or hostname]
5. (Optional) Add the custom port if you are using one, like in the last optional step:
    ```
    ssh [your linux username]@[server IP address or hostname] -p [custom port]
    #You should be able to log in without using the user's password. If you can, that means the keys were set up correctly.

6. Add this GitHub Secret:
    ```bash
    VPS_SSH_KEY = [the private SSH key you generated (does NOT end with .pub). Open it with notepad and paste the entire file here]

### 5. Discord Bot Setup.
1. Enter the Discord Developer Portal to get and add the following GitHub Secrets:
    ```
    DISCORD_TOKEN = [your bot token]
    CLIENT_ID = [your application id]

### 6. (Optional) Create a test bot to run locally.
1. Create a new Application in the Discord Developer Portal.
2. Create a .env file inside your project's folder.
3. Add the following to the .env file.
    ```
   DISCORD_TOKEN = [your bot token]
   CLIENT_ID = [your application id]
   GUILD_ID = [your test server's id]

---

## 🔄 Workflow
1. Test locally.
    ```
    node index.js

2. Push changes to your GitHub repository.
   
3. Watch GitHub actions:
    Build a new Docker Image.
    Run tests.
    Deploy to your VPS.

## 🐳 Docker Commands (Post-Deployment)

```bash
docker ps # View running containers
docker logs [container_name] # Check bot logs
