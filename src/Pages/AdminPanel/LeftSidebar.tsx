import React, { useEffect, useState } from "react";
import Header from "./Header";
import "react-range-slider-input/dist/style.css";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import { AppDispatch, RootState } from "@/store";
import { connect, useDispatch, useSelector } from "react-redux";
import { setSettings } from "@/actions/admin";


const LeftSidebar = ({streamTemperatureProps, nonStreamTemperatureProps, chunkSizeProps, chunkOverlapProps}) => {
  const settings = useSelector((state: RootState) => state.admin);
  const dispatch = useDispatch<AppDispatch>();

  
  const [streamTemperature, setStreamTemperature] = useState<number>(streamTemperatureProps*100);
  const [nonStreamTemperature, setNonStreamTemperature] = useState<number>(nonStreamTemperatureProps*100);
  const [chunkSize, setChunkSize] = useState<number>(chunkSizeProps/50);
  const [chunkOverlap, setChunkOverlap] = useState<number>(chunkOverlapProps/50);

  useEffect(() => {
    setStreamTemperature(streamTemperatureProps*100);
    setNonStreamTemperature(nonStreamTemperatureProps*100);
    setChunkSize(chunkSizeProps/50);
    setChunkOverlap(chunkOverlapProps/50);
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
    dispatch(setSettings({
      streamTemperature: streamTemperature / 100,
      nonStreamTemperature: nonStreamTemperature / 100,
      chunkSize: chunkSize * 50,
      chunkOverlap: chunkOverlap * 50,
      }));
  }

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
      <div className="flex flex-row-reverse w-full">
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
});

export default connect(mapStateToProps)(LeftSidebar);
