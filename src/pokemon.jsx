import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Pokemon = ({ name, image, id }) => {
  return (
    <div className="mt-10">
      <Link to={`/pokemon/${id}`}>
        <div>
          <img
            className=" cursor-pointer w-[400px] h-[400px]"
            src={image}
            alt=""
          />
          <div className="m-2 font-Protest text-2xl text-red-900">{name}</div>
        </div>
      </Link>
    </div>
  );
};

export default Pokemon;
