export const themes = {
    main: {
        chart: ['#de425b','#ec838a','#f3babc','#f1f1f1','#c0d6ef','#88bbed','#36a2eb','#36a2eb','#88bbed','#c0d6ef','#f1f1f1','#fae5be','#ffd98c','#ffce56'],
        background: '#eeeeee',
    },
    dark: {
        chart: ['#ff6384', '#f767a2', '#e770bd', '#cf7bd3', '#b187e3', '#8e92ed', '#669bef', '#36a2eb'],
        background: '#222222',
    },
};

export const ThemeContext = React.createContext(
    themes.main // default value
);