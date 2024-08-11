import { createSlice } from '@reduxjs/toolkit';

const initialState = {

  // control some max characters length from here. Other may defined in the component directly.
  maxTitleLength: 60,
  maxPriceLength: 14,
  maxPriceShortLength: 12,
  maxStateLength: 40,
  maxAddressLength: 60,
  maxDescLength: 1024,

  // Form data based on mongoose schema Realestate Model
  formData: {
    id: false,
    category: '',
    subcategory: '',
    title: '',
    slug: '',
    description: '',
    currency: 'Rp.',
    price: 0,
    price_short: '',
    country: 'Indonesia',
    state: '',
    city: '',
    publish: false,
    conditions: "bekas",
    sold: false,
    rent_duration: 'Harian',
    land: 0,
    building: 0,
    bedroom: 0,
    bathroom: 0,
    storey: 0,
    garage: 0,
    carport: 0,
    certificate: 'Hak Milik',
    km: 0,
    fuel: 'Bensin',
    years: 0,
    main_mage: '',
    lat: '-6.180406243016221',
    lng: '106.82703137397766',
  },

  formState: false,
  formCity: false,

  jumpToPostPage: false,



};

export const formDataSlice = createSlice({
  name: 'formData', // specified name for this reducer. You can see this name on redux toolkit action
  initialState,
  reducers: {

    setFormData: (state, action) => {
      state.formData = action.payload
    },

    setFormState: (state, action) => {
      state.formState = action.payload
    },
    setFormCity: (state, action) => {
      state.formCity = action.payload
    },

    setJumpToPostPage: (state, action) => {
      state.jumpToPostPage = action.payload
    },

    resetFormData: () => initialState
  }

});

export const { resetFormData, setFormData, setJumpToPostPage } = formDataSlice.actions;

export default formDataSlice.reducer;
