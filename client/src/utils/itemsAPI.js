import withQuery from 'with-query'

const api = "http://127.0.0.1:3000/todo";
let token = localStorage.token;

if (!token) {
    token = localStorage.token = Math.random()
        .toString(36)
        .substr(-8);
}

const headers = {
    Accept: "application/json",
    Host: "localhost:3000",
    Authorization: token
};

export const get = async (type) => {
    try {
        var res = await fetch(withQuery(
            api +"/get",
            {
                type: type
            }
        ), {headers});
        var json = await res.json();
    } catch (e) {
        console.log(e);
    }

    return json;
};

export const move = async (from,item,to) => {
    try {
        var res = await fetch(withQuery(
            api+"/move",
            {
                from:from,
                item:item,
                to:to
            }
        ), {headers});
        var json = await res.json();
    } catch (e) {
        console.log(e);
    }
    return json;
};

export const add = async (item,to) => {
    try {
        var res = await fetch(withQuery(
            api+"/add",
            {
                item:item,
                to:to
            }
        ), {headers});
        var json = await res.json();
    } catch (e) {
        console.log(e);
    }
    return json;
};