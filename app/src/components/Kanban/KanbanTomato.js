import React, { useContext, useEffect, useState } from "react";
import KanbanTomatoStyle from "./KanbanTomato.module.css";
import client from "../../api/client";
import plant from "../../img/plant.svg";
import AuthContext from "../../store/auth/auth-context";
import { TasksContext } from "../../store/tasks/tasks.context";
import { KanbanCard } from "../KanbanCard/KanbanCard";
import { AiFillPlayCircle } from "react-icons/ai";
import { TomatoContext } from "../../store/tomato/tomato.context";
import useSound from "use-sound";
import { FaStopCircle } from "react-icons/fa";
import { TomatoModal } from "../TomatoModal/TomatoModal";
import startTomatoSound from "../../sounds/startTomato.mp3";
import endCycleSound from "../../sounds/brav.mp3";
import endTomatoSound from "../../sounds/finishTomato.mp3";
import endBreakSound from "../../sounds/endBreak.mp3";
import endSurpriseSound from "../../sounds/surprise.mp3";
import {convertMsToMinutesSeconds} from "../../utils/convertsMsToMinutesSeconds";

function KanbanTomato() {
  const authCtx = useContext(AuthContext);
  const tasksCtx = useContext(TasksContext);
  const taskWorkingAtCtx = tasksCtx.tasksWorkingAt;
  const isLoggedIn = authCtx.isLoggedIn;
  const [playStartTomato,{stop:stopStartTomato}] = useSound(startTomatoSound);
  const [playEndCycle,{stop:stopEndCycle}] = useSound(endCycleSound);
  const [playEndSurprise,{stop:stopEndSurprise}] = useSound(endSurpriseSound);
  const [playEndTomato,{stop:stopEndTomato}] = useSound(endTomatoSound);
  const [playEndBreak,{stop:stopEndBreak}] = useSound(endBreakSound, { volume: 0.40 });
  const [isFinishedTomato, setIsFinishedTomato] = useState(false);

  const [statusTomato, setStatusTomato] = useState("");
  const [breakModalTomato, setBreakModalTomato] = useState(false);

  const blockSound=(num)=>{
    setTimeout(()=>{
      stopEndSurprise();
    },num*200);
  };
  const handleStartTomato = async () => {
    try {
      const startTomato = await client.post(
        "/api/startTomato",
        {},
        {
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
          },
        }
      );
      if (startTomato.status === 200) {
        setStatusTomato("tomato");
        setRefetchData(true);
        stopEndBreak();
        stopEndCycle();
        stopEndSurprise();
        for (let i = 1; i < 34; i++) {
          blockSound(i);
        }
        playStartTomato();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStartBreak = async () => {
    try {
      const startBreak = await client.post(
        "/api/startBreak",
        {},
        {
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
          },
        }
      );
      if (startBreak.status === 200) {
        setRefetchData(true);
        setStatusTomato("break");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModalBreakTomato = () => setBreakModalTomato(true);



  const {
    breakPreview,
    tomatoTimePreview,
    stepOfUser,
    setRefetchData,
    tomatoTime,
    breakTime,
    typeBreak,
    userDetails,
    setEndStep,
  } = useContext(TomatoContext);

  const handleNextStep = async () => {
    try {
      const startBreak = await client.post(
        "/api/endStepTomato",
        {},
        {
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
          },
        }
      );
      if (startBreak.status === 200) {
        if (
          userDetails.tomatoStep + 1 ===
          userDetails.tomatoConfiguration.length
        ) {
          playEndCycle();
          setTimeout(()=>{
            playEndSurprise();
          },6500);
        } else {
          playEndBreak();
        }
        setRefetchData(true);
        setEndStep(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let tomatoPreviewAfterBreak = 0;

  if (userDetails.tomatoConfiguration) {
    if (userDetails.tomatoStep + 1 === userDetails.tomatoConfiguration.length) {
      tomatoPreviewAfterBreak =
        userDetails.tomatoConfiguration[0].tomatoDuration;
    } else {
      tomatoPreviewAfterBreak =
        userDetails.tomatoConfiguration[userDetails.tomatoStep + 1]
          .tomatoDuration;
    }
  }

  const tomatoCountDown = tomatoTime - new Date().getTime();
  const breakCountDown = breakTime - new Date().getTime();

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (tomatoCountDown.toString().charAt(0) !== "-" && tomatoTime > 0)
      setStatusTomato("tomato");
    if (breakCountDown.toString().charAt(0) !== "-") setStatusTomato("break");
    const handle = setInterval(() => {
      setActiveTab((prevTab) => {
        if (prevTab === 3) return 0;
        return (prevTab += 1);
      });
    }, 1000);

    if (
      tomatoCountDown.toString().charAt(0) === "-" &&
      statusTomato === "tomato"
    ) {
      setStatusTomato("");
      return clearInterval(handle);
    }
    if (
      breakCountDown.toString().charAt(0) === "-" &&
      statusTomato === "break"
    ) {
      setStatusTomato("");
      return clearInterval(handle);
    }
    if (breakTime > 0 && breakCountDown.toString().charAt(0) === "-") {
      setStatusTomato("");
      handleNextStep();
      return clearInterval(handle);
    }
    if (
      tomatoTime > 0 &&
      convertMsToMinutesSeconds(tomatoCountDown) === "-1:00"
    ) {
      playEndTomato();
    }

    if (statusTomato === "") {
      return clearInterval(handle);
    }
    return () => {
      clearInterval(handle);
    };
  }, [
    statusTomato,
    tomatoTime,
    convertMsToMinutesSeconds(tomatoCountDown) === "-1:00",
    breakTime,
    convertMsToMinutesSeconds(breakCountDown) === "-1:00",
  ]);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchWorkingAt = async () => {
        try {
          const task = await client.post(
            "/api/getWorkingAtTask",
            {},
            {
              headers: {
                Authorization: `Bearer ${authCtx.token}`,
              },
            }
          );
          if (task.data) {
            tasksCtx.setTasksWorkingAt(task.data);
          }
        } catch (error) {
          return console.log(error);
        }
      };
      fetchWorkingAt();
    }
  }, []);

  let taskWorkingAt = "";
  if (taskWorkingAtCtx._id) {
    taskWorkingAt = (
      <KanbanCard
        type="workingAt"
        key={taskWorkingAtCtx._id}
        task={taskWorkingAtCtx}
      />
    );
  }

  return (
    <>
        <div className='kanban-2-img'>
          <img src={plant} className='kanban-2-img-size' alt="" />
        </div>
      <div className="kanban-2">
        <div className="d-flex flex-column align-items-center wrapper-kanban-2 text-center w-100">
          <div className="mb-1">
            <p className="fs-2 p-0 m-0 text-uppercase">time to focus</p>
            <p className="fs-5 p-0 m-0 text-uppercase">STEP {stepOfUser + 1}</p>
            <h1 className="fw-bold">
              {(tomatoTime > 0 &&
                      tomatoCountDown.toString().charAt(0) !== "-" &&
                      breakCountDown.toString().charAt(0) === "-" && (
                          <div className="row flex-column align-items-center">
                            <span className='timer-text'>{convertMsToMinutesSeconds(tomatoCountDown)}</span>
                            <span className="fs-6 text-uppercase">
                    next: {typeBreak} {convertMsToMinutesSeconds(breakPreview)}
                  </span>
                          </div>
                      )) ||
                  (tomatoTime === 0 && breakTime === 0 && (
                      <div className="row flex-column align-items-center ">
                        <span className='timer-text'>{convertMsToMinutesSeconds(tomatoTimePreview)}</span>
                        <span className="fs-6 text-uppercase">
                    next: {typeBreak} {convertMsToMinutesSeconds(breakPreview)}
                  </span>
                      </div>
                  )) ||
                  (tomatoTime > 0 &&
                      tomatoCountDown.toString().charAt(0) === "-" && (
                          <div className="row flex-column align-items-center">
                            <span className='timer-text'>{convertMsToMinutesSeconds(breakPreview)}</span>
                            <span className="fs-6 text-uppercase">
                      next: tomato{" "}
                              {convertMsToMinutesSeconds(tomatoPreviewAfterBreak)}
                    </span>
                          </div>
                      )) ||
                  (breakTime > 0 &&
                      breakCountDown.toString().charAt(0) !== "-" &&
                      tomatoCountDown.toString().charAt(0) === "-" && (
                          <div className="row flex-column align-items-center">
                            <span className='timer-text'>{convertMsToMinutesSeconds(breakCountDown)}</span>
                            <span className="fs-6 text-uppercase">
                      next: tomato{" "}
                              {convertMsToMinutesSeconds(tomatoPreviewAfterBreak)}
                    </span>
                          </div>
                      ))}
            </h1>
          </div>
          <div className="mb-5 text-center">
            {(tomatoTime > 0 && tomatoCountDown.toString().charAt(0) === "-" && (
                    <button
                        className="text-center bg-transparent border-0 d-flex flex-column"
                        disabled={!tasksCtx.tasksWorkingAt._id}
                        onClick={handleStartBreak}
                    >
                      <AiFillPlayCircle
                          className={`text-white btn-play text-center ${KanbanTomatoStyle.iconPlay}`}
                      />
                    </button>
                )) ||
                (tomatoTime > 0 && tomatoCountDown.toString().charAt(0) !== "-" && (
                    <button
                        className="text-center bg-transparent border-0"
                        disabled={!tasksCtx.tasksWorkingAt._id}
                        onClick={handleOpenModalBreakTomato}
                    >
                      <FaStopCircle
                          className={`text-white btn-play text-center ${KanbanTomatoStyle.iconPlay}`}
                      />
                    </button>
                )) ||
                (tomatoTime === 0 &&
                    tomatoCountDown.toString().charAt(0) === "-" &&
                    breakCountDown.toString().charAt(0) === "-" && (
                        <button
                            className="text-center bg-transparent border-0 d-flex flex-column"
                            disabled={!tasksCtx.tasksWorkingAt._id}
                            onClick={handleStartTomato}
                        >
                          <AiFillPlayCircle
                              className={`text-white btn-play text-center ${KanbanTomatoStyle.iconPlay}`}
                          />
                        </button>
                    ))}
          </div>
          <div className="mt-5 w-100">
            <p className='font-rubik text-uppercase fs-5'>Working at</p>
            <div className="working">{taskWorkingAt}</div>
          </div>
        </div>
        <TomatoModal
            open={breakModalTomato}
            setOpen={setBreakModalTomato}
            setStatusTomato={setStatusTomato}
        />
      </div>
    </>
  );
}

export default KanbanTomato;
