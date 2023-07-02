import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  ArrowLeftOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

export const OptionsDropdown = ({
  children,
  onLogout = () => {},
}: {
  children: React.ReactNode;
  onLogout: () => void;
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex w-full justify-center rounded-md px-1 py-2">
        {children}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-10 right-2 mt-2 origin-top-right divide-y divide-neutral-700 rounded-md bg-neutral-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-4 flex flex-row items-center pr-6">
            <UserCircleIcon className="ml-2 mr-2 h-6 w-6 text-neutral-500" />
            <span className="text-neutral-500">sturmenta@gmail.com</span>
          </div>
          <Menu.Item>
            <button
              className="flex flex-row p-4 pr-6 items-center w-full"
              onClick={onLogout}
            >
              <ArrowLeftOnRectangleIcon className="ml-2 h-6 w-6 mr-2" />
              <span>Logout</span>
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

// ──── SOURCE ─────────────────────────────────────────────────────────────────────────

// https://headlessui.com/react/menu
