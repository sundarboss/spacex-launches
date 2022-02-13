import React, {useState, useEffect} from 'react';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("favs"));
        setFavorites(items);
    }, [])

    return (
        <div className='upcoming'>
            <h2 className='header'>Favorite Launches</h2>
            <div className='table-container'>
            {favorites.length ? (
            <table className='table'>
                <thead>
                    <tr>
                        <th>Mission</th>
                        <th>Date - UTC</th>
                        <th>Launchpad</th>
                    </tr>
                </thead>
                <tbody>
                    {favorites && favorites.map((launch) => {
                        return (
                            <React.Fragment key={launch.id}>
                            <tr>
                                <td>{launch.mission}</td>
                                <td>{launch.date}</td>
                                <td>{launch.launchPad}</td>
                            </tr>
                            </React.Fragment>
                        )
                    })}
                </tbody>
            </table>
            ) : (
                <h3 className='header'>No Favorites</h3>
            )}
            </div>
        </div>
    )
}

export default Favorites;