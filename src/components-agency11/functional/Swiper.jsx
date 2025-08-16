import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

function SwiperComponent({ data }) {
  useEffect(() => {
    import("swiper/css");
  }, []);
  return (
    <Swiper
      slidesPerView={4}
      loop
      navigation
      breakpoints={{
        0: {
          slidesPerView: 2,
        },
        450: {
          slidesPerView: 2,
        },
        842: {
          slidesPerView: 3,
        },
        1100: {
          slidesPerView: 4,
        },
        1600: {
          slidesPerView: 5,
        },
      }}>
      {data?.map((image,index) => {
        return (
          <SwiperSlide key={`${image}-${index}`} className='!flex justify-center'>
            <img
              src={image}
              alt='brand-5'
              width='186'
              height='46'
              className='h-auto sm:w-fit w-[70%]'
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default SwiperComponent;
