import { getPlanetsWithReptileResidents } from "../services/index";
import { useCustomState } from "../stateManagement/useCustomState";
import { useEffect } from "react";
import PlanetCard from "./PlanetCard";

function PlanetsWithReptileResidents() {
  const [state, dispatch] = useCustomState({ planets: [], loading: false });
  const setPlanets = (planets) => dispatch(() => ({ planets }));
  const setLoading = (loading) => dispatch(() => ({ loading }));
  const { loading, planets } = state;

  useEffect(() => {
    setLoading(true);
    getPlanetsWithReptileResidents()
      .then((planets) => {
        setPlanets(planets);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-3'>
      <h1 className='text-3xl font-bold text-black'>
        Planets with Reptile Residents
      </h1>
      {loading && <p className='text-xl text-black mt-3 mb-3'>Loading...</p>}
      <div>
        {!loading &&
          planets.map((planet) => (
            <PlanetCard planet={planet} key={planet.name} />
          ))}
      </div>
    </div>
  );
}

export default PlanetsWithReptileResidents;
