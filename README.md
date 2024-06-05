# Minecraft Stock system

This project was made for the PXL course 'Webtechnologie' in my first year of PXL college. The goal of the course was to create a full web project which was to provision a Linux machine, get used to using SSH keys, setup a webserver, setup a website backend, create a visually pleasing frontend, setup a database, create a RESTFUL API and have an external machine produce data to send to your API which handles it correctly.

### Documentation

The setup for the in game farm can be found in /computercraft

The website has an api with two endpoints which can be accessed on the url

**GET**: https://server-of-axel.pxl.bjth.xyz/api/get

This is the GET route, it is used to fetch the logs or to fetch the current stock of the items currently in stock

Usage:

The GET route has the following parameters

| Param | Prerequisite | Type            | Desc                                                                                                                                           |
| ----- | ------------ | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| type  | /            | 'log'\|'stock'  | Defines the data to look for, either logs or current stock                                                                                     |
| item  | /            | string\|'all'   | Must be provided, item to request the current stock or logs from. If type is == 'stock' the value 'all' can be used to return all stock values |
| from  | type==log    | Epoch timestamp | Set a start date to specifically get logs from this timestamp and onwards                                                                      |
| until | type==log    | Epoch timestamp | Set a end date to specifically get logs before this timestamp                                                                                  |

 **POST**: https://server-of-axel.pxl.bjth.xyz/api/post

This is the POST route, used to send stock updates to. 

Usage:

The POST route expects a request with a body that has the following parameters

| Param  | Type            | Desc                                                                          |
| ------ | --------------- | ----------------------------------------------------------------------------- |
| item   | string          | The item you want to a operation on, if item doesn't exist it will be created |
| method | 'ADD'\|'REMOVE' | Operation to do on the current stock                                          |
| amount | number          | Amount to change the stock with                                               |

**Errors:**

## Reflection

I think this project was a mild success. I already had some experience setting up a website by running [SBS](https://softwarebysolid.com/) but I went into this project with the goal of learning something new. During the course we were instructed to use other technologies then used in this project. After getting the green light on using my own tech stack I did set the goal for myself to learn something new. For me that was to learn some PHP. Laravel did seem interesting as it seemed to be similar to what I already know (NodeJS) but due to multiple deadlines that were approaching I decides to go with what I know and finished the project in 2 days. Looking back I do think it would've been nice to learn something a  bit more noteworthy like new language or technology. The project did however teach me how to create a simple lua script, efficiency in a terminal, how to use SSH keys and it made me more comfortable with git. 

### What could improve

- Website responsiveness

- Browsers that have a default darkmode theme makes the UI unreadable

- Time filtering not working -> parsing the date from query is most likely broken


