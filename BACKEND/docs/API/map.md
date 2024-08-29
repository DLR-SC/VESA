# ROUTE /map

### GET REQUEST

***URL :***  `/map/full`  
***METHOD :***  `GET`  
***PERMISSIONS :***  NONE  

#### SUCCESS RESPONSE  
***CODE :*** `200 OK`  
***DESCRIPTION :*** Returns `IDatasetID[]`. It checks for all the docs in `Dataset` and `STACCollection` collections for `IDataset` which has the spatial extent `[-180,-90,90,180]` and returns `IDatasetID[]`  
***SAMPLE RESPONSE*** :  
```
{
    "result": [
        [
            "STACCollection/S5P_TROPOMI_L3_P1D_CF",
            "STACCollection/S5P_TROPOMI_L3_P1D_HCHO",
            "STACCollection/TDM_FNF_50",
            "STACCollection/GWP_P1Y",
            "STACCollection/ENMAP_HSI_L0_QL",
            "STACCollection/TDM_DEM_90",
            "STACCollection/WSF_2015",
            "STACCollection/SUPERSITES",
            "STACCollection/S5P_TROPOMI_L3_P1D_O3",
            "STACCollection/S5P_TROPOMI_L3_P1D_COT",
            "STACCollection/GWP_P1D",
            "STACCollection/GWP_P1M",
            "STACCollection/S5P_TROPOMI_L3_P1D_CTH",
            "STACCollection/WSF_Evolution",
            "STACCollection/S5P_TROPOMI_L3_P1D_SO2",
            "STACCollection/WSF_2019",
            "STACCollection/modis-11A2-061",
            "STACCollection/esa-cci-lc",
            "STACCollection/modis-16A3GF-061",
            .
            .
            .
        ]
    ]
}
```
***URL :***  `/map/null`  
***METHOD :***  `GET`  
***PERMISSIONS :***  NONE  

#### SUCCESS RESPONSE  
***CODE :*** `200 OK`  
***DESCRIPTION :*** Returns `IDatasetID[]`. It checks for all the docs in `Dataset` and `STACCollection` collections for `IDataset` which has the missing or `null` values in the spatial extent and returns `IDatasetID[]`  
***SAMPLE RESPONSE*** :  
```
    ***SAME AS ABOVE***
```