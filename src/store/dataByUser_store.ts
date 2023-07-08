import { create } from "zustand";
import { shallow } from "zustand/shallow";

import { DataByUser_Interface } from "@/db";

interface State {
  dataByUser: DataByUser_Interface | undefined;
  set_dataByUser: (value: DataByUser_Interface) => void;
}

const useStore = create<State>((set) => ({
  dataByUser: undefined,
  set_dataByUser: (value) => set({ dataByUser: value }),
}));

// https://github.com/pmndrs/zustand#selecting-multiple-state-slices
export const useStore_dataByUser = () => {
  const { dataByUser, set_dataByUser } = useStore(
    (state) => ({
      dataByUser: state.dataByUser,
      set_dataByUser: state.set_dataByUser,
    }),
    shallow
  );

  return { dataByUser, set_dataByUser };
};
