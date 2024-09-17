# Queries Used

## Abstract Query  

This query is used to get the abstract of a dataset by its id.  
```javascript
/**
 * @key is retrieved from the request parameters.
 * @returns - Abstract of the dataset
 */
```

## Initial Load Query  

For the initial page load, we want to get all the datasets from the  
Dataset and the STACCollection in the database.  
This query will return all the dataset ids in the database which can used as @keys(bindVars)  
in other queries which requires all the dataset ids.  

## Keyword Query  

This query is used to get all the keywords from the  
Dataset collection and the STACCollection.  
Collects all keywords and count along with dataset_ids of  
all the Dataset that contain the keyword.  

```javascript
/**
 * @param keys - Array of dataset_ids from Dataset and STACCollection
 * @returns - Array of objects containing the keyword, counts and dataset_ids in which the keyword is present
 */
```

Adding Keyword_id to the query can reduce the post array size  
But have to keep in mind that some keywods are split by comma  
and the separated keywords should also have the same keyword_id  

> NOTE:  
> '\\\\([^)]*\\\\)' In this regex, \\\\ is used to escape
           the backslash character instead of the usual \\
           So use \\([^)]*\\) while testing in Arango Console


## Main Query  

This query recieves a list of dataset_id
from a POST request,
and returns information about the PANGAEA dataset and STAC dataset
```javascript
/**
 * @param keys - Array of dataset ids
 * @returns - Array of objects containing Dataset/STACCollection information
 */
```

## Map Query  

This file contains the queries to handle the pie chart/different modes  
present in the map page. The first option is the regular map with all the datasets present  
The second option is the map with only the datasets that have a full coverage object  
The third option is the map with only the datasets that have a null coverage object  

> NOTE:  
> In the current database, the Dataset collection doesn't have any Datasets with
  full map coverage but instead has the co-ordinate [0,90,0,-90]. In the DOI of these
  datasets, the coverage is mentioned as global. Hence, the query has been modified to
  include these datasets as well.

## Time Query

This Query is used to get all the dataset_ids from the Dataset and STACCollection
that are within the given time range.

```javascript
 /**
 * @start - Start date of the time range
 * @end - End date of the time range
 *
 * @returns - Array of dataset_ids
 */
```

## Valid Query

This query is used to check if the id exists in the Dataset or STACCollection

```javascript
 /**
  * @key is retrieved from the request parameters.
  * @returns true if the id exists in either of the collections
  */
```  
This query was mainly used in __tests__  

