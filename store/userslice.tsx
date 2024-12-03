import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const userSlice = createSlice({
    name: 'userInformation',
    initialState:"",
    reducers: {
        
        setValue: (state, action: PayloadAction<any>) => {
            return action.payload;
        },
    },
});

export const { setValue } = userSlice.actions;
export default userSlice;
