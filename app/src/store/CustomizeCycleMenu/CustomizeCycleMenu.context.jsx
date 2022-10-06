import {createContext, useReducer} from "react";


export const CustomizeCycleMenuContext = createContext({
    currentConfiguration: [],
    configurations: []
})

const customizeCycleMenuInitialState = {
    currentConfiguration: [],
    configurations: []
}

const CustomizeCycleMenuReducer = (state, {type, payload}) => {
        switch (type) {
            default:
                return state;
        }
}

export const CustomizeCycleMenuProvider = ({children}) => {
    const [customizeCycleMenuState, customizeCycleMenuReducer] = useReducer(CustomizeCycleMenuReducer, customizeCycleMenuInitialState);
    const {currentConfiguration, configurations} = customizeCycleMenuState;

    const value = {
        currentConfiguration,
        configurations
    }

    return (
        <CustomizeCycleMenuContext.Provider value={value}>{children}</CustomizeCycleMenuContext.Provider>
    )
}