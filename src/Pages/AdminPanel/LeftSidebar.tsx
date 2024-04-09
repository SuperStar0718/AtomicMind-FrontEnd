import React, { useEffect, useState } from "react";
import Header from "./Header";
import "react-range-slider-input/dist/style.css";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import { AppDispatch, RootState } from "@/store";
import { connect, useDispatch, useSelector } from "react-redux";
import { setSettings } from "@/actions/admin";
import Select from "react-tailwindcss-select";
import { nonStreamModel } from "./../../../../Backend/src/lib/llm";

const LeftSidebar = ({
  streamTemperatureProps,
  nonStreamTemperatureProps,
  chunkSizeProps,
  chunkOverlapProps,
  streamingModelProps,
  nonStreamingModelProps,
}) => {
  const settings = useSelector((state: RootState) => state.admin);
  const dispatch = useDispatch<AppDispatch>();
  const options = [
    { value: "claude-3-haiku-20240307", label: "claude-3-haiku-20240307" },
    { value: "claude-3-opus-20240229", label: "claude-3-opus-20240229" },
    { value: "gpt-4-turbo-preview", label: "gpt-4-turbo-preview" },
  ];

  const [streamTemperature, setStreamTemperature] = useState<number>(
    streamTemperatureProps * 100
  );
  const [streamingModel, setStreamingModel] = useState<any>({
    value: streamingModelProps,
    label: streamingModelProps,
    disabled: false
  });
  const [nonStreamingModel, setNonStreamingModel] = useState<any>({
    value: nonStreamingModelProps,
    label: nonStreamingModelProps,
    disabled: false
  });
  const [nonStreamTemperature, setNonStreamTemperature] = useState<number>(
    nonStreamTemperatureProps * 100
  );
  const [chunkSize, setChunkSize] = useState<number>(chunkSizeProps / 50);
  const [chunkOverlap, setChunkOverlap] = useState<number>(
    chunkOverlapProps / 50
  );

  const handleChangeStreamingModel = (value) => {
    console.log('value:', value)
    setStreamingModel(value);
  };

  const handleChangeNonStreamingModel = (value) => {
    console.log('value:', value)
    setNonStreamingModel(value);
  }

  useEffect(() => {
    setStreamTemperature(streamTemperatureProps * 100);
    setNonStreamTemperature(nonStreamTemperatureProps * 100);
    setChunkSize(chunkSizeProps / 50);
    setChunkOverlap(chunkOverlapProps / 50);
    setStreamingModel({ value: streamingModelProps, label: streamingModelProps });
    setNonStreamingModel({ value: nonStreamingModelProps, label: nonStreamingModelProps });
  }, [settings]);
  const handleStreamTemperature = (
    event: Event,
    newValue: number | number[]
  ) => {
    setStreamTemperature(newValue as number);
  };
  const handleNonStreamTemperature = (
    event: Event,
    newValue: number | number[]
  ) => {
    setNonStreamTemperature(newValue as number);
  };
  const handleChunkSize = (event: Event, newValue: number | number[]) => {
    setChunkSize(newValue as number);
  };
  const handleChunkOverlap = (event: Event, newValue: number | number[]) => {
    setChunkOverlap(newValue as number);
  };

  const handleSubmit = () => {
    dispatch(
      setSettings({
        streamTemperature: streamTemperature / 100,
        nonStreamTemperature: nonStreamTemperature / 100,
        chunkSize: chunkSize * 50,
        chunkOverlap: chunkOverlap * 50,
        streamingModel: streamingModel.value,
        nonStreamingModel: nonStreamingModel.value,
      })
    );
  };

  return (
    <div className="flex flex-col w-[30%] bg-white p-5 border-r-2 border-gray-300 rounded-s-xl">
      <Header title="SETTINGS" />
      <div className="p-3">
        <div className="title">
          Streaming Model Temperature: {streamTemperature / 100}{" "}
        </div>
        <Slider
          aria-label="Disabled slider"
          value={streamTemperature}
          onChange={handleStreamTemperature}
        />
      </div>
      <div className="p-3">
        <div className="title">
          NonStreaming Model Temperature: {nonStreamTemperature / 100}{" "}
        </div>
        <Slider
          aria-label="Disabled slider"
          value={nonStreamTemperature}
          onChange={handleNonStreamTemperature}
        />
      </div>
      <div className="p-3">
        <div className="title">chunkSize: {chunkSize * 50} </div>
        <Slider
          aria-label="Disabled slider"
          value={chunkSize}
          onChange={handleChunkSize}
        />
      </div>
      <div className="p-3">
        <div className="title">chunkOverlap: {chunkOverlap * 50} </div>
        <Slider
          aria-label="Disabled slider"
          value={chunkOverlap}
          onChange={handleChunkOverlap}
        />
      </div>
      <div className="p-3 w-80">
        <div className="title">Streaming Model: </div>
        <Select
          classNames={{
            menuButton: ({ isDisabled }) =>
              `flex text-sm  text-gray-500 border  border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none ${
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
          value={streamingModel}
          onChange={handleChangeStreamingModel}
          options={options}
        />
      </div>
      <div className="p-3 w-80">
        <div className="title">Non Streaming Model: </div>
        <Select
          classNames={{
            menuButton: ({ isDisabled }) =>
              `flex text-sm  text-gray-500 border  border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none ${
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
          value={nonStreamingModel}
          onChange={handleChangeNonStreamingModel}
          options={options}
        />
      </div>
      <div className="flex flex-row-reverse w-full pt-5">
        <Button variant="contained" className="w-32" onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  streamTemperatureProps: state.admin.streamTemperature,
  nonStreamTemperatureProps: state.admin.nonStreamTemperature,
  chunkSizeProps: state.admin.chunkSize,
  chunkOverlapProps: state.admin.chunkOverlap,
  streamingModelProps: state.admin.streamingModel,
  nonStreamingModelProps: state.admin.nonStreamingModel,
});

export default connect(mapStateToProps)(LeftSidebar);
