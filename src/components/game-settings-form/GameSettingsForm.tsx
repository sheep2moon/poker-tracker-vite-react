import React, { ChangeEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { retrieveGameData, saveGameData } from "../../helpers/localStorageHelpers";
import { AiOutlineUserAdd } from "react-icons/ai";
import { IoIosSave } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { GiBuyCard } from "react-icons/gi";
import { MdDriveFileRenameOutline } from "react-icons/md";

const GameSettingsForm = () => {
    const [name, setName] = useState("");
    const [rebuy, setRebuy] = useState(20);
    const [playersCount, setPlayersCount] = useState(0);
    const [playersData, setPlayersData] = useState<PlayerData[]>([]);
    const navigate = useNavigate();

    const handleAddPlayer = () => {
        setPlayersCount(prev => prev + 1);
        setPlayersData(prev => [...prev, { name: "", rebuys: 0 }]);
    };

    const handleRemovePlayer = (index: number) => {
        const newPlayers = playersData.filter((_, i) => i !== index);
        setPlayersData(newPlayers);
        setPlayersCount(prev => prev - 1);
    };

    const handlePlayerNameChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newPlayers = playersData.map((player, i) => {
            if (i === index) {
                return { ...player, name: e.target.value };
            }
            return player;
        });
        setPlayersData(newPlayers);
    };

    const handleCreateGame = () => {
        const gameData = {
            name,
            rebuy,
            playersData
        };
        saveGameData(gameData);
        navigate("/track-game");
    };

    useEffect(() => {
        const gameData = retrieveGameData();
        if (gameData) {
            setName(gameData.name);
            setPlayersCount(gameData.playersData.length);
            setPlayersData(gameData.playersData);
            setRebuy(gameData.rebuy);
        }
    }, []);

    return (
        <div className="p-2 flex flex-col gap-4 max-w-xl mx-auto min-h-screen lg:flex lg:flex-col lg:justify-center">
            <h1 className="text-center text-2xl mb-4">Ustawienia partii</h1>
            <h1 className="text-2xl mt-4 flex items-center gap-2">
                <MdDriveFileRenameOutline className="text-success" />
                Nazwa partii
            </h1>
            <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Nazwa" className="input input-bordered input-success w-full" />

            <h1 className="text-2xl mt-4 flex items-center gap-2">
                <GiBuyCard className="text-success" />
                Rebuy
                <span className="w-16"> - {rebuy}zł</span>
            </h1>
            <div className="mt-4">
                {/* <h2 className="text-center font-bold text-xl">Rebuy</h2> */}
                <input onChange={e => setRebuy(parseInt(e.target.value))} type="range" step={5} min={10} max={50} value={rebuy} className="range range-success" />
                <div className="w-full flex justify-between text-xs px-2">
                    {Array(9)
                        .fill(0)
                        .map((_, index) => (
                            <div key={`range-in-${index}`} className="flex flex-col text-sm items-center">
                                |<span>{(index + 2) * 5}</span>
                            </div>
                        ))}
                </div>
            </div>

            <h1 className="text-2xl mt-4 flex gap-2 items-center">
                <FaUsers className="text-success" /> Gracze
            </h1>
            {Array(playersCount)
                .fill(0)
                .map((_, index) => (
                    <div key={`player-form-${index}`} className="flex items-center">
                        <span className="text-2xl mr-2 w-8 block">{index + 1}.</span>
                        <input value={playersData[index].name} onChange={e => handlePlayerNameChange(e, index)} type="text" placeholder="Nazwa" className="input input-bordered input-success w-full" />
                        <button className="btn btn-square ml-2" onClick={() => handleRemovePlayer(index)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-succes" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ))}
            <button onClick={handleAddPlayer} className="ml-10 btn btn-outline btn-success max-w-xs">
                <AiOutlineUserAdd className="text-xl mr-2" />
                Dodaj gracza
            </button>

            <button onClick={handleCreateGame} className="btn btn-block mt-10 text-2xl">
                <IoIosSave className="mr-2 text-success" />
                ZAPISZ
            </button>
        </div>
    );
};

export default GameSettingsForm;
