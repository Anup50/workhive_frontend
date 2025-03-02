const Hero = () => {
  return (
    <section className="bg-base-100 hero-section">
      <div className="gridmax-w-screen-xl p-4 mx-auto lg:gap-8 xl:gap-0 lg:py-16 flex">
        <div className="lg:col-span-7 pl-6 text-left">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-base-content">
            Find Your Dream Job with Workhieve!
          </h1>
          <p className="max-w-2xl mb-6 font-light text-base-content lg:mb-8 md:text-lg lg:text-xl opacity-70">
            Explore job listings from top companies around the globe and find
            your perfect fit. Whether you're looking for a full-time position,
            part-time work, or freelance gigs, Workhieve brings you a variety of
            career options to choose from.
          </p>
          <div className="flex gap-4">
            <button className="btn btn-primary">
              Get started
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex"></div>
      </div>
    </section>
  );
};

export default Hero;
