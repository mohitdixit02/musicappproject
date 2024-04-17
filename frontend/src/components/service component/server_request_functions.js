import axios from "axios";

//Song and Artist complete Data
async function GetSong() {
    try {
        return axios.get('/req_data/').then((response) => (response.data))
    } catch { }
}
async function GetArtist() {
    try {
        return axios.get('/req_data/artist').then((response) => response.data);
    } catch { }
}

//Sent Artist Info
async function GetArtistinfo(name) {
    try {
        return axios.get(`/req_data/artist/${name}`).then((response) => response.data);
    } catch { }
}

//Sent Album Info
async function GetAlbuminfo(name) {
    try {
        return axios.get(`/req_data/album/${name}`).then((response) => response.data);
    } catch { }
}

//Sent Music Info
async function GetMusicinfo(id) {
    try {
        return axios.get(`/req_data/${id}`).then((response) => response.data);
    } catch { }
}

//Catg Function
async function GetCategory(name){
    try {
        return axios.get(`/req_data/catg/${name}`).then((response) => response.data);
    } catch { }
}

export { GetSong, GetArtist, GetArtistinfo, GetAlbuminfo, GetMusicinfo, GetCategory }