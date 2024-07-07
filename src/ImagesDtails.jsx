/* eslint-disable react-hooks/rules-of-hooks */
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
function ImagesDtails() {
  const { id } = useParams();
  const [Pokemon, setPokemon] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  async function Download() {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    console.log(response.data);
    const typesArray = response.data.types;
    let type1 = "Not Another type";
    let type2 = "Not Another type";

    if (typesArray && typesArray.length > 0) {
      type1 = typesArray[0].type.name;
      if (typesArray.length > 1) {
        type2 = typesArray[1].type.name;
      }
    }
    setIsLoading(false);
    setPokemon({
      id: response.data.id,
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default,
      weight: response.data.weight,
      height: response.data.height,
      type1: type1,
      type2: type2,
    });
  }
  useEffect(() => {
    Download();
  }, [id]);
  return (
    <>
      {isLoading ? (
        <p className="text-center text-3xl font-semibold mt-96">Loading...</p>
      ) : (
        <>
          <div>
            <nav className="z-10 w-[100%] h-20 bg-red-950 flex items-center justify-between pl-10 pr-10">
              <p className="text-3xl font-semibold text-sky-100 cursor-pointer font-Protest">
                Pokemons
              </p>
            </nav>
          </div>
          <div className="text-center mt-10 font-semibold font-Protest text-4xl">
            Details Of {Pokemon.name}
          </div>
          <div className="flex flex-col my-10 text-center">
            <img
              className="h-[400px] w-[400px] m-auto"
              src={Pokemon.image}
              alt=""
            />
            <div className="text-2xl my-2 ">
              <span className="font-semibold font-Protest"> ID : </span>
              {Pokemon.id}
            </div>
            <div className="text-2xl my-2">
              <span className="font-semibold font-Protest"> Name : </span>
              {Pokemon.name}
            </div>
            <div className="text-2xl my-2">
              <span className="font-semibold font-Protest"> Weight : </span>
              {Pokemon.weight}
            </div>
            <div className="text-2xl my-2">
              <span className="font-semibold font-Protest"> Height : </span>
              {Pokemon.height}
            </div>
            <div className="text-2xl my-2">
              <span className="font-semibold font-Protest"> Types : </span>
              {Pokemon.type1} , {Pokemon.type2}
            </div>
          </div>
          <footer className="bg-red-950 h-60 flex flex-wrap items-center justify-between  sm:h-96 md:h-80 max-[640px]:h-96">
            <div className="text-5xl font-semibold text-sky-100 font-Protest cursor-pointer  ml-8 ">
              Pokemons
            </div>
            <div className=" text-sky-100 font-semibold text-lg mr-10 sm:ml-4 max-[640px]:ml-4">
              Pokemons Provides You Diffrents Pokemons Which Can Help You <br />{" "}
              To Do Your Work professionally.
            </div>
            <div className="flex flex-wrap flex-row items-center">
              <Link className="bg-white p-2 rounded-full ml-4 mr-8 border-4 border-pink-600 sm:mb-4 max-[640px]:mb-4">
                <FaTwitter className="text-4xl" />
              </Link>
              <Link
                className="bg-white p-2 rounded-full mr-8 border-4  border-pink-600 sm:mb-4 max-[640px]:mb-4"
                to="https://www.linkedin.com/in/kashish-prajapati-ab5064236/"
                target="blank"
              >
                <FaLinkedinIn className="text-4xl" />
              </Link>
              <Link className="bg-white p-2 rounded-full border-4 border-pink-600  mr-8 sm:mb-4 max-[640px]:mb-4">
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
                <button className="text-sky-100 w-32 h-14 rounded-r-lg  border-4 border-y-pink-600 border-x-pink-600  mr-10 font-semibold sm:mb-4 max-[640px]:mb-4 max-[640px]:rounded-lg">
                  Send
                </button>
              </form>
            </div>
          </footer>
        </>
      )}
    </>
  );
}

export default ImagesDtails;
