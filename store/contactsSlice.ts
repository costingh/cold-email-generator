import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { ContactInterface } from "../src/interfaces/Contact.interface";

// Type for our state
export interface ContactsState {
    contactsState: ContactInterface[];
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
        addNewContact: (state, action) => {
            let newContact = action.payload;
            state.contactsState = [...state.contactsState, newContact]
        },
        removeContact: (state, action) => {
            let _removeContact = action.payload;
            state.contactsState = state.contactsState.filter(contact => contact.id != _removeContact.id)
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

export const { setContactsState, addNewContact, removeContact } = contactsSlice.actions;

export const selectContactsState = (state: AppState) => state.contacts.contactsState;

export default contactsSlice.reducer;