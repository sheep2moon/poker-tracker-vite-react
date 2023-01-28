export const saveGameData = (data: PokerGameData) => {
    localStorage.setItem("current-game", JSON.stringify(data));
};

export const retrieveGameData = (): PokerGameData | null => {
    const rawData = localStorage.getItem("current-game");
    console.log(rawData);

    if (rawData && rawData !== "undefined") {
        console.log(typeof rawData === "string");

        return JSON.parse(rawData);
    }
    return null;
};

export const hasGameData = () => {
    if (localStorage.getItem("current-game") === null) return false;
    return true;
};

export const resetGameData = () => {
    if (localStorage.getItem("current-game") !== null) {
        localStorage.removeItem("current-game");
    }
    if (localStorage.getItem("countdownEnd") !== null) {
        localStorage.removeItem("countdownEnd");
    }
};
