import React, { useEffect, useState } from "react";
import RightSidebar from "./RightSidebar";
import LeftSidebar from "./LeftSidebar";
import { AppDispatch, RootState } from "@/store";
import { connect, useDispatch } from "react-redux";
import { deleteEnvironment, getSettings } from "@/actions/admin";
import Select from "react-tailwindcss-select";
import { SaveAsEnvironmentModal } from "@/Components/Modal/SaveAsEnvironmentModal";
import { Button, Modal } from "flowbite-react";
import "./styles.css";
import { SELECT_ENVIRONMENT } from "@/actions/types";

const AdminPanel = ({ environmentProps, selectedEnvironmentProps }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [environment, setEnvironment] = useState<any>({});
  const [showSaveModal, setShowSaveModal] = useState(false);

  const [options, setOptions] = useState<any>([]);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  useEffect(() => {
    // console.log("environmentProps:", environmentProps);
    const options = environmentProps?.map((item) => {
      return {
        value: item.environment,
        label: item.environment,
        disabled: false,
      };
    });
    // console.log("options:", options);
    setOptions(options);
    if (selectedEnvironmentProps.environment == "") {
      console.log("selected Env");
      setEnvironment({
        value: environmentProps[0]?.environment,
        label: environmentProps[0]?.environment,
        disabled: false,
      });
      if (environmentProps[0])
        dispatch({
          type: SELECT_ENVIRONMENT,
          payload: environmentProps[0] ? environmentProps[0] : {},
        });
    }
  }, [environmentProps]);

  const handleChangeEnvironment = (value) => {
    console.log("value:", value);
    setEnvironment(value);
    dispatch({
      type: SELECT_ENVIRONMENT,
      payload: environmentProps.find(
        (item) => item.environment === value.value
      ),
    });
  };

  const handleSave = () => {
    setShowSaveModal(true);
  };

  const handleDelete = () => {
    dispatch(
      deleteEnvironment({ environment: environment.value }),
      dispatch(getSettings()),
      setOpen(false)
    );
  };

  useEffect(() => {
    dispatch(getSettings());
  }, []);

  return (
    <div className={` bg-gray-200 px-20 py-32 w-full h-screen flex flex-col`}>
      <div className="flex flex-col p-3 w-80">
        <div className="title">Environment: </div>
        <div className="flex flex-row gap-5">
          <div>
            <Select
              primaryColor="#2563EB"
              classNames={{
                menuButton: ({ isDisabled }) =>
                  `flex text-sm w-[296px]  text-gray-500 border  border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none ${
                    isDisabled
                      ? "bg-gray-200"
                      : "bg-white hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
                  }`,
                menu: "absolute z-10 min-w-[296px] bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
                listItem: ({ isSelected }) =>
                  `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                    isSelected
                      ? `text-white bg-blue-500`
                      : `text-gray-500 hover:bg-blue-100 hover:text-blue-500`
                  }`,
              }}
              value={environment}
              onChange={handleChangeEnvironment}
              options={options}
            />
          </div>
          <div className="flex flex-row items-center justify-center">
            <Button className="w-32" onClick={handleSave}>
              Save As
            </Button>
            <SaveAsEnvironmentModal
              show={showSaveModal}
              setOpenModal={setShowSaveModal}
            />
          </div>
          <div className="flex flex-row items-center justify-center">
            <Button color="warning" className="w-32" onClick={handleOpen}>
              Delete
            </Button>
            <Modal show={open} onClose={() => setOpen(false)}>
              <Modal.Body>
                <p className="text-xl leading-relaxed text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this `{environment.label}`
                  environment ?
                </p>
                <div className="flex flex-row-reverse gap-3">
                  <Button color="gray" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => handleDelete()}>OK</Button>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
      <div className="flex flex-row">
        <LeftSidebar />
        <RightSidebar />
      </div>
    </div>
  );
};
const mapStateToProps = (state: RootState) => ({
  environmentProps: state.admin.environments,
  selectedEnvironmentProps: state.admin.selectedEnvironment,
});

export default connect(mapStateToProps)(AdminPanel);
