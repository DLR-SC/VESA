# ROUTE /main

### GET REQUEST

***URL :***  `/main/all`  
***METHOD :***  `GET`  
***PERMISSIONS :***  NONE  

#### SUCCESS RESPONSE  
***CODE :*** `200 OK`  
***DESCRIPTION :*** Returns all the `IDataset[]` objects from the Database. Includes objects from `Dataset` and `STACCollection`  
***SAMPLE RESPONSE*** :  

```
    {
    "result": [
        [
            {
                "id": "Dataset/495976965",
                "locationData": {
                    "westBoundLongitude": 20.67,
                    "eastBoundLongitude": 20.67,
                    "northBoundLatitude": 38.14,
                    "southBoundLatitude": 38.14,
                    "meanLatitude": 38.14,
                    "meanLongitude": 20.67
                },
                "doi": "https://doi.org/10.1594/PANGAEA.882111",
                "dataset_publication_date": "2017-10-20T18:19:34+00:00",
                "temporal_coverage": {
                    "start_date": "1950-06-29T23:00:00Z",
                    "end_date": "2007-06-29T23:00:00Z"
                },
                "authors": [
                    "Raúl Sánchez-Salguero",
                    "J Julio Camarero",
                    "Marco Carrer",
                    "Emilia Gutiérrez",
                    "Arben Q Alla",
                    "Laia Andreu-Hayles",
                    "Andrea Hevia",
                    "Athanasios Koutavas",
                    "Elisabet Martínez-Sancho",
                    "Paola Nola",
                    "Andreas Papadopoulos",
                    "Edmond Pasho",
                    "Ervin Toromani",
                    "José A Carreira",
                    "Juan C Linares"
                ],
                "dataset_title": "Tree ring width indices at mean site AINO in the period 1950-2007",
                "organization": "PANGAEA"
            }
        ],
        [
            {
                "id": "STACCollection/viirs-15a2h-001",
                "locationData": {
                    "west_bound_longitude": -180,
                    "east_bound_longitude": 180,
                    "north_bound_latitude": 80,
                    "south_bound_latitude": -60,
                    "mean_longitude": 0,
                    "mean_latitude": 10
                },
                "doi": "https://stac.terrabyte.lrz.de/public/api/collections/viirs-15a2h-001/items",
                "temporal_coverage": {
                    "start_date": "2012-01-17T00:00:00Z",
                    "end_date": "2023-02-02T00:00:00Z"
                },
                "providers": [
                    "NASA LP DAAC at the USGS EROS Center",
                    "DLR terrabyte"
                ],
                "title": "VNP15A2H.001: VIIRS Leaf Area Index/FPAR 8-Day",
                "organization": "Earth Observatory"
            }
        ]
    ]
}
```

### POST REQUEST

***URL :***  `/main`  
***METHOD :***  `POST`  
***PERMISSIONS :***  NONE  
***CONTENT-TYPE :*** `application/json`  
***key :*** `IDatasetID[]`  

#### SUCCESS RESPONSE

***CODE :*** `200 OK`  
***DESCRIPTION :*** Returns `IDataset[]` for the particular `IDatasetID` posted.  
***SAMPLE RESPONSE*** : ```{"key":["STACCollection/3dep-lidar-classification","Dataset/495979159"]}```  
```
{
    "result": [
        [
            {
                "id": "STACCollection/3dep-lidar-classification",
                "locationData": {
                    "west_bound_longitude": -166.8546920006028,
                    "east_bound_longitude": -64.56116757979399,
                    "north_bound_latitude": 71.39330810146807,
                    "south_bound_latitude": 17.655357747708283,
                    "mean_longitude": -115.70792979019839,
                    "mean_latitude": 44.52433292458817
                },
                "doi": "https://planetarycomputer.microsoft.com/api/stac/v1/collections/3dep-lidar-classification/items",
                "temporal_coverage": {
                    "start_date": "2012-01-01T00:00:00Z",
                    "end_date": "2022-01-01T00:00:00Z"
                },
                "providers": [
                    "Landrush",
                    "USGS",
                    "Microsoft"
                ],
                "title": "USGS 3DEP Lidar Classification",
                "organization": "Earth Observatory"
            }
        ],
        [
            {
                "id": "Dataset/495979159",
                "locationData": {
                    "westBoundLongitude": 116.099999999984,
                    "eastBoundLongitude": 116.099999999984,
                    "northBoundLatitude": 85.48999999999279,
                    "southBoundLatitude": 85.48999999999279,
                    "meanLatitude": 85.48999999999279,
                    "meanLongitude": 116.099999999984
                },
                "doi": "https://doi.org/10.1594/PANGAEA.940437",
                "dataset_publication_date": "2022-01-27T15:04:18+00:00",
                "temporal_coverage": {
                    "start_date": "2020-02-11T05:52:28Z",
                    "end_date": "2020-02-11T08:35:35Z"
                },
                "authors": [
                    "Marcel Nicolaus",
                    "Philipp Anhaus",
                    "Stefanie Arndt",
                    "Christian Katlein",
                    "Daniela Krampe",
                    "Benjamin Allen Lange",
                    "Ilkka Matero",
                    "Julia Regnery",
                    "Jan Rohde",
                    "Martin Schiller"
                ],
                "dataset_title": "Positioning of ROV at station PS122/2_24-70 on 2020-02-11, dive 1",
                "organization": "PANGAEA"
            }
        ]
    ]
}
```

***URL :*** `/main/persist`  
***METHOD :***  `POST`  
***PERMISSIONS :***  NONE  
***CONTENT-TYPE :*** `application/json`  
***key :*** `IDatasetID[]`   

#### SUCCESS RESPONSE

***CODE :*** `200 OK`  
***DESCRIPTION :*** Returns `IDataset[]`. It checks with the `GET /persist` first. Then is compares the key[] in the `GET /persist` with `POST /main/persist` and will return `IDataset` of only the common key between the two routes.  
***SAMPLE RESPONSE*** : ```{"key":["STACCollection/3dep-lidar-classification","Dataset/495979159","Dataset/495987210"]}```
Suppose the `/persist` has only ["Dataset/495987210"]. The Response will be:  
```
{
    "result": [
        [
            {
                "id": "Dataset/495987210",
                "locationData": {
                    "westBoundLongitude": 57.104,
                    "eastBoundLongitude": 57.104,
                    "northBoundLatitude": -32.106,
                    "southBoundLatitude": -32.106,
                    "meanLatitude": -32.106,
                    "meanLongitude": 57.104
                },
                "doi": "https://doi.org/10.1594/PANGAEA.271212",
                "dataset_publication_date": "2005-05-19T13:42:56+00:00",
                "temporal_coverage": {
                    "start_date": "1987-11-09T23:30:00Z",
                    "end_date": "1987-11-10T02:30:00Z"
                },
                "authors": [
                    "Paul T Robinson",
                    "H R P Von",
                    " Shipboard Scientific Party"
                ],
                "dataset_title": "X-ray fluorescence on samples of ODP Hole 118-734D",
                "organization": "PANGAEA"
            }
        ]
    ]
}
//Only 'Dataset/495987210' is common.
```

> :bulb: **NOTE**
> The doi links for the `STACCollection` has been given preference in the folling order : geoservice > DOI > PlanetaryComputer or stac.terrabyte.