import axios from "axios"

const BASE_URL = 'http://localhost:8080'

const TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJFb19jLWp0Zi05R3Vubng0RHJvd29SblFlY0VVazRWZUdJUTF1RzZlYjFZIn0.eyJleHAiOjE3MDE2NzcxMzAsImlhdCI6MTcwMTY0MTEzMSwiYXV0aF90aW1lIjoxNzAxNjQxMTMwLCJqdGkiOiJhM2QxNzI4YS0xYmE1LTQwYTYtOTI2OC0yYTIxODEwNjkyMjciLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwOTAvcmVhbG1zL21hc3RlciIsImF1ZCI6WyJiYW5jby1taWNyb3NlcnZpY2UtcmVhbG0tcmVhbG0iLCJtYXN0ZXItcmVhbG0iLCJhY2NvdW50Il0sInN1YiI6IjM3NTAxZDNlLTFiYjQtNDg1Yy04NGEyLWY2MzY4YTQwMWY4ZSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImFkcXVpc2ljaW9uZXMtZnJvbnQiLCJub25jZSI6IjNkNzA2ZWE3LWZlYjktNDUyMy04ZTA0LTUzODY0NGUzM2ZmZiIsInNlc3Npb25fc3RhdGUiOiIwNGNkYzk4My1lZTA2LTQ4OTMtOTM2Mi0yYzQ1MmU2YjY1MjgiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImNyZWF0ZS1yZWFsbSIsImRlZmF1bHQtcm9sZXMtbWFzdGVyIiwib2ZmbGluZV9hY2Nlc3MiLCJhZG1pbiIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYmFuY28tbWljcm9zZXJ2aWNlLXJlYWxtLXJlYWxtIjp7InJvbGVzIjpbInZpZXctcmVhbG0iLCJ2aWV3LWlkZW50aXR5LXByb3ZpZGVycyIsIm1hbmFnZS1pZGVudGl0eS1wcm92aWRlcnMiLCJpbXBlcnNvbmF0aW9uIiwiY3JlYXRlLWNsaWVudCIsIm1hbmFnZS11c2VycyIsInF1ZXJ5LXJlYWxtcyIsInZpZXctYXV0aG9yaXphdGlvbiIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS11c2VycyIsIm1hbmFnZS1ldmVudHMiLCJtYW5hZ2UtcmVhbG0iLCJ2aWV3LWV2ZW50cyIsInZpZXctdXNlcnMiLCJ2aWV3LWNsaWVudHMiLCJtYW5hZ2UtYXV0aG9yaXphdGlvbiIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIl19LCJtYXN0ZXItcmVhbG0iOnsicm9sZXMiOlsidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJ2aWV3LXJlYWxtIiwibWFuYWdlLWlkZW50aXR5LXByb3ZpZGVycyIsImltcGVyc29uYXRpb24iLCJjcmVhdGUtY2xpZW50IiwibWFuYWdlLXVzZXJzIiwicXVlcnktcmVhbG1zIiwidmlldy1hdXRob3JpemF0aW9uIiwicXVlcnktY2xpZW50cyIsInF1ZXJ5LXVzZXJzIiwibWFuYWdlLWV2ZW50cyIsIm1hbmFnZS1yZWFsbSIsInZpZXctZXZlbnRzIiwidmlldy11c2VycyIsInZpZXctY2xpZW50cyIsIm1hbmFnZS1hdXRob3JpemF0aW9uIiwibWFuYWdlLWNsaWVudHMiLCJxdWVyeS1ncm91cHMiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWQiOiIwNGNkYzk4My1lZTA2LTQ4OTMtOTM2Mi0yYzQ1MmU2YjY1MjgiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6ImFkbWluIn0.I7cQLXo3v-3oXufpWZhDDLoYAlXWCPY6PQwcexE1nfPzY_HuKjbwq59PL0NxPv6A-JJuWBSaomQHA3mvq4bzNIj6Q1aYZwnbPIJL37bsOFTmr_mv-uxHhXa9HJ4UtGKiw2plOaA7kMc5L9dMhcWhQfXanG8wlIHonmgHrjSinyL5axMKzocE9XhVLz7xlLcoQSnNpyEzX0z4KuXSQk4nKO3ANsuvRdNOgsHMW1ObbFzk9GhoYAtUOJ5HlFUY7cgxw8HbSrP2Amjag4jFBtPGFkOZQZvAxiSpdpwZihi_s1gFBpxWsH0K2KUd5BZ-q3bCvWRtrr33NSpMog4KVq07TA';

export const apiGetFinancimientos = async (token) => {
    
    const config = {
        method: `get`,
        url: BASE_URL + '/fuentes-financiamiento',
        headers: { 
            'Access-Control-Allow-Origin': '*', 
            'Authorization': 'Bearer ' +  TOKEN
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
            'Authorization': 'Bearer ' +  TOKEN
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
            'Authorization': 'Bearer ' +  TOKEN
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
            'Authorization': 'Bearer ' +  TOKEN
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
            'Authorization': 'Bearer ' +  TOKEN
        }
    } 

    return await axios(config);
}
