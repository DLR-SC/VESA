import { combineReducers, configureStore } from "@reduxjs/toolkit";
import CrossFilterReducer from "./crossfilters/crossFilterSlice";
import DatasetReducer from "./dataset/datasetSlice";
import UIReducer from "./ui/uiSlice";
import { listenerMiddleware } from "./listenerMiddleware";
import SelectedKeywordReducer from "./selectedKeyword/selectedKeywordSlice";
import { dataApi } from "./services/dataApi";
import { miscApi } from "./services/miscApi";
import { testDataApi } from "./services/testDataApi";
import { wordCloudApi } from "./services/wordCloudApi";

const rootReducer = combineReducers({
  selectedKeyword: SelectedKeywordReducer,
  crossFilters: CrossFilterReducer,
  dataset: DatasetReducer,
  ui: UIReducer,
  [dataApi.reducerPath]: dataApi.reducer,
  [miscApi.reducerPath]: miscApi.reducer,
  [wordCloudApi.reducerPath]: wordCloudApi.reducer,
  [testDataApi.reducerPath]: testDataApi.reducer,
});

// /** Listeners for chart filters */
// Listener middleware to listen for dataset and set the geoData
// startAppListening({
//   actionCreator: setDataset,
//   effect: async (action, listenerApi) => {
//     const { dataset } =
//       listenerApi.getState().dataset;
//     listenerApi.dispatch(setGeoData(dataset))
//   },
// });

export const Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(
        dataApi.middleware,
        miscApi.middleware
        // logger,
      )
      .prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
