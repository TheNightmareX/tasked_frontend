import { createStore } from "vuex";
import { User } from "../models";

declare module "vuex" {
  export function useStore(): typeof store;
}
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: typeof store;
  }
}

const store = createStore(
  {
    state: {
      user: null as User | null,
    },
  },
  true
);

export default store;
