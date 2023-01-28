import React, { useEffect, useMemo, useState } from "react";
import { zeroPad } from "../../helpers/zeroPad";
import { TfiControlPause, TfiControlPlay } from "react-icons/tfi";
import clsx from "clsx";

const BlindTimer = () => {
    let timerInterval: NodeJS.Timer;
    const [timeLeft, setTimeLeft] = useState<number>(0); //time in seconds
    const [isFinished, setIsFinished] = useState(false);

    const startCountdown = (minutes: number) => {
        setIsFinished(false);
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

    const finishCountdown = () => {
        setIsFinished(true);
        clearInterval(timerInterval);
        localStorage.setItem("countdownEnd", "");
    };

    const countDown = () => {
        if (timeLeft > 0) {
            setTimeLeft(prev => prev - 1);
        } else {
            finishCountdown();
        }
    };

    useEffect(() => {
        const syncPassed = syncWithLocalStorage();
        if (syncPassed) {
            timerInterval = setInterval(() => {
                countDown();
            }, 1000);
        }

        return () => clearInterval(timerInterval);
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

                <div className="flex items-center gap-2 mt-2 ml-auto">
                    <div className={clsx("text-3xl flex items-center w-20", { "animate-pulse": isFinished })}>
                        <span>{Math.floor(timeLeft / 60)}:</span>
                        <span>{zeroPad(timeLeft % 60, 2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlindTimer;
