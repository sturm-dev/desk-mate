import { create } from "zustand";
import { shallow } from "zustand/shallow";

import { DataByDay_Interface } from "@/db";

interface State {
  dataByDay: DataByDay_Interface | undefined;
  set_dataByDay: (value: DataByDay_Interface) => void;
}

const useStore = create<State>((set) => ({
  dataByDay: undefined,
  set_dataByDay: (value) => set({ dataByDay: value }),
}));

// https://github.com/pmndrs/zustand#selecting-multiple-state-slices
export const useStore_dataByDay = () => {
  const { dataByDay, set_dataByDay } = useStore(
    (state) => ({
      dataByDay: state.dataByDay,
      set_dataByDay: state.set_dataByDay,
    }),
    shallow
  );

  return { dataByDay, set_dataByDay };
};
