type ICoordinates = {
  westBoundLongitude?: number | string | null;
  eastBoundLongitude?: number | string | null;
  southBoundLatitude?: number | string | null;
  northBoundLatitude?: number | string | null;
  meanLatitude: number | string | null;
  meanLongitude: number | string | null;
};

const getMapType = (coordinates: ICoordinates): boolean => {
  const {
    westBoundLongitude,
    eastBoundLongitude,
    southBoundLatitude,
    northBoundLatitude,
    meanLatitude,
    meanLongitude,
  } = coordinates;

  if (
    ((westBoundLongitude === -180.0 || westBoundLongitude === "-180.0") &&
      (eastBoundLongitude === 180.0 || eastBoundLongitude === "180.0") &&
      (southBoundLatitude === -90.0 || southBoundLatitude === "-90.0") &&
      (northBoundLatitude === 90.0 || northBoundLatitude === "90.0")) ||
    (meanLatitude === 0.0 && meanLongitude === 0.0)
  )
    return true;
  else return false;
};

export default getMapType;
