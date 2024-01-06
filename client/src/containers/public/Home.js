import React, { memo, useEffect, useRef } from "react";
import { Slider, Section, NewRelease, ChartSection, Artist } from "../../components";
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import Sliders from 'react-slick'
const Home = () => {
  const scrollRef = useRef()
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
  };
  const { friday, radio, top100, xone, newMusic, weekChart, favoritedArtists, singers, chill, hotAlbum, currentWidth } = useSelector(state => state.app)
  // console.log(radio)
  useEffect(() => {
    scrollRef.current.scrollIntoView({ block: 'start' })
  }, [])
  return (
    <div ref={scrollRef} className="w-full">
      <div className="w-full h-[70px]"></div>
      <Slider />
      {/* <Section data={friday}/> */}
      {/* <Section data={chill}/> */}

      <NewRelease />
      <Section data={favoritedArtists} />
      {/* <Section data={newEveryday} /> */}
      {/* <Section data={xone} /> */}
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
      <Section data={hotAlbum} />
      {/* <Section data={newMusic} /> */}
      <div className="w-full h-[500px]"></div>
    </div>
  );
};

export default memo(Home);
