import {createAction} from "../../utils/createAction";

export const setUserValues = (userInfo, dispatch) => {
    dispatch(createAction(
        'SET_USER_VALUES',
        userInfo
    ));
}
export const setTimeTomato = (tomatoStartedAt, dispatch) => {
    dispatch(createAction(
        'SET_TIME_TOMATO',
        tomatoStartedAt
    ));
}
export const setTimeBreak = (breakStartedAt, dispatch) => {
    dispatch(createAction(
        'SET_TIME_BREAK',
        breakStartedAt
    ));
}
export const setPreviewBreak = (nextBreak, dispatch) => {
    dispatch(createAction(
        'SET_PREVIEW_BREAK',
        nextBreak
    ));
}
export const setPreviewTimeTomato = (tomatoTime, dispatch) => {
    dispatch(createAction(
        'SET_PREVIEW_TOMATO',
        tomatoTime
    ));
}
export const setStepOfUser = (stepOfUser, dispatch) => {
    dispatch(createAction(
        'SET_STEP_OF_USER',
        stepOfUser
    ));
}
export const startTomato = (stepOfUser, dispatch) => {
    dispatch(createAction(
        'SET_STEP_OF_USER',
        stepOfUser
    ));
}
export const setTypeBreak = (typeBreak, dispatch) => {
    dispatch(createAction(
        'SET_TYPE_BREAK',
        typeBreak
    ));
}