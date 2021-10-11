import {
    CREATE_MEDICATION,
    RETRIEVE_MEDICATION,
    UPDATE_MEDICATION,
    DELETE_MEDICATION,
    DELETE_ALL_MEDICATION
  } from "./types";
  
  import MedicationDataService from "../services/medication.service";
  
  export const createMedication = (name, price,quantity) => async (dispatch) => {
    try {
      const res = await MedicationDataService.create({ name, price,quantity });
  
      dispatch({
        type: CREATE_MEDICATION,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const retrieveMedications = () => async (dispatch) => {
    try {
      const res = await MedicationDataService.getAll();
  
      dispatch({
        type: RETRIEVE_MEDICATION,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateMedication = (id, data) => async (dispatch) => {
    try {
      const res = await MedicationDataService.update(id, data);
  
      dispatch({
        type: UPDATE_MEDICATION,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteMedication = (id) => async (dispatch) => {
    try {
      await MedicationDataService.delete(id);
  
      dispatch({
        type: DELETE_MEDICATION,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const deleteAllMedications = () => async (dispatch) => {
    try {
      const res = await MedicationDataService.deleteAll();
  
      dispatch({
        type: DELETE_ALL_MEDICATION,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  