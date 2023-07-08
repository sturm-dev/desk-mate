import { create } from "zustand";
import { shallow } from "zustand/shallow";

import { DataByWeek_Interface } from "@/db";

interface State {
  dataByWeek: DataByWeek_Interface | undefined;
  set_dataByWeek: (value: DataByWeek_Interface) => void;
}

const useStore = create<State>((set) => ({
  dataByWeek: undefined,
  set_dataByWeek: (value) => set({ dataByWeek: value }),
}));

// https://github.com/pmndrs/zustand#selecting-multiple-state-slices
export const useStore_dataByWeek = () => {
  const { dataByWeek, set_dataByWeek } = useStore(
    (state) => ({
      dataByWeek: state.dataByWeek,
      set_dataByWeek: state.set_dataByWeek,
    }),
    shallow
  );

  return { dataByWeek, set_dataByWeek };
};
