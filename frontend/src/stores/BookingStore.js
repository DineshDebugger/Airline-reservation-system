import { create } from "zustand";

const BookingStore = create((set) => ({
  startCity: "",
  destination: "",
  date: "",
  busData: [],

  setStartCity: (city) => set({ startCity: city }),
  setDestination: (city) => set({ destination: city }),
  setDate: (date) => set({ date }),
  setBusData: (data) => set({ busData: data }),
  setActiveTab: (tab) => set({ activeTab: tab }),

  clearBooking: () =>
    set({
      startCity: "",
      destination: "",
      date: "",
      busData: [],
      activeTab: "home",
    }),
}));

export default BookingStore;
