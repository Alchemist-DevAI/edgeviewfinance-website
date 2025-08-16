import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

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
      modules={[Pagination]}>
      {data?.map(({ name, post, title, description }, index) => {
        return (
          <SwiperSlide key={index}>
            <div className='flex flex-col items-center justify-center rounded-[10px] border-2 border-ColorDark bg-white p-[30px] text-center text-ColorDark'>
              <div className='mb-[30px] flex gap-[5px]'>
                <img
                  src='/assets/img/icons/icon-green-star.svg'
                  alt='icon-green-star'
                  width='26'
                  height='24'
                />
                <img
                  src='/assets/img/icons/icon-green-star.svg'
                  alt='icon-green-star'
                  width='26'
                  height='24'
                />
                <img
                  src='/assets/img/icons/icon-green-star.svg'
                  alt='icon-green-star'
                  width='26'
                  height='24'
                />
                <img
                  src='/assets/img/icons/icon-green-star.svg'
                  alt='icon-green-star'
                  width='26'
                  height='24'
                />
                <img
                  src='/assets/img/icons/icon-green-star.svg'
                  alt='icon-green-star'
                  width='26'
                  height='24'
                />
              </div>
              <span className='mb-[5px] block font-semibold'>{title}</span>
              <p className='mb-[30px]'>{description}</p>
              <div className=''>
                <span className='mb-[5px] block font-semibold'>{name}</span>
                <span className='text-sm'>{post}</span>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default SwiperComponent;
