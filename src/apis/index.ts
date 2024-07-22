import { MovementInstruction } from "@/types";
import axios from "axios";

// make a request to the API. example: api/<Axis>/move?x=<number>&y=<number>

export const moveBox = async (instructions: MovementInstruction[]) => {
  try {
    const response = await axios.post(
      `http://192.168.35.222:5000/step`,
      instructions
    );
    return response;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const dropBox = async () => {
  try {
    const response = await axios.get(`http://192.168.35.222:5000/drop`);
    return response;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const dragBox = async () => {
  try {
    const response = await axios.get(`http://192.168.35.222:5000/drag`);
    return response;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const cleanup = async () => {
  try {
    const response = await axios.get(`http://192.168.35.222:5000/cleanup`);
    return response;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
