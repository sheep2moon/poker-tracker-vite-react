import { useEffect, useReducer } from "react";
import { GiPokerHand } from "react-icons/gi";
import { GrPowerReset } from "react-icons/gr";
import { BsFillGearFill } from "react-icons/bs";
import NewGameForm from "./components/game-settings-form/GameSettingsForm";
import { hasGameData, resetGameData } from "./helpers/localStorageHelpers";
import { Link } from "react-router-dom";

function App() {
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    const handleResetGame = () => {
        forceUpdate();
        resetGameData();
    };

    return (
        <div className="flex justify-center gap-2 flex-col items-center h-screen">
            {hasGameData() && (
                <>
                    <Link className="w-48 btn flex items-center justify-start gap-2 text-xl btn-success" to="/track-game">
                        <GiPokerHand />
                        Obecna gra
                    </Link>
                </>
            )}
            <Link className="btn gap-2 w-48 text-xl btn-success flex items-center justify-start" to="/settings">
                <BsFillGearFill />
                {hasGameData() ? "Ustawienia" : "Nowa gra"}
            </Link>

            {hasGameData() && (
                <button className="mt-16 w-48 btn btn-success btn-md text-xl flex items-center gap-2 justify-start" onClick={() => handleResetGame()}>
                    <GrPowerReset />
                    RESET
                </button>
            )}
        </div>
    );
}

export default App;
