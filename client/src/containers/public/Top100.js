import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from "../../store/actions";
import { Section } from '../../components';
import top100 from '../../assets/top100.PNG'

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
        <div ref={scrollRef} className='py-[100px]'>
            <Section data={outstanding} isHideAllButton={true} />
            <Section data={vnMusic} isHideAllButton={true} />
            <Section data={asiaMusic} isHideAllButton={true} />
            <Section data={usMusic} isHideAllButton={true} />
            <Section data={concertMusic} isHideAllButton={true} />
        </div>
    )
}

export default Top100
