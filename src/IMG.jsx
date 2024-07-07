import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { IoMdRocket } from "react-icons/io";
import { FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import Pokemon from "./pokemon";

const IMG = () => {
  const [Pkemons, setPkemons] = useState({
    Result: [],
    isLoading: true,
    PreUrl: "",
    Next: "",
    API: "https://pokeapi.co/api/v2/pokemon",
  });

  const GotoTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const fetchAPI = useCallback(async () => {
    try {
      const res = await axios.get(Pkemons.API);
      const PokemonResults = res.data.results;

      const PokemonResultsPromise = PokemonResults.map((pokemon) =>
        axios.get(pokemon.url)
      );
      const pokemonData = await axios.all(PokemonResultsPromise);

      const PokeListResult = pokemonData.map((PokeData) => {
        const pokemon = PokeData.data;
        return {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.other
            ? pokemon.sprites.other.dream_world.front_default
            : pokemon.sprites.front_shiny,
          types: pokemon.types,
        };
      });

      setPkemons((prevPkemons) => ({
        ...prevPkemons,
        Result: PokeListResult,
        isLoading: false,
        PreUrl: res.data.previous,
        Next: res.data.next,
      }));
    } catch (error) {
      setPkemons((prevPkemons) => ({
        ...prevPkemons,
        isLoading: false,
      }));
      console.error(error);
    }
  }, [Pkemons.API]);

  useEffect(() => {
    fetchAPI();
  }, [fetchAPI]);

  const handlePrevClick = () => {
    if (Pkemons.PreUrl) {
      setPkemons((prevPkemons) => ({
        ...prevPkemons,
        API: Pkemons.PreUrl,
      }));
    }
  };

  const handleNextClick = () => {
    if (Pkemons.Next) {
      setPkemons((prevPkemons) => ({
        ...prevPkemons,
        API: Pkemons.Next,
      }));
    }
  };

  const { isLoading, Result, PreUrl, Next } = Pkemons;

  return (
    <div className="">
      {isLoading ? (
        <p className="text-center text-3xl font-semibold mt-96">Loading...</p>
      ) : (
        <div>
          <nav className="z-10 w-[100%] fixed top-0 h-20 bg-red-950 flex items-center justify-between pl-10 pr-10">
            <p className="text-3xl font-semibold text-sky-100 cursor-pointer font-Protest">
              Pokemons
            </p>
          </nav>
          <div>
            <div className="text-center">
              <p className="text-[60px] text-red-950 font-bold mb-8 mt-24 -tracking-tighter">
                Choose Your Favorite Pokemon
              </p>
              <div className="flex flex-wrap justify-around mt-6 ">
                {Result.map((p) => (
                  <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
                ))}
              </div>
              <div className="mt-20 mb-20">
                <button
                  disabled={!PreUrl}
                  onClick={handlePrevClick}
                  className="bg-red-950 pl-6 pr-6 pt-4 pb-4 mr-10 rounded text-white font-semibold cursor-pointer"
                >
                  Previous
                </button>
                <button
                  disabled={!Next}
                  onClick={handleNextClick}
                  className="bg-red-950 pl-6 pr-6 pt-4 pb-4 ml-10 rounded text-white font-semibold cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
            <button
              className="bg-red-950 text-white w-14 h-14 pl-2 rounded-full border-2 border-sky-100 mr-10 font-semibold sm:mb-4 mb-10 fixed bottom-4 left-2"
              onClick={GotoTop}
            >
              <IoMdRocket className="text-4xl" />
            </button>
            <footer className="bg-red-950 h-60 flex flex-wrap items-center justify-between sm:h-96 md:h-80 max-[640px]:h-96">
              <div className="text-5xl font-semibold text-sky-100 font-Protest cursor-pointer ml-8 ">
                Pokemons
              </div>
              <div className=" text-sky-100 font-semibold text-lg mr-10 sm:ml-4 max-[640px]:ml-4">
                Pokemons Provides You Different Pokemons Which Can Help You{" "}
                <br /> To Do Your Work Professionally.
              </div>
              <div className="flex flex-wrap flex-row items-center">
                <Link className="bg-white p-2 rounded-full ml-4 mr-8 border-4 border-pink-600 sm:mb-4 max-[640px]:mb-4">
                  <FaTwitter className="text-4xl" />
                </Link>
                <Link
                  className="bg-white p-2 rounded-full mr-8 border-4 border-pink-600 sm:mb-4 max-[640px]:mb-4"
                  to="https://www.linkedin.com/in/kashish-prajapati-ab5064236/"
                  target="_blank"
                >
                  <FaLinkedinIn className="text-4xl" />
                </Link>
                <Link className="bg-white p-2 rounded-full border-4 border-pink-600 mr-8 sm:mb-4 max-[640px]:mb-4">
                  <FaInstagram className="text-4xl" />
                </Link>
                <form
                  className="max-[640px]:flex flex-col items-center "
                  action="https://formspree.io/f/xdoqzglg"
                  method="POST"
                >
                  <input
                    className="w-80 h-14 placeholder:font-semibold placeholder:text-gray-500 border-4 border-y-pink-600 border-x-pink-600 pl-2 rounded-l-lg outline-none sm: ml-4 sm:mb-4 max-[640px]:mb-4 max-[640px]:rounded-lg"
                    name="Enter Your Email"
                    type="text"
                    placeholder="Enter Your Email"
                    autoComplete="off"
                    required
                  />
                  <button className="text-sky-100 w-32 h-14 rounded-r-lg border-4 border-y-pink-600 border-x-pink-600 mr-10 font-semibold sm:mb-4 max-[640px]:mb-4 max-[640px]:rounded-lg">
                    {" "}
                    Send{" "}
                  </button>
                </form>
              </div>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default IMG;
