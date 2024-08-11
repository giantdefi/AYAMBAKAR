import { createSlice } from '@reduxjs/toolkit';

const initialState = {

  main_img_blob: false, // will contain string single blob
  detail_imgs_blob: [], // will contain blob object

};

export const imageSlice = createSlice({
  name: 'cropimage', // specified name for this reducer. You can see this name on redux toolkit action
  initialState,
  reducers: {
    setPreviewMainBlob: (state, action) => {
      state.main_img_blob = action.payload
    },
    setPreviewDetailBlob: (state, action) => {
      //  state.detail_imgs_blob = action.payload
      state.detail_imgs_blob.push(action.payload) // push array
    },
    resetDetailImage: (state, action) => {
      state.detail_imgs_blob = [] // reset back to empty array
    },
    resetImage: () => initialState
  }

});

export const { resetImage, setPreviewMainBlob, setDetailImgNo, setPreviewDetailBlob, resetDetailImage } = imageSlice.actions;

export default imageSlice.reducer;
