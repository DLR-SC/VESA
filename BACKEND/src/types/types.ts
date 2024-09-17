export interface IDataset {
  id: IDatasetID;
  locationData: ILocation;
  doi: IDoi;
  dataset_publication_date?: IPublicationDate;
  temporal_coverage: {
    start_date: string | null;
    end_date: string | null;
  };
  authors?: IAuthor[];
  providers?: IProvider[];
  dataset_title: ITitle;
  organization: "PANGAEA" | "Earth Observatory";
}

export interface ILocation {
  west_bound_longitude: `${number}` | null;
  east_bound_longitude: `${number}` | null;
  north_bound_longitude: `${number}` | null;
  south_bound_longitude: `${number}` | null;
  mean_latitude: `${number}` | null;
  mean_longitude: `${number}` | null;
}

export interface IDate {
  pub_date: string | null;
}

export interface IKeyword {
  keyword: string;
  count: number;
  dataset_id: IDatasetID[];
}

//Dataset attributes
export type IDatasetID =
  | `Dataset/${IDatasetKEY}`
  | `STACCollection/${IDatasetKEY}`;
export type IDatasetKEY = number | string;
export type IAbstract = string | null;
export type ITitle = string | null;
export type IAuthor = string | null;
export type IProvider = string | null;
export type IDoi = string | null;
export type IPublicationDate = string | null;

//Database types
export type AQLQuery = string;
