# ROUTE /abstract

### POST REQUEST

***URL :***  `/abstract`  
***METHOD :***  `POST`  
***PERMISSIONS :***  NONE  
***CONTENT-TYPE :*** `application/json`  
***key :***`IDatasetID`  

#### SUCCESS RESPONSE

***CODE :*** `200 OK`  
***DESCRIPTION :*** Returns `IAbstract`. When the `IDatasetID` is posted to `POST /abstract`, the response is the abstract/description of that particular `Dataset` or `STACCollection` collections.  
***SAMPLE RESPONSE 1:*** `{"key":"Dataset/495982598"}  
`
```
{
    "result": [
        [
            "Fraction of spectral solar irradiance transmitted through snow and sea ice as measured in different depths under sea ice (transmittance)."
        ]
    ]
}
```
***SAMPLE RESPONSE 2:*** `{"key":"Dataset/495977083"}`  
```
{
    "result": [
        [
            null
        ]
    ]
}
```