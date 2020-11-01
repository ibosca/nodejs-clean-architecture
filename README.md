# Node.js code assessment

Example implementation of a Clean Architecture on top of Nestjs framework.

✨ Key features ✨

- 🌐 Web Services integration
- 🔑 Authentication based on JWT Tokens
- 🔌 Rest API endpoint definition
- 💥 Exception handling
- 🔍 Linter configuration
- 📖 Swagger integration
- 💯 Testing
- 🐋 Docker
- ⚙️ Configuration based on ENV vars

## Installation

We provide two options in order to set up the project:

### Using Docker
Simply execute the following command: 
```
$ docker-compose up
```

### Manually

At project root level, execute the following command in order to install dependencies:
```
$ npm i
```

After that, launch the app using:
```
$ npm run start
```

## Usage

### Get a taste
Once the project is set up and running is time to get some data from it.

The project comes with a `swagger` integration. Hit <http://localhost:3000/apidoc> to access it.

1. Provide a valid username and password    

    Cick on 'Authorize' at top right corner. Provide the following credentials for the Basic Auth:
    > Username: britneyblankenship@quotezart.com    
      Password: I<3Pizza!

2. Get a `Bearer Token` from auth endpoint    

    Execute the auth endpoint and copy the token string from the response.

3. Provide the token to swagger.    

    Cick one more time on 'Authorize' and provide your token

With this you're authorized to execute any of the requests on `Clients` and `Policies` sections.   
Have fun!

### Running tests

Execute `test` command in order to run all tests:
```
$ npm test
```

**HINT**: In case you're running the app using Docker, run the command at container scope:    
```
$ docker exec -it axa-assessment_api_1 /bin/sh
```


## Additional details


## About the author