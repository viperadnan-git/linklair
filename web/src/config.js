import {
    Facebook,
    Github,
    Instagram,
    Linkedin,
    Reddit,
    Twitter,
} from "./assets/icons";

const apiBase = window.location.hostname === "localhost" ? "http://localhost:3001/api" : "/api";
const config = {
    paths: {
        dashboard: "/dash",
        profile: "/:username"
    },
    api: {
        base: apiBase,
        login: `${apiBase}/login`,
        register: `${apiBase}/register`,
        profile: `${apiBase}/profile`,
        social: `${apiBase}/social`,
    },

    iconMapping: {
        github: <Github />,
        twitter: <Twitter />,
        linkedin: <Linkedin />,
        instagram: <Instagram />,
        facebook: <Facebook />,
        reddit: <Reddit />,
    },
}

export default config;