type PokerGameData = {
    name: string;
    rebuy: number;
    playersData: PlayerData[];
};

type PlayerData = {
    name: string;
    rebuys: number;
};
