import React, {createContext, useContext, useEffect, useReducer} from "react";
import AuthContext from "../auth/auth-context";
import client from "../../api/client";
import {
    setUserValues,
    setTimeTomato,
    setTimeBreak,
    setPreviewBreak,
    setPreviewTimeTomato,
    setStepOfUser, setTypeBreak
} from "./tomato.action";

export const TomatoContext = createContext({
    userDetails: {},
    tomatoTime: 0,
    breakTime: 0,
    breakPreview: 0,
    tomatoTimePreview: 0,
    stepOfUser: 0,
    typeBreak: ""
})

const tomatoInitialState = {
    userDetails: {},
    tomatoTime: 0,
    breakTime: 0,
    breakPreview: 0,
    tomatoTimePreview: 0,
    stepOfUser: 0,
    typeBreak: ""
}

const tomatoReducer = (state, {type, payload}) => {
    switch (type) {
        case 'SET_USER_VALUES':
            return {
                ...state,
                userDetails: payload
            }
            case 'SET_TIME_TOMATO':
            return {
                ...state,
                tomatoTime: payload
            }
            case 'SET_TIME_BREAK':
            return {
                ...state,
                tomatoTime: 0,
                breakTime: payload
            }
            case 'SET_PREVIEW_BREAK':
            return {
                ...state,
                breakPreview: payload
            }
            case 'SET_PREVIEW_TOMATO':
            return {
                ...state,
                tomatoTimePreview: payload
            }
            case 'SET_STEP_OF_USER':
            return {
                ...state,
                stepOfUser: payload
            }
            case 'SET_TYPE_BREAK':
            return {
                ...state,
                typeBreak: payload
            }
        default:
            return state;
    }
}

export const TomatoProvider = ({children}) => {
    const [tomatoState, dispatchTomatoAction] = useReducer(tomatoReducer, tomatoInitialState);
    const {breakPreview, tomatoTimeDetails, tomatoTimePreview, stepOfUser, tomatoTime, breakTime, userDetails, typeBreak} = tomatoState;

    const [refetchData, setRefetchData] = React.useState(false);
    const [endStep, setEndStep] = React.useState(false);
    const [breakedTomato, setBreakedTomato] = React.useState(false);

    const {token} = useContext(AuthContext);

    const fetchUserInfo = async () => {
        try {
            const {data} = await client.post('/api/getUserInfo', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUserValues(data, dispatchTomatoAction)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUserInfo();
    }, [refetchData]);

    useEffect(() => {
        if(tomatoState.userDetails.tomatoStep !== undefined) {
            const previewBreakOfStep = parseInt(tomatoState.userDetails.tomatoConfiguration[tomatoState.userDetails.tomatoStep].breakDuration)
            const previewTimeTomatoOfStep = parseInt(tomatoState.userDetails.tomatoConfiguration[tomatoState.userDetails.tomatoStep].tomatoDuration)
            const stepOfUser = tomatoState.userDetails.tomatoStep;
            setPreviewBreak(previewBreakOfStep, dispatchTomatoAction)
            setPreviewTimeTomato(previewTimeTomatoOfStep, dispatchTomatoAction)
            setStepOfUser(stepOfUser, dispatchTomatoAction)
            setTypeBreak(tomatoState.userDetails.tomatoConfiguration[tomatoState.userDetails.tomatoStep].typeBreak, dispatchTomatoAction);

            if(tomatoState.userDetails.tomatoStartedAt) {
                setTimeTomato(tomatoState.userDetails.tomatoStartedAt, dispatchTomatoAction);
            }
            if(tomatoState.userDetails.breakStartedAt) {
                setTimeBreak(tomatoState.userDetails.breakStartedAt, dispatchTomatoAction);
            }
            if(endStep || breakedTomato) {
                setTimeTomato(0, dispatchTomatoAction);
                setTimeBreak(0, dispatchTomatoAction);
            }
            if(tomatoTime === 0 && breakTime === 0) {
                setEndStep(false);
                setBreakedTomato(false);
            }
        }
        setRefetchData(false);
    }, [tomatoState.userDetails, refetchData]);

    console.log(tomatoState);



    const value = {
        tomatoTimeDetails,
        breakPreview,
        tomatoTimePreview,
        stepOfUser,
        setRefetchData,
        tomatoTime,
        breakTime,
        userDetails,
        typeBreak,
        setEndStep,
        setBreakedTomato
    };
    return (
        <TomatoContext.Provider value={value}>{children}</TomatoContext.Provider>
    );
}