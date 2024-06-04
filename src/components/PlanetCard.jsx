import { useEffect, useState } from "react";
import { fetchAllMovies } from "../services";

function PlanetCard({ planet }) {
  const { name, climate, films, created } = planet;

  const [planetFilms, setPlanetFilms] = useState([]);

  useEffect(() => {
    fetchAllMovies(films).then((response) => {
      setPlanetFilms(response);
    });
  }, [films]);

  return (
    <>
      <div className='bg-dark-gray rounded-lg shadow-md overflow-hidden mt-3 mb-3 p-3'>
        <div>
          <p className='text-custom-yellow col-span-3 mb-2'>
            {new Date(created).toLocaleDateString("en-US", {
              weekday: "short",
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })}
          </p>

          <div className='grid grid-cols-2 gap-4'>
            <div className='flex col-span-1'>
              <img
                className='w-12 h-12 object-cover'
                src='https://via.placeholder.com/300x150'
                alt='Planet'
              />
              <div className='ml-2'>
                <h2 className='text-2xl font-bold text-white'>{name}</h2>
                <div className='flex justify-between'>
                  <p>
                    <span className='text-gray-300 mr-2'>Films:</span>
                    {planetFilms.map((film, index) => (
                      <span className='text-gray-300 mr-2'>
                        {film.title}
                        {index !== planetFilms.length - 1 ? "," : null}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
            <div className='col-span-1 flex justify-end'>
              <p className='text-gray-400'>Climate: {climate}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlanetCard;
