import { Link, useNavigate } from 'react-router-dom';
//import Logo from '../images/logo/logo.png';
import Logo from '../pages/Authentication/SignIn/components/logo.png';
import DarkModeSwitcher from './DarkModeSwitcher';
import DropdownMessage from './DropdownMessage';
import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';
import { useState } from 'react';

import Indicator from '../pages/Authentication/components/Indicator';

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const [matchList, setMatchList] = useState<[]>([]);
  const data = [
    { name: 'Dashboard', path: '/' },
    { name: 'Professeur', path: '/professeurs' },
    { name: 'Personnels', path: '/personnels' },
    { name: 'Cours', path: '/cours' },
    { name: 'Convocations', path: '/convocations' },
    { name: 'ConseilDisciplines', path: '/conseilDiscipline' },
    { name: 'Classes', path: '/classes' },
    { name: 'Eleves', path: '/eleves' },
    { name: 'Parents', path: '/parents' },
    { name: 'Calendar', path: '/calendar' },
    { name: 'Role', path: '/roles' },
    { name: 'Permission', path: '/permissions' },
    { name: 'Fautes', path: '/fautes' },
    { name: 'Reglement Interieur', path: '/reglements' },
    { name: 'Regles', path: '/regles' },
    { name: 'Suggestions', path: '/suggestions' },
    { name: 'Sanctions Prévues', path: '/sanctionPrevus' },
    { name: 'Reparation', path: '/reparations' },
  ];

  const handleTypingInput = (keyword: string) => {
    if (keyword.length > 0) {
      setMatchList(
        data.filter((item) =>
          item.name.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    }
  };

  const [inputValue, setInputValue] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [showIndicator, setShowIndicator] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleOptionSelect = (selectedValue: string) => {
    setInputValue(selectedValue.name);
    setIsDropdownOpen(false);
    selectOptionEvent(selectedValue);
    setShowIndicator(false);
  };

  const selectOptionEvent = (option: string) => {
    setIsDropdownOpen(false);
    navigate(option.path);
    setInputValue('');
  };

  const isEmpty = () => matchList.length === 0;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
    setShowIndicator(value !== '');
    setIsDropdownOpen(true);
    handleTypingInput(value);
  };

  const maxItemsToShow = 3; // Nombre maximal d'éléments à afficher sans scroller
  const totalItems = matchList.length;

  // Calcul du pourcentage en fonction du nombre d'éléments
  const topPercentage = Math.min((totalItems - maxItemsToShow) * 100, 440) * -1;

  return (
    <header className="sticky top-0 z-50 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
    <div className="flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11">
      <div className="flex items-center gap-2 sm:gap-4">
       {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-300'
                  }`}
                ></span>
                <span
                  className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && 'delay-400 !w-full'
                  }`}
                ></span>
                <span
                  className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-500'
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-[0]'
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-200'
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="block flex-shrink-0 lg:hidden" to="/">
            {/* <img src={Logo} alt="Logo" /> */}
            <div className="justify-content-center flex justify-center text-center">
              <div className="mb-2.5 inline-block flex">
                <span>
                  <img
                    className="hidden dark:block"
                    src={Logo}
                    alt="Logo"
                    width={70}
                    height={70}
                  />

                  <img
                    className="dark:hidden"
                    src={Logo}
                    alt="Logo"
                    width={70}
                    height={70}
                  />
                </span>
                <span className="text-bolder justify-content-center align-items-center pt-5 ">
                  School Discipline
                </span>
              </div>
            </div>
          </Link>
        </div>

        <div className="hidden sm:block">
          <form>
            <div className="relative w-full">
              <button className="absolute top-1/2 left-0 -translate-y-1/2">
                <svg
                  className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                    fill=""
                  />
                </svg>
              </button>

              <input
                type="text"
                className="w-full bg-transparent pr-4 pl-9 focus:outline-none"
                value={inputValue}
                placeholder={'Rechercher...'}
                id="input-label"
                autoComplete="off"
                required
                onChange={handleInputChange}
              />
              {showIndicator && (
                <div className="absolute right-4 top-1/2 mt-4 -translate-y-1/2 transform">
                  <Indicator widtf={5} height={5} border="blue" />
                </div>
              )}
              <div
                className="custom-input-dropdown w-full"
                style={{
                  display: isEmpty() ? 'none' : 'block',
                  maxHeight: '200px',
                  overflowY: 'auto',
                }}
              >
                <ul>
                  {matchList.length > 0 &&
                    isDropdownOpen &&
                    inputValue !== '' && (
                      <div
                        className={`custom-input-dropdown w-full`}
                        style={{ display: isEmpty() ? 'none' : 'block' }}
                      >
                        <ul
                          style={{ maxHeight: '300px', overflowY: 'auto' }}
                          className={`absolute top-${topPercentage}% border-gray-300 custom-select-ul w-full rounded-md border bg-white shadow-md`}
                        >
                          {matchList.map((option, index) => (
                            <li
                              className="bg-red hover:bg-red-600 custom-select-li w-full cursor-pointer px-4 py-1 dark:border-form-strokedark dark:bg-form-input"
                              key={index}
                              onClick={() => handleOptionSelect(option)}
                            >
                              {option.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </ul>
              </div>
            </div>
          </form>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}
            <DarkModeSwitcher />
            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Notification Menu Area --> */}
            <DropdownNotification />
            {/* <!-- Notification Menu Area --> */}

            {/* <!-- Chat Notification Area --> */}
            <DropdownMessage />
            {/* <!-- Chat Notification Area --> */}
          </ul>

          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
