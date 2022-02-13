import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Upcoming = () => {
    const [launches, setLaunches] = useState([]);
    const [favIds, setFavIds] = useState([]);

    const month = useMemo(() => {
        return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    }, [])

    const getDateSuffix = (num) => {
        let suffix = (num >= 4 && num <= 20) || (num >= 24 && num <= 30) ? 'th' : ['st', 'nd', 'rd'][num % 10 - 1];
        return num + suffix;
    }
    
    const getFormatDate = useCallback((date) => {
        const newDate = new Date(date);

        const year = newDate.getUTCFullYear();
        const mon = month[newDate.getUTCMonth()];
        const day = getDateSuffix(newDate.getUTCDate());
        const hour = newDate.getUTCHours() === 0 ? '00' : newDate.getUTCHours().toString();
        const mins = newDate.getUTCMinutes() === 0 ? '00' : newDate.getUTCMinutes().toString();

        if (hour === '00' && mins === '00') {
            return `${mon} ${day} ${year}`;
        } else {
            return `${mon} ${day} ${year}, ${hour}:${mins}`;
        }
    }, [month]);

    useEffect(() => {
        let launchesAPI = 'https://api.spacexdata.com/v4/launches/upcoming';
        let launchPadAPI = 'https://api.spacexdata.com/v4/launchpads';

        const reqLaunches = axios.get(launchesAPI);
        const reqLaunchPads = axios.get(launchPadAPI);

        let favorites = JSON.parse(localStorage.getItem("favs"));

        if (favorites) {
            let ids = favorites.map((fav) => fav.id);
            setFavIds(ids);
        }

        axios.all([reqLaunches, reqLaunchPads])
            .then(axios.spread((...response) => {
                const launchPads = response[1].data;

                const launches = response[0].data.map((launch) => {
                    let id = launch.id;
                    let mission = launch.name;
                    let date = getFormatDate(launch.date_utc);
                    let launchPad = '';
                    let pad = launchPads.find((pad) => pad.id === launch.launchpad);
                    if (pad) {
                        launchPad = pad.name
                    }

                    return {
                        id,
                        mission,
                        date,
                        launchPad
                    }
                })
                
                setLaunches(launches);
            }))
            .catch((err) => {
                console.log('Error is', err)
            });
    }, [getFormatDate])

    const onFavoriteClick = (launcher) => {
        let favorites = JSON.parse(localStorage.getItem("favs"));

        if (favorites) {
            if (!favIds.includes(launcher.id)) {
                let newFavorites = [...favorites, launcher];
                localStorage.setItem('favs', JSON.stringify(newFavorites));
                setFavIds(prevIds => [...prevIds, launcher.id]);
            } else {
                let newFavorites = favorites.filter((launch) => {
                    return launch.id !== launcher.id
                });
                localStorage.setItem('favs', JSON.stringify(newFavorites));
                setFavIds(prevIds => prevIds.filter((id) => id !== launcher.id));
            }
        } else {
            let newFavorites = [launcher];
            localStorage.setItem('favs', JSON.stringify(newFavorites));
            setFavIds(prevIds => [...prevIds, launcher.id]);
        }
    }

    return (
        <div className='upcoming'>
            <h2 className='header'>Upcoming - Next Launches</h2>
            <div className='table-container'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Mission</th>
                        <th>Date - UTC</th>
                        <th>Launchpad</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {launches.map((launch) => {
                        return (
                            <React.Fragment key={launch.id}>
                            <tr>
                                <td>{launch.mission}</td>
                                <td>{launch.date}</td>
                                <td>{launch.launchPad}</td>
                                <td>
                                    <FontAwesomeIcon 
                                     icon={faHeart} 
                                     className={favIds.includes(launch.id) ? 'favorite-btn-active' : 'favorite-btn'} 
                                     onClick={() => onFavoriteClick(launch)}
                                    >
                                    </FontAwesomeIcon>
                                </td>
                            </tr>
                            </React.Fragment>
                        )
                    })}
                </tbody>
            </table>
            </div>         
        </div>
    )
}

export default Upcoming;