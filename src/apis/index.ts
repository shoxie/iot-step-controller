import { MovementInstruction } from "@/types";
import axios from "axios";

// make a request to the API. example: api/<Axis>/move?x=<number>&y=<number>

export const moveBox = async (instructions: MovementInstruction[]) => {
  try {
    const response = await axios.post(`http://172.20.10.2:5000/motor/move`, instructions);
    return response.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
