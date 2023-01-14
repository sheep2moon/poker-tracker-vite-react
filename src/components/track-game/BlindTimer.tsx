import React, { useEffect, useMemo, useState } from "react";
import { zeroPad } from "../../helpers/zeroPad";
import { TfiControlPause, TfiControlPlay } from "react-icons/tfi";

const BlindTimer = () => {
    const [timeLeft, setTimeLeft] = useState<number>(0);

    const startCountdown = (minutes: number) => {
        var nowDate = Date.now();
        var endInMs = nowDate + minutes * 60 * 1000;
        localStorage.setItem("countdownEnd", JSON.stringify(endInMs));
        setTimeLeft(minutes * 60);
    };

    const syncWithLocalStorage = () => {
        const endTime = localStorage.getItem("countdownEnd");
        if (endTime) {
            setTimeLeft(Math.floor((parseInt(endTime) - Date.now()) / 1000));
            return true;
        }
        return false;
    };

    const countDown = () => {
        setTimeLeft(prev => prev - 1);
    };

    useEffect(() => {
        let interval: NodeJS.Timer;
        const syncPassed = syncWithLocalStorage();
        if (syncPassed) {
            interval = setInterval(() => {
                countDown();
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [timeLeft]);

    return (
        <div className="py-2 px-2 flex flex-col items-center justify-between">
            <div className="flex items-center gap-1 w-full">
                <button onClick={() => startCountdown(30)} className="btn btn-md btn-outline btn-success">
                    30 min
                </button>
                <button onClick={() => startCountdown(45)} className="btn btn-md btn-outline btn-success">
                    45 min
                </button>
                <button onClick={() => startCountdown(60)} className="btn btn-md btn-outline btn-success">
                    60 min
                </button>
                {timeLeft !== 0 && (
                    <div className="flex items-center gap-2 mt-2 ml-auto">
                        <div className="text-3xl flex items-center w-20">
                            <span>{Math.floor(timeLeft / 60)}:</span>
                            <span>{zeroPad(timeLeft % 60, 2)}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlindTimer;
