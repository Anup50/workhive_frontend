import { Link } from "react-router-dom";
import pageNotFoundImage from "../assets/images/404.png";

const PageNotFound = () => {
  return (
    <section className="h-screen flex flex-col items-center justify-center gap-8 text-center">
      <img
        src={pageNotFoundImage}
        className="select-none w-80 object-contain"
        alt="Page Not Found"
      />
      <h1 className="text-4xl">Page not found</h1>
      <p className="text-dark-grey text-xl leading-7 -mt-8">
        The page you are looking for does not exist. Head back to{" "}
        <Link to="/" className="text-black underline">
          Homepage
        </Link>
      </p>
    </section>
  );
};
export default PageNotFound;
