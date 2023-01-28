type PokerGameData = {
    name: string;
    rebuy: number;
    playersData: PlayerData[];
};

type PlayerData = {
    name: string;
    rebuys: number;
};

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
