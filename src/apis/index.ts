import { MovementInstruction } from "@/types";
import axios from "axios";

// make a request to the API. example: api/<Axis>/move?x=<number>&y=<number>

export const moveBox = async (instructions: MovementInstruction[], serverURL: string) => {
  try {
    const response = await axios.post(
      `http://${serverURL}:5000/step`,
      instructions
    );
    return response;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const dropBox = async (serverURL: string) => {
  try {
    const response = await axios.get(`http://${serverURL}:5000/drop`);
    return response;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const dragBox = async (serverURL: string) => {
  try {
    const response = await axios.get(`http://${serverURL}:5000/drag`);
    return response;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getConfig = async (serverURL: string) => {
  try {
    const response = await axios.get(`http://${serverURL}:5000/get_config`);
    return response;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const ignoreNonEmptySlots = async (value: boolean, serverURL: string) => {
  try {
    const response = await axios.post(`http://${serverURL}:5000/set_bypass`, { bypass: value });
    return response;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const changeManualMode = async (value: boolean, serverURL: string) => {
  try {
    const response = await axios.post(`http://${serverURL}:5000/manual_mode`, { manual_mode: value });
    return response;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const cleanup = async (serverURL: string) => {
  try {
    const response = await axios.get(`http://${serverURL}:5000/cleanup`);
    return response;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
