import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { TEModal, TEModalDialog, TEModalContent } from "tw-elements-react";
import { Input } from "@material-tailwind/react";
import { TEInput } from "tw-elements-react";
import { getSettings, saveAsEnvironment } from "@/actions/admin";


export const SaveAsEnvironmentModal = ({ show, setOpenModal }) => {
  const dispatch = useDispatch<AppDispatch>();
const { selectedEnvironment } = useSelector(
  (state: RootState) => state.admin
);
  //   const [showFolder, setShowFolder] = useState(enableFolder);
  const [envName, setEnvName] = useState<string>("");
  const { userData } = useSelector((state: RootState) => state.auth);

  const onClickSave = () => {
    dispatch(
      saveAsEnvironment({...selectedEnvironment, newEnv:envName}, () => {
        setOpenModal(false);
        dispatch(getSettings());
      })
    );
  };

  

  useEffect(() => {
   
  }, [show, userData]);

  return (
    <TEModal
      show={show}
      setShow={setOpenModal}
      className=" fixed top-0 left-0 z-50 w-screen   p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] "
    >
      <TEModalDialog>
        <TEModalContent>
          <div className="w-full max-w-2xl max-h-full ">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-start justify-between p-5 rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
                  Save as a new Environment
                </h3>
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule={"evenodd"}
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="px-6 pb-6">
                <div className="select-menu">
                  <TEInput
                    type="text"
                    id="exampleFormControlInput1"
                    label="Input Your Environment Name"
                    value={envName}
                    onChange={(e) => setEnvName(e.target.value)}
                  ></TEInput>
                </div>
              </div>

              <div className="flex items-center justify-end p-6 pt-0 space-x-2 roun ded-b">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="text-[#6366f1] bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="text-white bg-[#6366f1] hover:bg-[#4f46e5] hover:border-[#4f46e5] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-[#6366f1] text-sm font-medium px-5 py-2.5 hover:text-white focus:z-10 "
                  onClick={() => onClickSave()}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </TEModalContent>
      </TEModalDialog>
    </TEModal>
  );
};
