import { createStore } from "vuex";

declare module "vuex" {
  export function createStore<Options extends StoreOptions<unknown>>(
    options: Options
  ): EnhancedStore<
    Options extends StoreOptions<infer State> ? State : never,
    NonNullable<Options["getters"]>,
    NonNullable<Options["mutations"]>,
    NonNullable<Options["actions"]>,
    NonNullable<Options["modules"]>
  >;

  interface EnhancedStore<
    State,
    Getters extends GetterTree<State, State>,
    Mutations extends MutationTree<State>,
    Actions extends ActionTree<State, State>,
    Modules extends ModuleTree<State>
  > extends Store<unknown> {
    readonly state: NestedState<State, State, Modules>;
    readonly getters: NamespacedGetterReturnTypes<
      State,
      State,
      Getters,
      Modules
    >;

    commit: EnhancedCommit<State, Mutations, Modules>;
    dispatch: EnhancedDispatch<State, State, Actions, Modules>;
  }

  type NestedState<
    State,
    RootState,
    Modules extends ModuleTree<RootState>
  > = State &
    {
      [Name in keyof Modules]: Modules[Name]["state"] &
        (Modules[Name]["modules"] extends ModuleTree<RootState>
          ? NestedState<
              Modules[Name]["state"],
              RootState,
              Modules[Name]["modules"]
            >
          : {});
    };

  type NamespacedGetterReturnTypes<
    State,
    RootState,
    Getters extends GetterTree<State, RootState>,
    Modules extends ModuleTree<RootState>
  > = {
    [Name in keyof Getters]: ReturnType<Getters[Name]>;
  } &
    {
      [Path in ExtractNamespacedPaths<
        RootState,
        Modules,
        "getters"
      >]: ResolveNamespacedPath<
        Path,
        "getters",
        RootState,
        Modules
      > extends infer Getter
        ? Getter extends () => infer ReturnType
          ? ReturnType
          : never
        : never;
    };

  interface EnhancedCommit<
    RootState,
    Mutations extends MutationTree<RootState>,
    Modules extends ModuleTree<RootState>
  > {
    <Type extends keyof Mutations>(
      type: Type,
      payload?: Parameters<Mutations[Type]>[1],
      options?: CommitOptions
    ): void;

    <Path extends ExtractNamespacedPaths<RootState, Modules, "mutations">>(
      type: Path,
      payload?: ResolveNamespacedPath<
        Path,
        "mutations",
        RootState,
        Modules
      > extends infer Mutation
        ? Mutation extends (...args: [infer State, infer Payload]) => void
          ? Payload
          : never
        : never,
      options?: CommitOptions
    ): void;
  }

  interface EnhancedDispatch<
    State,
    RootState,
    Actions extends ActionTree<State, RootState>,
    Modules extends ModuleTree<RootState>
  > {
    <Type extends keyof Actions>(
      type: Type,
      payload?: Parameters<
        ExtractActionHandler<State, RootState, Actions[Type]>
      >[1]
    ): ReturnType<ExtractActionHandler<State, RootState, Actions[Type]>>;

    <Path extends ExtractNamespacedPaths<RootState, Modules, "actions">>(
      type: Path,
      payload?: ResolveNamespacedPath<
        Path,
        "actions",
        RootState,
        Modules
      > extends infer Action_
        ? Action_ extends Action<State, RootState>
          ? Parameters<ExtractActionHandler<State, RootState, Action_>>[1]
          : never
        : never
    ): ResolveNamespacedPath<
      Path,
      "actions",
      RootState,
      Modules
    > extends infer Action_
      ? Action_ extends Action<State, RootState>
        ? ReturnType<ExtractActionHandler<State, RootState, Action_>>
        : never
      : never;
  }

  type ExtractActionHandler<
    State,
    RootState,
    Action_ extends Action<State, RootState>
  > = Action_ extends ActionObject<State, RootState>
    ? Action_["handler"]
    : Action_;

  type ExtractNamespacedPaths<
    RootState,
    Modules extends ModuleTree<RootState>,
    KeysFrom extends keyof Module<unknown, unknown>
  > = {
    [Name in string & keyof Modules]:
      | `${Name}/${string & keyof Modules[Name][KeysFrom]}`
      | `${Name}/${Modules[Name]["modules"] extends ModuleTree<RootState>
          ? ExtractNamespacedPaths<
              RootState,
              Modules[Name]["modules"],
              KeysFrom
            >
          : never}`;
  } extends infer T
    ? T[keyof T]
    : never;

  type ResolveNamespacedPath<
    Path extends string,
    KeysFrom extends keyof Module<unknown, unknown>,
    RootState,
    Modules extends ModuleTree<RootState>
  > = Path extends `${infer ModuleName}/${infer RestPathOrKey}`
    ? RestPathOrKey extends keyof Modules[ModuleName][KeysFrom]
      ? Modules[ModuleName][KeysFrom][RestPathOrKey]
      : ResolveNamespacedPath<
          RestPathOrKey,
          KeysFrom,
          RootState,
          NonNullable<Modules[ModuleName]["modules"]>
        >
    : never;
}

const store = createStore({});
export default store;

declare module "vuex" {
  export function useStore(): typeof store;
}
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: typeof store;
  }
}
