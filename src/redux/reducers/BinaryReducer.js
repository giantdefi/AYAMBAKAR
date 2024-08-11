import { createSlice } from '@reduxjs/toolkit';

const initialState = {

    pairLeft: 20,
    pairRight: 20,
    onePairValue: 2, // see all in front end and server
    flashOutLimit: 200, // in dollar

    sponsorL1: 10,// in percent. See also in sever must be change if this is changed
    sponsorL2: 5,
    sponsorL3: 4,
    sponsorL4: 3,
    sponsorL5: 2,
    sponsorL6: 2,
    sponsorL7: 1,
    sponsorL8: 1,
    sponsorL9: 1,
    sponsorL10: 1,

    groupLeft1: 100,
    groupRight1: 100,
    bonusGroup1: 10, //  % of total Omset. see also in database data_constand !!!

    groupLeft2: 500,
    groupRight2: 500,
    bonusGroup2: 5, //  % of total Omset. see also in database data_constand !!!

    groupLeft3: 1000,
    groupRight3: 1000,
    bonusGroup3: 2, //  % of total Omset .see also in database data_constand !!!


}

export const BinarySlice = createSlice({
    name: 'binary', // specified name for this reducer. You can see this name on redux toolkit action
    initialState,
    reducers: {



        resetBinary: () => initialState
    }

});

export const { resetBinary
} = BinarySlice.actions;

export default BinarySlice.reducer;


