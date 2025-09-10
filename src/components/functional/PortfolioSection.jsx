import { useState } from "react";
import { slug } from "github-slugger";
function PortfolioSection({ portfolio, uniqueCategories }) {
  const [data, setData] = useState(portfolio);
  const [active, setActive] = useState(null);
  return (
    <div className='section-portfolio'>
      <div className='section-space'>
        <div className='container-default'>
          <div className='flex flex-wrap justify-center gap-3 md:gap-6'>
            <button
              className={`${
                active ? "" : "active"
              } btn tab-btn-blue is-rounded h-12`}
              onClick={() => {
                setData([...portfolio]);
                setActive(null);
              }}>
              Show All
            </button>
            {Array.from(uniqueCategories, (categoryLabel) => (
              <button
                key={categoryLabel}
                className={`${
                  active === categoryLabel ? "active" : ""
                } btn tab-btn-blue is-rounded h-12`}
                onClick={() => {
                  setActive(categoryLabel);
                  setData([
                    ...portfolio.filter(
                      ({ data }) => data.category === categoryLabel
                    ),
                  ]);
                }}>
                {categoryLabel}
              </button>
            ))}
          </div>

          <div className='my-10 lg:my-[60xp] xl:my-20'>
            <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
              {data &&
                data.map(
                  (
                    {
                      data: { image, category, type, shortDescription, title },
                    },
                    index
                  ) => (
                    <div className='jos' key={`portfolio-${index}`}>
                      <div className='group'>
                        <div className='hover-solid-shadow'>
                          <div className='overflow-hidden rounded-[10px]'>
                            <img
                              src={image}
                              alt='portfolio-modern-img-1'
                              width='406'
                              height='350'
                              className='h-full w-full object-cover transition-all duration-300 ease-in-out group-hover:scale-105'
                            />
                          </div>
                        </div>
                        <div className='mt-8'>
                          <div className='mb-3 flex flex-wrap gap-2 text-xl leading-[1.33] -tracking-[0.5px] text-ColorBlack group-hover:text-ColorLime lg:flex-nowrap xl:text-2xl'>
                            <a
                              href={`portfolio/${slug(title)}`}
                              className='font-semibold'>
                              {type}
                            </a>
                            <span>—</span>
                            <a
                              href={`portfolio/${slug(title)}`}
                              className='hover:text-ColorLime'>
                              {category}
                            </a>
                          </div>
                          <p className='line-clamp-2 text-base sm:max-w-[350px]'>
                            {shortDescription}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PortfolioSection;
