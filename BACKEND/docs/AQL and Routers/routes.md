# ROUTES

```Javascript
// POST /main
// POST /main/persist
// GET /main/all
app.use("/main", mainRouter);

// POST /keywords
// GET /keywords/all
app.use("/keywords", wordRouter);

// POST /time
// POST /time/persist
app.use("/time", timeRouter);

// POST /abstract
app.use("/abstract", abstractRouter);

// GET /map/full
// GET /map/null
app.use("/map", mapRouter);

// GET /locanme
app.use("/locname", locationNameRouter);

// POST /persist
app.use("/persist", persistantRouter);
```

## Abstract route

This file is a route that is used to get the abstract of a dataset by its id.  
The route is accessed by a POST request to /abstract  

This is used when the user clicks on a particular dataset in the Table View chart.  

## Main route

In this route you can send the Dataset_id by post request  
and get the dataset object as a response.  

 POST request to /main with the Dataset_id returns the dataset objects of only the dataset_id which is posted.  
 
POST request to /main/persist with the Dataset_id returns the dataset objects of the dataset_id which is posted
and also checks if the dataset_id is persisted or not amd returns only the persisted datasets.
 
GET request to /main/all returns all the dataset objects of all the dataset_id  which is used  
in the initial page load and when the user clicks on the reset button.  

## Time route  

This route is used to get the dataset_id by
using the start and end time/date from the
TIME SERIES CHART from the frontend.

POST request to /time with the start and end date fetches all Datasets which
   are within the given time range.  
 
POST request to /time/persist with the start and end date fetches all Datasets
which are within the given time range and are persisted from previously applied filters.

## Keyword route  
This file is a route that is used to get the keywords of a dataset by its id.  
The route is accessed by a POST request to /keywords.  

This is used for the Wordcloud component.  
When a single keyword is clicked, the ^dataset_id array of that  
keyword is sent to the backend and all the datasets/keywords with that  
dataset_ids are returned.

POST request to /keyword with the dataset_id returns the keyword objects for the dataset_id which is posted.

GET request to /keyword/all returns all the keyword objects of all the dataset_id  which is used  
in the initial page load and when the user clicks on the reset button.  

## Location Name route

This file is a route that is used to get the name of the location from the co-ordinates(reverse Geo-coding).

Since the API we are using is a free API, it has a limit on the number of request that can be made in a second (1req/sec).  
To avoid the rate limit error(Error 429), use a delay of 1 sec between consequitive request.  

## Map route  

This file is a route that is used to get the dataset_id of the datasets
that have co-ordinates which are valid for the entire map and the datasets
that have co-ordinates which are null.

The /full route is used to get the dataset_id of the datasets that have co-ordinates
which are valid for the entire map.  
 
The /null route is used to get the dataset_id of the datasets that have co-ordinates
which are null.  

## Persist route

This file is used to store the previous state or persisst the previous stateof the dataset_id[] so that when a new filter is applied the new data will be related to the previous state of the dataset_id.

> NOTE:  
> The route will be cleared after every POST request.

