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
Once the project is up and running, it's time to get some data from it.

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

With the aim of facilitate the task review, I decided to add some extra information on a few key topics.

### Software Architecture
I decided to implement one of the most famous Clean Architectures: [The Hexagonal Architecture](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)).
As you can see, at /src level, there are 3 directories `application`, `domain` and `infrastructure`. With this, we are physically isolating the layers of the application.

+ Application: I put here the Application Services; these are called by controllers, and typically are mapped one-to-one with the endpoints on our app (use cases). 
+ Domain: Here lives the key part of our application, the Aggregate roots, entities, interfaces, value objects, exceptions... and even domain services that can be reused by more than one application service.
+ Infrastructure: This is the code that does not belong to us. Framework stuff, connection to external services like databases, and any piece of code out of our business logic scope.

This separation allows us to decouple our code of any infrastructure our code interacts with; and more important, let us to interchange this infrastructure code.    
In this case, for example, would be very easy to get the Clients or Policies from other data source, like a Database or a real-world API.

### Authentication

Following the indications, I used Passport library for the Authentication feature.    
With that, I implemented two kinds of authentications:

+ Basic Auth: Providing an `username` and the `password`, the app will return a Bearer Token.
+ Bearer Token: Sending that token will grant us access to any endpoint of our app.

As the client has not any password property, and for sake of simplicity, I hardcoded a password at code level.    
In a real-world app, for sure, we will need to hash the plain password before persist it; and then, apply the same hashing strategy in order to check if the provided password is valid or not.

### Testing

Every test is located under /test directory at root level.    
I really like to keep any kind of test at the same directory. The counterpart of this approach is that the directory structure can be a bit unfamiliar; let's take a look on it.

At src directory, I duplicated the actual src folder schema, and placed the unit test into Application directory (because these tests does not interact with any infrastructure).    
Following the same criteria, I placed the integration test into Infrastructure directory.    
Finally, I put on Domain the ObjectMother classes.

The End to End tests are located in the e2e directory.

### Typescript

I prefer to use Typescript over Javascript mainly for two reasons:

+ Typescript is a strongly typed language.
    
+ Typescript allows us to create interfaces.

### Error handling and responses

I created an App that has a predictable response format. The format is described in `AppResponse.dto.ts`.    
Any response, even error response, will have a meta, and a data key.

In some places where was pretty difficult to manage the response myself, I took advantage of Nest's exception filter to catch any exception and return a valid response instead.
