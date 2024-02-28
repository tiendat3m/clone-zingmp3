import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from "../../store/actions";
import { Loading, Section } from '../../components';

const Top100 = () => {
    const scrollRef = useRef()
    const { outstanding, vnMusic, asiaMusic, usMusic, concertMusic } = useSelector(state => state.app)
    // console.log({ outstanding, vnMusic, asiaMusic, usMusic, concertMusic })
    const dispatch = useDispatch()
    useEffect(() => {
        scrollRef.current.scrollIntoView({ block: 'start' })
        dispatch(actions.getTop100());
    }, []);

    return (
        <div ref={scrollRef}>
            {(outstanding && vnMusic && asiaMusic && usMusic && concertMusic) ? <div className='py-[100px] flex flex-col relative flex-auto'>
                <Section data={outstanding} isHideAllButton={true} />
                <Section data={vnMusic} isHideAllButton={true} />
                <Section data={asiaMusic} isHideAllButton={true} />
                <Section data={usMusic} isHideAllButton={true} />
                <Section data={concertMusic} isHideAllButton={true} />
            </div> : <div className='absolute top-0 left-0 z-20 bottom-0 right-0 bg-layout flex items-center justify-center'>
                <Loading />
            </div>}
        </div>
    )
}

export default Top100
