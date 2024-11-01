import React, { useEffect, useState } from "react";
import Header from "./Header";
import Button from "@mui/material/Button";
import { AppDispatch, RootState } from "@/store";
import { connect, useDispatch } from "react-redux";
import { setSettings } from "@/actions/admin";

const RightSidebar = ({ environment, systemPromptProps, userPromptProps }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [systemPrompt, setSystemPrompt] = useState<string>(systemPromptProps);
  const [userPrompt, setUserPrompt] = useState<string>(userPromptProps);
  const handleSubmit = () => {
    dispatch(
      setSettings({
        environment: environment,
        systemPrompt: systemPrompt,
        userPrompt: userPrompt,
      })
    );
  };

  useEffect(() => {
    setSystemPrompt(systemPromptProps);
    setUserPrompt(userPromptProps);
  }, [systemPromptProps, userPromptProps]);

  return (
    <div className="flex-auto p-5 bg-white rounded-e-xl">
      <Header title="PROMPTS" />
      <div className="py-4 text-gray-900">System Prompt:</div>
      <textarea
        id="systemPrompt"
        rows={10}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={systemPrompt}
        onChange={(e) => setSystemPrompt(e.target.value)}
      />
      <div className="py-4 text-gray-900">User Prompt:</div>
      <textarea
        id="systemPrompt"
        rows={10}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.target.value)}
      />
      <div className="flex flex-row-reverse w-full p-4">
        <Button variant="contained" className="w-32" onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </div>
  );
};
const mapStateToProps = (state: RootState) => ({
  environment: state.admin.selectedEnvironment.environment,
  systemPromptProps: state.admin.selectedEnvironment.systemPrompt,
  userPromptProps: state.admin.selectedEnvironment.userPrompt,
});

export default connect(mapStateToProps)(RightSidebar);
