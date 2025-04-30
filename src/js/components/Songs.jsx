import React, { useEffect, useRef, useState } from "react";

const SongsPlayer = () => {
    const [users, setUser] = useState(null)
    const [error, setError] = useState(null)
    const [currentSong, setCurrentSong] = useState(null)
    const [index, setIndex] = useState(0)
    const [isPlay, setIsPlay] = useState(false)
    const [isShuffle, setIsShuffle] = useState(false)
    const audio = useRef(null)

    useEffect(() => {
        songsSearch()
    }, [])

    async function songsSearch() {
        try {
            const response = await fetch('https://playground.4geeks.com/sound/songs', {
                method: 'GET',
                headers: {
                    'Content-Type': 'audio/mpeg'
                }
            })

            if (response.status === 404) throw Error("Pagina no encontrada");

            const responseJson = await response.json()
            setUser(responseJson.songs)
        } catch (error) {
            setError('Ha ocurrido un error: ' + error.message)
            console.log('Ha ocurrido un error: ' + error.message);
        }
    }

    const songAct = (index) => {
        if (isShuffle !== true) {
            setIndex(index)
            setIsPlay(true)
            console.log(index);
            setCurrentSong(users[index].url);
            setTimeout(() => {
                audio.current.play();
            }, 0);
        } else if (isShuffle === true) {
            setIndex(Math.floor(Math.random() * users.length))
            setIsPlay(true)
            setCurrentSong(users[index].url);
            console.log(Math.floor(Math.random() * users.length));
            setTimeout(() => {
                audio.current.play();
            }, 0);
        }
    }

    const handlePrev = () => {
        if (isShuffle !== true && index > 1) {
            setIsPlay(true)
            setIndex(index - 1)
            setCurrentSong(users[index - 1].url);
            setTimeout(() => {
                audio.current.play();
            }, 0);
        } else if (isShuffle === true) {
            setIndex(Math.floor(Math.random() * users.length))
            setIsPlay(true)
            setCurrentSong(users[index].url);
            console.log(Math.floor(Math.random() * users.length));
            setTimeout(() => {
                audio.current.play();
            }, 0);
        }


    }

    const handleNext = () => {
        if (isShuffle !== true && index > 1 && index < users.length) {
            setIsPlay(true)
            setIndex(index + 1)
            setCurrentSong(users[index + 1].url);
            setTimeout(() => {
                audio.current.play();
            }, 0);
        } else if (isShuffle === true) {
            setIndex(Math.floor(Math.random() * users.length))
            setIsPlay(true)
            setCurrentSong(users[index].url);
            console.log(Math.floor(Math.random() * users.length));
            setTimeout(() => {
                audio.current.play();
            }, 0);
        }
    }

    return (
        <div>
            {users !== null && typeof users === 'object' ? <div className="container-fluid position-absolute top-50 start-50 translate-middle d-flex flex-column justify-content-center align-items-center">
                <div className="boxStyle">
                    <div className="songStyle">
                        {users.map((user, index) => {
                            return (
                                <button className="list-group-item listStyle text-start ps-4" key={user.id} onClick={() => { songAct(index); }}>
                                    <label className="pe-5">{user.id}</label> {user.name + ' -'}
                                </button>
                            )
                        })}
                    </div>
                    <div className="playerStyle d-flex justify-content-between align-items-center px-4">
                        <audio ref={audio} src={currentSong !== null ? `https://playground.4geeks.com${currentSong}` : ""}  ></audio>
                        <div className="d-flex justify-content-center gap-2 mt-1" >
                            <button className="btnStyle" onClick={() => { handlePrev() }}><i className="ri-arrow-left-box-fill liHov fs-3"></i></button>
                            {isPlay ? <button className="btnStyle" onClick={() => { audio.current.pause(); setIsPlay(false) }}><i className="ri-pause-line liHov fs-3"></i></button> :
                                <button className="btnStyle" onClick={() => { audio.current.play(); setIsPlay(true) }}><i className="ri-play-fill liHov fs-3"></i></button>}
                            <button className="btnStyle" onClick={() => { handleNext() }}><i className="ri-arrow-right-box-fill liHov fs-3"></i></button>
                        </div>
                        <div>

                        </div>
                        <div className="mt-1">
                            <button className="btnStyle" onClick={() => { setIsShuffle(isShuffle ? false : true); }}><i className={`ri-shuffle-line liHov fs-4 ${isShuffle ? 'liChange' : ''}`}></i></button>
                        </div>
                    </div>
                </div>
            </div> : <div className="alert alert-danger col-12 container-fluid" role="alert" >
                {error}
            </div>}
        </div>

    )
}
export default SongsPlayer