import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { SegmentInterface } from "../src/interfaces/Segment.interface";

// Type for our state
export interface SegmentsState {
    segmentsState: SegmentInterface[];
    currentSegment: SegmentInterface | null;
}

// Initial state
const initialState: SegmentsState = {
    segmentsState: [],
    currentSegment: null
};

// Actual Slice
export const segmentsSlice = createSlice({
    name: "segments",
    initialState,
    reducers: {
        setSegmentsState(state, action) {
            state.segmentsState = action.payload;
        },
        addNewSegment: (state, action) => {
            let newSegment = action.payload;
            state.segmentsState = [...state.segmentsState, newSegment]
            state.currentSegment = newSegment;
        },
        removeSegment: (state, action) => {
            let _removeSegment = action.payload;

            console.log(state.segmentsState.map(x => console.log(x)))
            console.log(_removeSegment)
            state.segmentsState = state.segmentsState.filter(segment => segment.id != _removeSegment.id)
            state.currentSegment = state.segmentsState[state.segmentsState.length - 1] || null;

        },
        setCurrentSegment(state, action) {
            state.currentSegment = action.payload;
        },
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.segments,
            };
        },
    },
});

export const { setSegmentsState, addNewSegment, removeSegment, setCurrentSegment } = segmentsSlice.actions;

export const selectSegmentsState = (state: AppState) => state.segments.segmentsState;
export const selectCurrentSegment = (state: AppState) => state.segments.currentSegment

export default segmentsSlice.reducer;