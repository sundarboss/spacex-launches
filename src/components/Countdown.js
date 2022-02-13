import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SocialButtons from './SocialButtons';

const Countdown = () => {
    const [next, setNext] = useState({});
    const [countDown, setCountDown] = useState({});

    const calculateEndTime = (endtime) => {
        const endDate = new Date(endtime).getTime();
        const now = new Date().getTime();
        const timeLeft = endDate - now;

        let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        return {
            days,
            hours,
            minutes,
            seconds: Math.round(seconds)
        };
    }

    useEffect(() => {
        axios.get('https://api.spacexdata.com/v4/launches/next')
            .then((res) => {
                const counter = calculateEndTime(res.data.date_utc);
                setNext(res.data);
                setCountDown(counter);
            })
            .catch((err) => {
                console.log('error is', err)
            })
    }, []);

    useEffect(() => {
        if (next) {
            let mounted = true;

            const interval = setInterval(() => {
                if (!mounted) return;

                const counter = calculateEndTime(next.date_utc);
                setCountDown(counter);
            }, 1000);

            return () => {
                clearInterval(interval);
                mounted = false;
            };
        }
    }, [next])

    return (
        <div className='countdown'>
            <h2 className='header'>Upcoming : {next.name}</h2>
            <div className='countdown-container'>
                <div>
                    <div className='count-number'>{countDown.days}</div>
                    <div className='count-text'>DAYS</div>
                </div>
                <div>
                    <div className='count-number'>{countDown.hours}</div>
                    <div className='count-text'>HOURS</div>
                </div>
                <div>
                    <div className='count-number'>{countDown.minutes}</div>
                    <div className='count-text'>MINUTES</div>
                </div>
                <div>
                    <div className='count-number'>{countDown.seconds}</div>
                    <div className='count-text'>SECONDS</div>
                </div>
            </div>
            <SocialButtons shareUrl={window.location.href} />
        </div>
    )
}

export default Countdown;