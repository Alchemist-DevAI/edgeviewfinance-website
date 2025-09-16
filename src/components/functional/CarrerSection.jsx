import { slug } from "github-slugger";
import { useState } from "react";


function CarrerSection({ CareerData, uniqueCategories }) {
  const [data, setData] = useState(CareerData);
  const [active, setActive] = useState(null);
  return (
    <div class='section-space'>
      <div class='container-default'>
        <img
          src='/assets/img/th-1/careers-hero-image.jpg'
          alt='careers-hero-image'
          width='1296'
          height='600'
          class='mb-[60px] h-auto w-full rounded-[10px] lg:mb-20'
        />

        <div class='jos mb-[60px] flex flex-wrap justify-center gap-10 text-center lg:mb-20 xl:justify-between xl:text-left'>
          <div>
            <h2>Curently open positions</h2>
          </div>

          <div class='flex flex-wrap justify-center gap-4'>
            <button
              className={`${
                active ? "" : "active"
              } btn tab-btn-blue is-rounded h-[50px]`}
              onClick={() => {
                setData(CareerData);
                setActive(null);
              }}>
              Show All
            </button>
            {Array.from(uniqueCategories, (categoryLabel) => (
              <button
                key={categoryLabel}
                className={`${
                  active === categoryLabel ? "active" : ""
                } btn tab-btn-blue is-rounded h-[50px]`}
                onClick={() => {
                  setActive(categoryLabel);
                  setData([
                    ...CareerData.filter(
                      ({ data }) => data.category === categoryLabel
                    ),
                  ]);
                }}>
                {categoryLabel}
              </button>
            ))}
          </div>
        </div>

        <div class='tab-content grid gap-6 md:grid-cols-2'>
          {data?.map(
            ({
              data: { position, salaryRange, type, description, location },
            }) => (
              <div class='jos' data-jos_delay='0.3'>
                <div class='group rounded-[10px] border border-[#E6E6E6] bg-white p-[30px] transition-all duration-300 hover:border-ColorOffWhite hover:bg-ColorOffWhite md:p-10'>
                  <div class='mb-[15px] text-xl font-semibold tracking-tighter text-ColorBlack md:text-2xl'>
                    {position}
                  </div>
                  <p class='mb-0 text-ColorBlack/80'>
                    {description.split(" ").splice(0, 20).join(" ")}
                    {description.split(" ")[21] ? "..." : ""}
                  </p>
                  <div class='my-5 flex flex-wrap gap-x-6 gap-y-3 text-ColorBlack md:my-[30px]'>
                    <div class='flex gap-1'>
                      <span>
                        <i class='fa-solid fa-clock' />
                      </span>
                      {type}
                    </div>
                    <div class='flex gap-1'>
                      <span>
                        <i class='fa-sharp fa-solid fa-location-dot' />
                      </span>
                      {location}
                    </div>
                    <div class='flex gap-1'>
                      <span>
                        <i class='fa-solid fa-money-bills-simple' />
                      </span>
                      {salaryRange}
                    </div>
                  </div>
                  <a
                    href={`career/${slug(position)}`}
                    class='inline-flex items-center gap-x-2 text-base font-bold text-ColorBlack group-hover:text-ColorLime'>
                    Apply now
                    <span class='transition-all duration-300 ease-in-out group-hover:translate-x-2'>
                      <i class='fa-solid fa-arrow-right' />
                    </span>
                  </a>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default CarrerSection;
