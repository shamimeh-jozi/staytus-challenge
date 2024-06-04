import { getSpecies } from "../api/speciesApi";
import axiosInstance from "../api/axiosConfig";
import { toast } from "react-toastify";

export const fetchAllMovies = async (urls) => {
  try {
    const promises = urls.map(async (url) => {
      const response = await axiosInstance.get(url);
      return response.data;
    });

    const results = await Promise.all(promises);

    return results;
  } catch (error) {
    console.error("Error fetching data:", error);
    toast.error("Failed to fetch data. Please try again later.");
  }
};

/**
 * Fetches all species from the API by handling pagination.
 * @returns {Array} Array of all species.
 */
const getReptiles = async () => {
  let speciesUrl = getSpecies;
  const allSpecies = [];

  try {
    while (speciesUrl) {
      const response = await axiosInstance.get(speciesUrl);
      allSpecies.push(...response.data.results);
      speciesUrl = response.data.next;
    }
  } catch (error) {
    console.error("Error fetching species:", error);
    toast.error("Failed to load species. Please try again later.");
    throw error;
  }

  return allSpecies;
};

/**
 * Fetches planets that have reptile or reptilian residents.
 * Reptile or reptilian species are determined based on their classification or designation.
 * Only planets that appear in films are considered.
 *
 * @returns {Array} Array of planets with reptile or reptilian residents that appear in films.
 */
export const getPlanetsWithReptileResidents = async () => {
  try {
    const reptileSpecies = await getReptiles();

    const filteredPlanets = await Promise.all(
      reptileSpecies
        .filter(
          (specie) =>
            specie.classification === "reptile" ||
            specie.classification === "reptilian" ||
            specie.designation === "reptile" ||
            specie.designation === "reptilian"
        )
        .map(async (specie) => {
          try {
            const response = await axiosInstance.get(specie.homeworld);
            return response.data?.films.length ? response.data : null;
          } catch (error) {
            console.error(
              `Error fetching homeworld for species ${specie.name}:`,
              error
            );
            return null;
          }
        })
    );

    return filteredPlanets.filter((planet) => planet !== null);
  } catch (error) {
    console.error("Error fetching planets:", error);
    toast.error("Failed to load planets. Please try again later.");
    throw error;
  }
};
