# ROUTE /time

### POST REQUEST

***URL :***  `/time`  
***METHOD :***  `POST`  
***PERMISSIONS :***  NONE  
***CONTENT-TYPE :*** `application/json`  
***key :***`{"start": start_date, "end": end_date}`  

#### SUCCESS RESPONSE

***CODE :*** `200 OK`  
***DESCRIPTION :*** Returns `IDataset[]`. Checks for all the `IDataset` which has `temporal.extent.start_data` and `temporal.extent.end_date` between the POSTED start and end date, i.e, all the `IDataset` which are within the time range.  

***SAMPLE RESPONSE :***  
```
    ***REFER any RESONSE FROM /main***
```

***URL :***  `/time/persist`  
***METHOD :***  `POST`  
***PERMISSIONS :***  NONE  
***CONTENT-TYPE :*** `application/json`  
***key :***`{"start": start_date, "end": end_date}`  

#### SUCCESS RESPONSE

***CODE :*** `200 OK`  
***DESCRIPTION :*** Returns `IDataset[]`. First it will check with `GET /persist`. Then it will compare the keys[] from `GET /persist` and the dataset ids from the `IDataset[]` which is present between the given time range. Finally it will return `IDataset` of only the common `IDatasetID`  

***SAMPLE RESPONSE :***  
```
    ***REFER any RESONSE FROM /main***  
```
***MORE EXPLAINATION*** Let's look at one example. Suppose the keys which you get from the `GET /persist` be equal to `["Dataset/1","Dataset/2"]`. Then you post `{"start": "2017-03-28", "end": "2017-05-28"}` to `POST /time/perist`. Let's assume only `["Dataset1","Dataset/2","Dataset/3","STACCollection/a"]` is present between the start_date and the end_date. Since the common `IDatasetID` are "Datatset/1" and "Dataset/2", the final response will be `IDataset[]` of "Datatset/1" and "Dataset/2".  