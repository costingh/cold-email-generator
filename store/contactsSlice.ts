import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface ContactsState {
    contactsState: [];
}

// Initial state
const initialState: ContactsState = {
    contactsState: [],
};

// Actual Slice
export const contactsSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
        // Action to set the authentication status
        setContactsState(state, action) {
            state.contactsState = action.payload;
        },
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.contacts,
            };
        },
    },
});

export const { setContactsState } = contactsSlice.actions;

export const selectContactsState = (state: AppState) => state.contacts.contactsState;

export default contactsSlice.reducer;