import { createSlice } from "@reduxjs/toolkit";

const attractionPackageSlice = createSlice({
  name: "attractionPackage",
  initialState: {
    packageDetail: {},
    attractionDetailData: [],
    tourHighlightDetail: [],
    iternityDetail: [],
    accomodationDetail: [],
    whatsIncludeData: [],
    whatsNotIncludeData: [],
    bookingPoliciesData: [],
    cancellationPoliciesData: [],
    optionalServicesData: [],
    paymentDetails: {
      accommodation: [],
      paymentTransfer: [],
    },
  },
  reducers: {
    packageDetail: (state, action) => {
      state.packageDetail = { ...action.payload };
    },
    attractionDetail: (state, action) => {
      state.attractionDetailData = [...action.payload];
    },
    tourHighlightDetail: (state, action) => {
      state.tourHighlightDetail = [...action.payload];
    },
    iternityDetail: (state, action) => {
      state.iternityDetail = [...action.payload];
    },
    accomodationDetail: (state, action) => {
      state.accomodationDetail = [...action.payload];
    },
    whatsInclude: (state, action) => {
      state.whatsIncludeData = [...action.payload];
    },
    whatsNotInclude: (state, action) => {
      state.whatsNotIncludeData = [...action.payload];
    },
    bookingPolicies: (state, action) => {
      state.bookingPoliciesData = [...action.payload];
    },
    cancellationPolicies: (state, action) => {
      state.cancellationPoliciesData = [...action.payload];
    },
    optionalServices: (state, action) => {
      state.optionalServicesData = [...action.payload];
    },
    paymentDetailsAdd: (state, action) => {
      state.paymentDetails.accommodation = [...action.payload];
    },
    paymentTransferDetailsAdd: (state, action) => {
      state.paymentDetails.paymentTransfer = [...action.payload];
    },
  },
});

export const {
  packageDetail,
  attractionDetail,
  tourHighlightDetail,
  iternityDetail,
  accomodationDetail,
  whatsInclude,
  whatsNotInclude,
  bookingPolicies,
  cancellationPolicies,
  optionalServices,
  paymentDetailsAdd,
  paymentTransferDetailsAdd,
} = attractionPackageSlice.actions;
export default attractionPackageSlice.reducer;
