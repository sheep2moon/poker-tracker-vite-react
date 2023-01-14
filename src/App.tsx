import { useEffect } from "react";
import { GiPokerHand } from "react-icons/gi";
import { BsFillGearFill } from "react-icons/bs";
import NewGameForm from "./components/game-settings-form/GameSettingsForm";
import { hasGameData } from "./helpers/localStorageHelpers";
import { Link } from "react-router-dom";

function App() {
    return (
        <div className="flex justify-center gap-2 flex-col items-center h-screen">
            {hasGameData() && (
                <Link className="btn gap-2 text-xl btn-success" to="/track-game">
                    <GiPokerHand />
                    Obecna gra
                </Link>
            )}
            <Link className="btn gap-2 text-xl btn-success" to="/settings">
                <BsFillGearFill />
                {hasGameData() ? "Ustawienia" : "Nowa gra"}
            </Link>
        </div>
    );
}

export default App;
