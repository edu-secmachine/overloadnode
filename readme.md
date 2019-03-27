# Overloadnode

## Table of Contents
1. [Introduction](#Introduction)
2. [Building the application](#Build)
2. [Configuring a databse](#DBConfig)
3. [Accessing the API via Postman](#Postman)
4. [Exercises](#Exercises)
    1.  [Exercise 1 - Break the login](#Exercise_login)
    1.  [Exercise 2 - File handling](#Exercise_file)
    1.  [Exercise 3 - DOS](#Exercise_dos)

<a name="Introduction"></a>
## Introduction 

Overloadnode is an intentionally vulnerable nodejs/expressjs application. It is created for educational purposes. It is intended mainly for js backend developers.
Overloadnode is a movie-related application, where you can log in and out, read information about movies, other users, etc. The functionalities are far from complete or coherent, they just serve the purpose of demonstrating specific vulnerabilities.
This document contains exercises which can be done with Overloadnode to understand how to exploit and how to fix specific vulnerabilities.

<a name="Build"></a>
## Building the application 

You will need npm to run Overloadnode.  

You can build the project with:
```npm build```

Than you can run it with 
```npm start```

Or you can run it in debug mode with 
```npm run debug```

The app by default will run on port 8081. If you want to change the port, you should edit the my_port property in the /.env file.

<a name="DBConfig"></a>
##Configuring a database
Overloadnode uses a MongoDB to persist data. 
If you are unfamiliar with MongoDB, and currently you are on a course, then most likely you can skip this section (because you will have a configured MongoDB on a publicly available Google Cloud instance, and Overloadnode will be configured to use it).  
Otherwise, if you want to configure your own database, that's what you should do:  
Create a Mongo database called 'movie' by entering a mongo shell and issuing the command:
```use movie```
Then open the doc/mongoload.txt file, and run the two commands within it.  
Finally modify the 'mongo_url' property of the .env file, so that it points to your local MongoDB!


<a name="Postman"></a>
## Accessing the API via Postman 
Overloadnode in itself does not contain any user interface. It is a RESTfull application accepting http requests and responding JSON strings. In the doc folder you can find a Postman collection export. We suggest you to install Postman on your device and import this collection, since it helps you a lot with starting the exercises.  
After you imported the collection you will have to create an environment within Postman, where you have to specify the ```host``` environment variable. The value of this variable has to be the host and port of your running Overloadnode app.

<a name="Exercises"></a>
## Exercises 

<a name="Exercise_login"></a>
### Exercise 1 – Break the login
**Short Description**  
The login functionality contains a vulnerability, which enables an attacker to login without a password.


**Postman request**  
With Postman check the Login request in the Overloadnode collection to see how it works!

**Detailed description**  
The service behind login is vulnerable to one of the most classic exploit of programming. Find the vulnerability, and exploit it so that you can login to the app without any username.    
The vulnerability is ot trivial to find, it is ok, if you check the source-code (pay attention to authservice.js).   
When you are done, check the source code (MovieService.findMovie) and fix it.   
Discuss what could have been the developers motivation creating this code!  

<a name="Exercise_file"></a>
### Exercise 2 – File handling
**Short Description**
The application has a file upload and a file download functionality. Both of them suffer from several vulnerabilities. Find a vulnerability, with which you can read any file from the server's files-system!

**Service endpoint**  
FILE UPLOAD  
*Request Method*: POST  
*URL*: /uploadFile  
*Body*: the file to upload with "file" key  
*Response*: A JSON object containig information about the uploaded file  

FILE DOWNLOAD  
*Request Method*: GET  
*URL*: /downloadFile?fileName=&lt;file name&gt;  
*Response*:  The file to be downloaded  

**Postman request**  
Upload File  
Donwload File  

**Detailed description**  
The application stores uploaded files on the server's file-system. In order for the upload and download functionality to work you first have to set the value of the 'app_folder' property in the .env file to some reasonabel value (to a real path which exists on your machine).  
Then try to download a file with the application that is outside of this directory!  
Once you are done fix the found vulnerability!  
What other voulnerabiltites can you spot in the upload file functionality? How would you fix theese?  


<a name="Exercise_dos"></a>
### Exercise 3 – DOS
**Short Description**
The application is vulnerable to a classic js DOS (denial of service) attack. Find it and fix it!  

**Postman request**  
Modify user

**Detailed description**  
Find a DOS vulnerability in the Modify user functionality and expoit it!  
It's a good idea to check the source code to know where to start from.  
Why does this particular vulnerability have so serious consequences in the Node ecosystem?  
Fix the vulnerability!  


