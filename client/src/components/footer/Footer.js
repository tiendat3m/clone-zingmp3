import React, { useEffect, useState } from 'react'
import { images } from '../../utils/constants'

const Footer = () => {
    const [imagesData, setImagesData] = useState(images)
    useEffect(() => {
        // Shuffle the array to change the position of images randomly
        const shuffledImages = [...imagesData].sort(() => Math.random() - 0.5);
        setImagesData(shuffledImages);
    }, []); // Empty dependency array ensures this effect runs only once on component mount
    return (
        <div className='flex flex-col justify-center items-center px-10'>
            <h3 className='mb-6 uppercase text-xs font-bold text-gray-500 hover:text-main cursor-pointer tracking-widest'>Đối tác âm nhạc</h3>
            <div className='w-full flex flex-wrap gap-5 justify-center'>
                {imagesData?.map(item => (
                    <div key={item.id} className='w-[calc(12.5%-20px)] bg-white rounded-lg '>
                        <div className='w-full h-[90px] flex justify-center items-center'>
                            <img src={item.image} alt="" className='max-w-[90%] max-h-[80%] object-contain' />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Footer
