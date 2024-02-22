import { Menu, Transition } from "@headlessui/react"
import { Cog6ToothIcon, UserCircleIcon } from "@heroicons/react/24/outline"
import { Fragment } from "react"

export const OptionsDropdown = ({
  items,
  footerComponent
}: {
  items: {
    title: string
    onClick: () => void
    icon: typeof UserCircleIcon
  }[]
  footerComponent?: React.ReactNode
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex w-full justify-center rounded-md py-2">
        <Cog6ToothIcon className="ml-2 mr-2 h-6 w-6 text-neutral-500" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items className="absolute right-2 z-10 mt-2 w-40 origin-top-right divide-y divide-neutral-700 rounded-md bg-neutral-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title}>
                <Menu.Item>
                  <button
                    className="flex w-full flex-row items-center p-4 pr-6"
                    onClick={item.onClick}>
                    <Icon className="ml-2 mr-2 h-6 w-6" />
                    <span>{item.title}</span>
                  </button>
                </Menu.Item>
              </div>
            )
          })}
          {footerComponent}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

// ──── SOURCE ─────────────────────────────────────────────────────────────────────────

// https://headlessui.com/react/menu
