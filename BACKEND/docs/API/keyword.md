# ROUTE /keywords

### GET REQUEST

***URL :***  `/keywords/all`  
***METHOD :***  `GET`  
***PERMISSIONS :***  NONE  

#### SUCCESS RESPONSE

***CODE :*** `200 OK`  
***DESCRIPTION :*** Returns all the `IKeyword[]` objects from the Database. Includes objects from `Dataset` and `STACCollection`  
***SAMPLE RESPONSE*** :   
```
{
            "keyword": "Atmosphere",
            "count": 0.00448885146742692,
            "dataset_id": [
                "STACCollection/S5P_TROPOMI_L3_P1D_CF",
                "STACCollection/S5P_TROPOMI_L3_P1D_COT",
                "STACCollection/S5P_TROPOMI_L3_P1D_CTH",
                "STACCollection/S5P_TROPOMI_L3_P1D_HCHO",
                "STACCollection/S5P_TROPOMI_L3_P1D_O3",
                "STACCollection/S5P_TROPOMI_L3_P1D_SO2"
            ]
        },
        {
            "keyword": "Level ",
            "count": 0.00448885146742692,
            "dataset_id": [
                "STACCollection/S5P_TROPOMI_L3_P1D_CF",
                "STACCollection/S5P_TROPOMI_L3_P1D_COT",
                "STACCollection/S5P_TROPOMI_L3_P1D_CTH",
                "STACCollection/S5P_TROPOMI_L3_P1D_HCHO",
                "STACCollection/S5P_TROPOMI_L3_P1D_O3",
                "STACCollection/S5P_TROPOMI_L3_P1D_SO2"
            ]
        },
        {
            "keyword": "Fire",
            "count": 0.0037407095561891005,
            "dataset_id": [
                "STACCollection/modis-14A1-061",
                "STACCollection/modis-14A2-061",
                "STACCollection/modis-64A1-061",
                "STACCollection/mtbs",
                "STACCollection/sentinel-3-slstr-frp-l2-netcdf"
            ]
        },
        {
            "keyword": "Laboratory experiment",
            "count": 0.0037407095561891005,
            "dataset_id": [
                "Dataset/495978575",
                "Dataset/495981935",
                "Dataset/495986629",
                "Dataset/495992451",
                "Dataset/496003267"
            ]
        },
```
### POST REQUEST  
***URL :***  `/keywords`  
***METHOD :***  `POST`  
***PERMISSIONS :***  NONE  
***CONTENT-TYPE :*** `application/json`  
***key :*** `IDatasetID[]`   

#### SUCCESS RESPONSE
***CODE :*** `200 OK`  
***DESCRIPTION :*** Returns `IKeyword[]` for the particular `IDatasetID` posted.  
***SAMPLE RESPONSE*** : ```{"key":["STACCollection/3dep-lidar-classification","Dataset/495979159"]}```  

```
{
    "result": [
        {
            "keyword": "Mosaic",
            "count": 0.16666666666666666,
            "dataset_id": [
                "Dataset/495979159"
            ]
        },
        {
            "keyword": "Radiation fluxes",
            "count": 0.16666666666666666,
            "dataset_id": [
                "Dataset/495979159"
            ]
        },
        {
            "keyword": "Sea Ice",
            "count": 0.16666666666666666,
            "dataset_id": [
                "Dataset/495979159"
            ]
        },
        {
            "keyword": "Classification",
            "count": 0.16666666666666666,
            "dataset_id": [
                "STACCollection/3dep-lidar-classification"
            ]
        },
        {
            "keyword": "USGS",
            "count": 0.16666666666666666,
            "dataset_id": [
                "STACCollection/3dep-lidar-classification"
            ]
        },
        {
            "keyword": "COG",
            "count": 0.16666666666666666,
            "dataset_id": [
                "STACCollection/3dep-lidar-classification"
            ]
        }
    ]
}
```