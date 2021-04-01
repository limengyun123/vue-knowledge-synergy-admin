import axios from 'axios';

export const getTeamsApi = (param) =>{
    return axios.post('team/getTeams', param);
}

export const freezeTeamApi = (param) =>{
    return axios.post('team/freezeTeam', param);
}