import React, { useEffect, useState, useMemo } from "react";
import { BsFillGearFill } from "react-icons/bs";
import BlindTimer from "./BlindTimer";
import { TfiMinus, TfiPlus } from "react-icons/tfi";
import { retrieveGameData, saveGameData } from "../../helpers/localStorageHelpers";
import { Link } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";

const TrackGame = () => {
    const [gameData, setGameData] = useState<PokerGameData>();

    const poolSum = useMemo(() => {
        if (gameData) {
            return gameData.playersData.reduce((acc, el) => {
                const playerSum = el.rebuys * gameData.rebuy;
                return acc + playerSum;
            }, 0);
        }
    }, [gameData]);

    const addRebuy = (playerIndex: number) => {
        let playersData = gameData?.playersData;
        if (playersData && gameData?.name) {
            playersData = playersData.map((player, index) => {
                if (index === playerIndex) {
                    return { ...player, rebuys: player.rebuys + 1 };
                }
                return player;
            });
            const newGameData = { ...gameData, playersData };
            setGameData(newGameData);
            saveGameData(newGameData);
        }
    };

    const substractRebuy = (playerIndex: number) => {
        let playersData = gameData?.playersData;
        if (playersData && gameData?.name) {
            playersData = playersData.map((player, index) => {
                if (index === playerIndex && player.rebuys > 0) {
                    return { ...player, rebuys: player.rebuys - 1 };
                }
                return player;
            });
            const newGameData = { ...gameData, playersData };
            setGameData(newGameData);
            saveGameData(newGameData);
        }
    };

    useEffect(() => {
        const savedData = retrieveGameData();
        if (savedData) {
            setGameData(savedData);
        }
    }, []);

    if (!gameData) return <></>;

    return (
        <div className="max-w-xl mx-auto min-h-screen lg:flex lg:flex-col lg:justify-center">
            <Link to="/" className="text-2xl gap-2 flex items-center ml-4 pt-4">
                <AiOutlineLeft />
            </Link>
            <div className="flex">
                <div className="stat">
                    <div className="stat-title text-xl">{gameData.name}</div>
                    <div className="stat-value text-6xl">{poolSum}zł</div>
                    <div className="stat-desc text-lg">{gameData.rebuy}zł rebuy</div>
                </div>
                <Link to="/settings" className="btn btn-md gap-2 my-auto text-xl mr-4">
                    Ustawienia
                    <BsFillGearFill className="text-success" />
                </Link>
            </div>
            <div className="flex flex-col w-full border-opacity-50">
                <div className="divider">Odmierz czas</div>
            </div>
            <BlindTimer />
            <div className="flex flex-col w-full border-opacity-50">
                <div className="divider">Gracze</div>
            </div>
            <div className="mt-2">
                <div className="p-2 grid grid-cols-[50px_1fr_100px]">
                    <span></span>
                    <span>Nazwa</span>
                    <span>Rebuye</span>
                </div>
                {gameData.playersData.map((player, index) => (
                    <div className="grid grid-cols-[50px_1fr_150px] p-2 text-lg" key={player.name}>
                        <span>{index + 1}</span>
                        <span className="">{player.name}</span>
                        <div className="flex gap-2 items-center">
                            <button onClick={() => substractRebuy(index)} className="btn btn-md bg-success focus:bg-success btn-square">
                                <TfiMinus className="text-zinc-900" />
                            </button>
                            <span className="text-2xl text-center w-14 block">{player.rebuys}</span>
                            <button onClick={() => addRebuy(index)} className="btn btn-md bg-success focus:bg-success btn-square">
                                <TfiPlus className="text-zinc-900" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="divider pb-8"></div>
        </div>
    );
};

export default TrackGame;
