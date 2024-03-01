import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

const navigation = [
  { name: 'Why AIBOT', href: 'https://www.aim-bot.app/#whyAIM', current: false },
  { name: 'Roadmap', href: 'https://www.aim-bot.app/#roadmap-features', current: false },
  { name: 'Features', href: 'https://www.aim-bot.app/#roadmap-features', current: false },
  { name: 'Tokenomics', href: 'https://www.aim-bot.app/#tokenomics', current: false },
  { name: 'AI Portfolio', href: '/', current: true },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    <Disclosure as="nav" className="bg-[#030015] relative">
      {({ open }) => (
        <>
          <div className="px-2 first-letter:sm:px-6 lg:px-40">
            <div className="relative flex items-center justify-between h-20">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-between">
                <div className="flex items-center flex-shrink-0">
                  <img
                    className="h-10 w-28"
                    src="https://uploads-ssl.webflow.com/64b98ae8b7e1288cf71ec395/64c972302785e6db2d2b6bab_D.svg"
                    alt="Your Company"
                  />
                </div>
                <div className="z-[100] hidden border border-[#9B83D031] bg-[#110A27] rounded-3xl px-4 sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-white hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-md'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <Link to="/claimeth" className="sm:block hidden ml-7 bg-gradient-to-br from-[#D8CEF9] to-[#A58ED7] hover:translate-y-[-10px] transition-transform duration-700 ease-in-out text-[#241357] font-semibold py-2 px-6 rounded-md">
                        Claim Rewards
                    </Link>
                </div>
              </div>
            </div>
            <div className='block w-full line'></div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  target="_blank"
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
