import ButtonMenu from "./ButtonMenu";
import { useLocation,} from "react-router-dom";
function NavSearch() {
    const { pathname } = useLocation();
    const path = pathname.split("/")[2];
    
    return (
        <div className="px-8 py-5 flex gap-3 fixed top-mtHeader left-leftContent right-0 w-full bg-black z-50">
            <ButtonMenu to={`/search`} title='All' isActive={path === undefined} />
            <ButtonMenu to={`/search/artists`} title='Artists' isActive={path === "artists"} />
            <ButtonMenu to={`/search/songs`} title='Songs' isActive={path === "songs"} />
            <ButtonMenu to={`/search/playlists`} title='Playlists' isActive={path === "playlists"} />
            <ButtonMenu to={`/search/albums`} title='Albums' isActive={path === "albums"} />
            <ButtonMenu to={`/search/podcastAndEpisodes`} title='Podcasts & Shows' isActive={path === "podcastAndEpisodes"} />
            <ButtonMenu to={`/search/genres`} title='Genres & Moods' isActive={path === "genres"} />
            <ButtonMenu to={`/search/users`} title='Profiles' isActive={path === "users"} />
        </div>
    );
}
export default NavSearch;