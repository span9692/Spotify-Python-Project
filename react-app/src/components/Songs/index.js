import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getSongs } from '../../store/song'
import Player from '../Player'

function SongList() {
    const dispatch = useDispatch()

    const songs = useSelector(state => Object.values(state.song))

    useEffect(() => {
        dispatch(getSongs())
    }, [dispatch])

    return (
        <div>
            HELLO FROM SONGLIST
            {songs.map(song => (
                <div key={song.id}>
                    {song.title} -- {song.artist}
                </div>
            ))}
            <Player />
        </div>
    )
}

export default SongList;