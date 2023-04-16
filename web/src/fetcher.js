const token = localStorage.getItem("token") || sessionStorage.getItem("token");

const fetcher = (url) => {
    return fetch(url, {
        headers: {
            'Authorization': token ? `Bearer ${token}` : '',
        },
    }).then((res) => res.json())
        .then((res) => {
            if (res.error) {
                throw new Error(res.error);
            }
            return res;
        });
}

export default fetcher;