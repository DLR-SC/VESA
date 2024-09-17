# MISCELLANEOUS ROUTES

## Location Name

### POST ROUTE

***URL :***  `/locname`  
***METHOD :***  `POST`  
***PERMISSIONS :***  NONE  
***CONTENT-TYPE :*** `Application/JSON`  

#### SUCCESS RESPONSE  
***CODE :*** `200 OK`  
***DESCRIPTION :*** Returns the Location name of the given co-orninates.   
***SAMPLE RESPONSE*** :  `{"lat": "13.1976048", "lng": "77.7074856"}`
```
{
    "locationName": "Bengaluru Urban, India"
}
```
#### OTHER RESPONSES

***CODE :*** `429 ERROR`  
***DESCRITION :*** Exceeded the request limit(1req/sec)  

***CODE :*** `503 ERROR`  
***DESCRIPTION :*** Persiods of extremely high traffic loads.  

***CODE :*** `403 ERROR`  
***DESCRIPTION :*** Blocked client. Please contact Help@Maps.co  
