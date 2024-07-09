import { configureStore } from "@reduxjs/toolkit";
import ClinicSlice from "../Features/ClinicSlice";

export const store = configureStore({
    reducer: {
        clinic: ClinicSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: ['yourNonSerializableAction'],
            // Or ignore certain paths:
            // ignoredPaths: ['some.path.to.ignore']
          },
        }),
    });
