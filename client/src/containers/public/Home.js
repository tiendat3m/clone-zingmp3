import React, { memo, useEffect, useRef } from "react";
import { Slider, Section, NewRelease, ChartSection, Artist, Footer, Loading } from "../../components";
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import Sliders from 'react-slick'
const Home = () => {
  const { isLoading } = useSelector(state => state.app)

  const scrollRef = useRef()
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
  };
  const { radio, top100, weekChart, favoritedArtists, singers, chill, hotAlbum } = useSelector(state => state.app)
  console.log(top100)
  useEffect(() => {
    scrollRef.current.scrollIntoView({ block: 'start' })
  }, [])
  return (
    <>
      <div ref={scrollRef} className="w-full">
        {isLoading && <div className='absolute top-0 left-0 z-20 bottom-0 right-0 bg-sidebar flex items-center justify-center'>
          <span><Loading /></span>
        </div>}
        <div className="w-full h-[70px]"></div>
        <Slider />
        <NewRelease />
        <Section data={favoritedArtists} isHideAllButton />
        <ChartSection />
        <div className="flex items-center px-[43px] w-full mt-12">
          {weekChart?.map(item => (
            <Link
              to={item.link?.split(".")[0]} key={item.link}
              className="flex-1 px-4"
            >
              <img src={item.cover} alt="cover" className="w-full object-cover rounded-md" />
            </Link>
          ))}
        </div>
        {singers && <div className={`px-[43px] w-full mt-12 `}>
          <Sliders {...settings}>
            {singers?.map(item => (
              <div
                key={item.id}
                className='px-4'
              >
                <Artist
                  image={item.thumbnail}
                  follower={item.totalFollow}
                  link={item.link}
                  title={item.name}
                />
              </div>
            ))}
          </Sliders>
        </div>}
        <Section data={top100} />
        <Section data={chill} />
        <Section data={hotAlbum} />
        <div className="px-[43px] w-full mt-12">
          <Footer />
        </div>
        <div className="h-[120px]"></div>
      </div>
    </>
  );
};

export default memo(Home);
