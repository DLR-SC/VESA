import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const API_KEY = process.env.GEOCODE_API_KEY;

export const getLocationNameFromAPI = async (
  lat: `${number}`,
  lon: `${number}`
) => {
  try {
    const response = await axios.get(
      `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}&api_key=${API_KEY}`
    );

    if (response.data && response.data.address) {
      const { address } = response.data;

      if (address.state_district) {
        return `${address.state_district}, ${address.country}`;
      } else if (address.locality) {
        return `${address.locality}, ${address.country}`;
      } else if (address.state) {
        return `${address.state}, ${address.country}`;
      } else {
        return address.country;
      }
    }
    if (response.data.error === "Unable to geocode") {
      return "";
    }
    if (response.data && response.data.error) {
      if (response.data.error.code) {
        return `Code: ${response.data.error.code}, Message: ${response.data.error.message}`;
      }
    } else {
      return `Error fetching location data: ${response.data}`;
    }
  } catch (error) {
    console.error("Error fetching location data:", error);
    throw error; // Rethrow the error for the caller to handle
  }
};
