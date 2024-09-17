# Arango Query Language

The general syntax for bind parameters is @name where @ signifies that this is a value bind parameter and name is the actual parameter name. It can be used to substitute values in a query.
```bash
    RETURN @value
```

query returns all documents from the collection users that have a value of null in the attribute name, plus all documents from users that do not have the name attribute at all:  
```sql
FOR u IN users
    FILTER u.name == null
    RETURN u
```

> 🚨 **KEEP IN MIND** 🚨
> 
```sql
LET id = (
FOR doc IN Dataset
    RETURN doc._id
    )

RETURN id
``` 
```
[
  [
    "Dataset/495976965"
  ]
]
```
> I have used the above method thoughtout the project.
```sql
FOR doc IN Dataset
    RETURN doc._id
```

```
[
    "Dataset/495976965"
]
```

## Accessing DB and running queries from Node JS

**DEPENDENCIES** : `arangojs`

### STEPS FOR RUNNING AQL FROM NODE

`Import ArangoJS and Required Dependencies` : In your Node.js file, import the necessary dependencies including Database from "arangojs".  

`Connect to the Database` : Establish a connection to your ArangoDB database. You can use an existing connection or create a new one.  

`Write your AQL Queries` : Define your AQL queries as strings. These queries can include placeholders for dynamic values.  

`Execute Queries`: Use ArangoJS to execute your AQL queries. You can pass parameters to your queries as needed.  

`Handle Results` : Handle the results returned by the queries. Depending on your application logic, you might process the results further or return them to the client.  

Queries are executed using `database.query()` method, which returns a `cursor` object representing the result set.  
The `cursor.all()` method is used to fetch all deocuments from the cursor as an array. This array is then either processed further or sent back as a response to the client.  

```javascript
import { Database } from 'arangojs';

// Connect to the ArangoDB database
const db = new Database({
  url: process.env.DATABASE_URL, // URL of the ArangoDB server
  databaseName: "mydatabase",    // Name of the database
  auth: { username: process.env.DATABASE_USERNAME , password: process.env.DATABASE_PASSWORD } // Authentication credentials
});

// Define your AQL query
const aqlQuery = `
  FOR doc IN mycollection
  FILTER doc.status == @status
  RETURN doc
`;

// Define parameters for the query
const bindVars = [foo, bar]; //I have used the variable 'keys' to denote the bindVars

// Execute the query
db.query(aqlQuery, bindVars)
  .then(cursor => {
    // Process the cursor to fetch results
    return cursor.all();
  })
  .then(docs => {
    // Handle the query results
    console.log("Query Results:", docs);
  })
  .catch(error => {
    // Handle errors
    console.error("Error executing query:", error);
  });

```

I have used `try-catch` blocks for error-handling, but the above method also works.  


## Routers in Express

***Express.Routers()*** are used to handle different API(HTTP) requests to specific endpoints. I have used different Routers() for each endpoints. Each Router can be found under the `./routes` folder.  

### My Implementation

 - Initialize Router : create an instance using `express.Router()`.  
 - Define Routes : for different HTTP methods(GET/POST) and endpoints('/','/all'). Each routes specifies a callback funtion to handle requests made to that particular endpoint.  
 - Handle Requests : inside the callback, you can access the request ('req') and response('res') objects. You can either process this or send it directly to the client.  
 - Export Router : Finally, export the router instance to make it available for use in the main `index.ts` file. There, you can name your router according to its use.  
  
#### Exporting Router

For better readability, I have used a seperate file for each endpoint. The main entry point of your application (index.ts in this case) serves as a centralized configuration where all routers are imported and configured. This makes it easy to understand the overall structure of your application and manage dependencies.  

For example, let's consider the getDataById.ts,  

***ROUTER FILE***
```javascript
// Import necessary modules
import express from "express";

// Create a new router
const router = express.Router();

// Define route handlers
router.get("/all", (req, res) => {
  // Handle GET request to retrieve data by ID
  res.send("Respond with data by ID");
});

router.post("/", (req, res) => {
  // Handle POST request to create data by ID
  res.send("Respond after creating data by ID");
});

// Export the router
export default router;
```

***index.ts***
```javascript
// Import necessary modules and router
import express from "express";
import getDataByIdRouter from "./routes/getDataById"; //Good practice to use the filename followed but router for naming the router. 

// Initialize Express application
const app = express();
const port = 3000;

// Mount the router
app.use("/data", getDataByIdRouter);

/**
 * So the routes available will be :
 * (localhost:3000/data/all) (GET : '/all')
 * (localhost:3000/data) (POST : '/')
*/

```
