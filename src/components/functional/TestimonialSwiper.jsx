import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

function SwiperComponent({ data }) {
  useEffect(() => {
    import("swiper/css");
    import("swiper/css/pagination");
  }, []);
  return (
    <Swiper
      slidesPerView={1}
      loop
      navigation
      pagination={{ clickable: true }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      modules={[Pagination, Autoplay]}>
      {data?.map(({ name, post, title, description }, index) => {
        return (
          <SwiperSlide key={index}>
            <div className='flex flex-col items-center justify-between border-2 border-[#1C2C3B] bg-white p-8 text-center text-[#1C2C3B] min-h-[400px]'>
              <div className='mb-6 flex gap-1 justify-center'>
                <img
                  src='/assets/img/icons/icon-green-star.svg'
                  alt='5 star rating'
                  width='26'
                  height='24'
                  loading='lazy'
                />
                <img
                  src='/assets/img/icons/icon-green-star.svg'
                  alt=''
                  width='26'
                  height='24'
                  loading='lazy'
                  aria-hidden='true'
                />
                <img
                  src='/assets/img/icons/icon-green-star.svg'
                  alt=''
                  width='26'
                  height='24'
                  loading='lazy'
                  aria-hidden='true'
                />
                <img
                  src='/assets/img/icons/icon-green-star.svg'
                  alt=''
                  width='26'
                  height='24'
                  loading='lazy'
                  aria-hidden='true'
                />
                <img
                  src='/assets/img/icons/icon-green-star.svg'
                  alt=''
                  width='26'
                  height='24'
                  loading='lazy'
                  aria-hidden='true'
                />
              </div>
              <div className='flex-grow flex flex-col justify-center'>
                <h4 className='mb-4 font-semibold text-lg'>{title}</h4>
                <p className='text-[#4B5563] leading-relaxed'>{description}</p>
              </div>
              <div className='mt-auto pt-6'>
                <span className='mb-1 block font-semibold text-lg'>{name}</span>
                <span className='text-sm text-[#6B7280]'>{post}</span>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default SwiperComponent;
