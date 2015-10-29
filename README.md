# Web Service

### Overview
This API provides endpoints to retrieve information from a tweets archive and each endpoint returns data in JSON format.
The technologies used in the server are pure Nodejs without any third party module installed.

#### Instructions
- In order to specify a different tweets archive, replace the content of the */data.json* file located in the root folder of this project.
- To run the project, execute this command *node server.js* in a command prompt and go to  http://127.0.0.1:3000/ in a web browser.

#### API Endpoints

All the Endpoints read and retrieve data from the */data.json* file.

**/get-tweets**
*Does not require paramenters*
Returns all tweets available in the archive.

**/get-users**
*Does not require paramenters*
Gets a list of all the Twitter users within the archive.

**/get-external-links**
*Does not require paramenters*
Gets a list of the links included within all the tweets text.

**/get-tweet-details**
Returns details of a specific tweet given a tweet id as a paramenter.
*parameter name: * **id**

**/get-user-info**
Retrieves information about a specific user given a screen name as a paramenter.
*paramenter name: * **screen_name**

**/get-text-info**
*Does not require paramenters*
Returns extra information about all the tweets. The extras includes info as users mentioned within a tweet, medias (images) and any hashtags.
