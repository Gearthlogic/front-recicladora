import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

import { endLoading, startLoading } from "../../redux/actions/loading/loading";
import { setMessage } from "../../redux/actions/message";
import translations from '../../assets/translations.json'
import { ErrorType } from "../../constants/enums/erros.enum";
import { AxiosError } from "axios";

const defaultErrorCalback = (
  dispatch: Dispatch,
  error: AxiosError,
) => {
  const msg = error.response?.data.message;
  const message = translations['es-ES'][msg as ErrorType]  || "Ha ocurrido un error"
  
  dispatch(setMessage({ message }, "error"));
};

const defaultFinallyCallback = () => null;

export const useGlobalLoader = (
  callback: (dispatch: Dispatch<any>, ...params: any[]) => Promise<any>,
  errorCallback = defaultErrorCalback,
  finallyCallback = defaultFinallyCallback
) => {
  const dispatch = useDispatch();

  return useCallback(
    async (...params) => {
      dispatch(startLoading());
      try {
        await callback(dispatch, ...params);
      } catch (error) {
        console.log(error)
        errorCallback(dispatch, error as AxiosError);
      } finally {
        finallyCallback();
        dispatch(endLoading());
      }
    },
    [callback, errorCallback, finallyCallback, dispatch]
  );
};
