import { createSlice } from  "@reduxjs/toolkit";
import { AppState } from "./store";

export interface ReaderState {
    fontSize: number;
    fonts: string;
    lineHeight: number;
    lineSpacing: number;
    align: string;
    layout: string;
    environmentId?: number;
    bookId?: number;
    readSettingsEventId?: number;
    lastStableSettings?: {
        fontSize: number;
        fonts: string;
        lineHeight: number;
        lineSpacing: number;
        align: string;
        layout: string;
    }
}

const initialState: ReaderState = {
    fontSize: 18,
    fonts: "serif",
    lineHeight: 20,
    lineSpacing: 0.1,
    align: "left",
    layout: "row",
    environmentId: undefined,
    bookId: undefined,
    readSettingsEventId: undefined,
    lastStableSettings: {
        fontSize: 18,
        fonts: "serif",
        lineHeight: 20,
        lineSpacing: 0.1,
        align: "left",
        layout: "row",
    }
};

export const readerSlice = createSlice({
    name: "reader",
    initialState,
    reducers: {
        setFontSize(state, action) {
            state.fontSize = action.payload;
        }, 
        setFonts(state, action) {
            state.fonts = action.payload;
        },
        setLineHeight(state, action) {
            state.lineHeight = action.payload;
        },
        setLineSpacing(state, action) {
            state.lineSpacing = action.payload;
        },
        setAlign(state, action) {
            state.align = action.payload;
        },
        setLayout(state, action) {
            state.layout = action.payload;
        },
        setEnvironmentId(state, action) {
            state.environmentId = action.payload;
        },
        setBookId(state, action) {
            state.bookId = action.payload;
        },
        setReadSettingsEventId(state, action) {
            state.readSettingsEventId = action.payload;
        },
        setLastStableSettings(state, action) {
            state.lastStableSettings = action.payload;
        }
    }
});

export const { setFontSize, setFonts, setLineHeight, setLineSpacing, setAlign, setLayout, setEnvironmentId, setBookId, setReadSettingsEventId, setLastStableSettings } = readerSlice.actions;

export const getFontSize = (state: AppState) => state.reader.fontSize;
export const getFonts = (state: AppState) => state.reader.fonts;
export const getLineHeight = (state: AppState) => state.reader.lineHeight;
export const getLineSpacing = (state: AppState) => state.reader.lineSpacing;
export const getAlign = (state: AppState) => state.reader.align;
export const getLayout = (state: AppState) => state.reader.layout;
export const getEnvironmentId = (state: AppState) => state.reader.environmentId;
export const getBookId = (state: AppState) => state.reader.bookId;
export const getReadSettingsEventId = (state: AppState) => state.reader.readSettingsEventId;
export const getLastStableSettings = (state: AppState) => state.reader.lastStableSettings;

export default readerSlice.reducer;