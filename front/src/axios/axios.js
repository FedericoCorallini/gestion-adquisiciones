import axios from "axios"
import { keycloakToken } from "../keycloak";

const BASE_URL = 'http://localhost:8080'

//const TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJEQzA2UTdvUzVIZ1J3SUNaRGVMVWd0WXBYWTVKWlc1aUpOd1Ixd1pEWTgwIn0.eyJleHAiOjE3MDE2NTU3MzYsImlhdCI6MTcwMTY1NTQzNiwiYXV0aF90aW1lIjoxNzAxNjUzNDMwLCJqdGkiOiJhOGI3Mjg4NC01NWQwLTQwYjEtOTQxYy0wYzhiNTk3YjRiYmIiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODgvcmVhbG1zL2Jhc2ljIiwiYXVkIjpbInNwcmluZy1hZHF1aXNpY2lvbmVzIiwiYWNjb3VudCJdLCJzdWIiOiJmYjljOTEyMy1jMTAzLTQxNzUtOTE5MC02YmQ5OGU3MTM3ZjUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJyZWFjdC1hcHAiLCJub25jZSI6IjY5YjRlNTE1LTBkMGMtNGFhMC05YTdkLWM0NzNmMzVlZjE3OCIsInNlc3Npb25fc3RhdGUiOiJjZjlkZGU2ZC02YjU1LTQ2YjctYThmZi0yMjQyMmU4OWVlODEiLCJhY3IiOiIwIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtYmFzaWMiLCJTWVNfQURNSU4iLCJvZmZsaW5lX2FjY2VzcyIsIkRpcmVjdG9yIiwicmVhbG1BZG1pbiIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsic3ByaW5nLWFkcXVpc2ljaW9uZXMiOnsicm9sZXMiOlsiYWRtaW5fY2xpZW50X3JvbGUiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWQiOiJjZjlkZGU2ZC02YjU1LTQ2YjctYThmZi0yMjQyMmU4OWVlODEiLCJiaXJ0aGRhdGUiOiIxNC0xMS0xOTg5IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJhcGVsbGlkbyI6ImNvcmFsbGluaSIsInByZWZlcnJlZF91c2VybmFtZSI6ImFkbWluMSIsImdpdmVuX25hbWUiOiIiLCJub21icmUiOiJmZWRlcmljbyIsImZhbWlseV9uYW1lIjoiIiwiZG5pIjoiMzUwMTczMjEifQ.bk7NkIYYjctO6DfC700shMKxGm7CNg89MSQOmvQnpioZRn4yKpIYgzGzUNnXeRpqRNyAaw8PzC_VHiSP5_NEnIH_R4LR-EsVlIAEaOw12KQp10-HdXNTMZuPWepJpKaOVdl-mDC9GoIoULGubUMecdpXMKKbECJHE594SNaLdwiD368ZKHDY6dAdadRGdkR92E98y92qRSz5GsfL3Ij2mj2ctOgVCLUsyPnGwZLqI1iO5cQ5xgmpVVPSiC-9vhtxr3Ayx1I1rtkG7_Aaz2Wyb0_kByhNg4_JsqTUG70WO0Ha6QruP7VAy9YkY6sWKrtoqcqJ4YkSy0dxmahQfKp8cQ';

export const apiGetFinancimientos = async () => {
    
    const config = {
        method: `get`,
        url: BASE_URL + '/fuentes-financiamiento',
        headers: { 
            'Access-Control-Allow-Origin': '*', 
            'Authorization': 'Bearer ' +  sessionStorage.getItem('jwt')
        }
    } 

    return await axios(config);
}

export const apiGetAdquisiciones = async (url) => {
    
    const config = {
        method: `get`,
        url: url,
        headers: { 
            'Access-Control-Allow-Origin': '*', 
            'Authorization': 'Bearer ' +  sessionStorage.getItem('jwt')
        }
    } 

    return await axios(config);
}

export const apiPostAdquisicion = async ( data ) => {

    console.log(data);

    const config = {
        method: data.method,
        url: data.url,
        data: data.data,
        headers: { 
            'Access-Control-Allow-Origin': '*', 
            'Authorization': 'Bearer ' +  sessionStorage.getItem('jwt')
        }
    }

    return await axios(config);
}

export const apiDeleteAdquisicion = async (url, id ) => {

    const config = {
        method: 'delete',
        url: url + '/' + id,
        headers: { 
            'Access-Control-Allow-Origin': '*', 
            'Authorization': 'Bearer ' +  sessionStorage.getItem('jwt')
        }
    }

    return await axios(config);
}

export const apiGetFinanciamiento = async (url) => {
    
    const config = {
        method: `get`,
        url: url,
        headers: { 
            'Access-Control-Allow-Origin': '*', 
            'Authorization': 'Bearer ' +  sessionStorage.getItem('jwt')
        }
    } 

    return await axios(config);
}
