import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from "../../store/actions";
import { Section } from '../../components';

const Top100 = () => {
    const scrollRef = useRef()
    const { outstanding, vnMusic, asiaMusic, usMusic, concertMusic } = useSelector(state => state.app)
    console.log({ outstanding, vnMusic, asiaMusic, usMusic, concertMusic })
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actions.getTop100());
        scrollRef.current.scrollIntoView({ block: 'start' })
    }, []);

    return (
        <div>
            <div ref={scrollRef} className='flex justify-center items-center mt-10'>top100Image</div>
            <Section data={outstanding} isHideAllButton={true} />
            <Section data={vnMusic} isHideAllButton={true} />
            <Section data={asiaMusic} isHideAllButton={true} />
            <Section data={usMusic} isHideAllButton={true} />
            <Section data={concertMusic} isHideAllButton={true} />
        </div>
    )
}

export default Top100
