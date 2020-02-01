# Get an EC2 instance up

# Install docker

On an EC2 instance, you can do this via the following commands:
```
sudo amazon-linux-extras install docker
sudo service docker start
sudo usermod -a -G docker ec2-user
```

Otherwise, follow the instructions [here](https://docs.docker.com/install/).

# Install docker-compose

Follow the instructions from the docker-compose crew [here](https://docs.docker.com/compose/install/)

On an EC2 instance, you can do this via:
```
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose
```

# Clone the client repository

[Client](https://github.com/Midgame/Io)

# Define the appropriate environment variables

## Client

You'll want to provide the following in a `.env` file in the root folder:
```
PORT=5000
DISCORD_TOKEN=<A discord token of your choice>
```

# Build the containers

```
docker-compose build
docker-compose up -d
```

You *may* have to run yarn after building the containers, for some reason this doesn't quite work properly:

```
docker-compose run app yarn install
```

# Success!

Everything should work!