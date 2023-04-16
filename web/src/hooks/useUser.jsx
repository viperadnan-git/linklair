import { useState } from "react";

export default function useUser() {
    const getUser = () => {
        let user =
            sessionStorage.getItem("LINKLAIR_USER") ||
            localStorage.getItem("LINKLAIR_USER");
        if (user) {
            return JSON.parse(user);
        }
        return null;
    };

    const [user, setUser] = useState(getUser());

    const saveToken = (user, useSessionStorage = false) => {
        if (useSessionStorage) {
            sessionStorage.setItem("LINKLAIR_USER", JSON.stringify(user));
        } else {
            localStorage.setItem("LINKLAIR_USER", JSON.stringify(user));
        }
        setUser(user);
    };

    return {
        user,
        setUser: saveToken,
        remUser: () => {
            localStorage.removeItem("LINKLAIR_USER");
            sessionStorage.removeItem("LINKLAIR_USER");
            setUser(null);
        },
    };
}