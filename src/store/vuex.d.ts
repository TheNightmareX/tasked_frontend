import "vuex";

// Polyfill For My PR https://github.com/vuejs/vuex/pull/2033
declare module "vuex" {
  interface StricterPayload<Type extends string = string> extends Payload {
    type: Type;
  }

  export function createStore<Options extends StoreOptions<any>>(
    options: Options,
    stricterTypes: true
  ): StricterStore<
    Options extends StoreOptions<infer State> ? State : never,
    NonNullable<Options["getters"]>,
    NonNullable<Options["mutations"]>,
    NonNullable<Options["actions"]>,
    NonNullable<Options["modules"]>
  >;

  export interface StricterStore<
    RootState,
    Getters extends GetterTree<RootState, RootState>,
    Mutations extends MutationTree<RootState>,
    Actions extends ActionTree<RootState, RootState>,
    Modules extends ModuleTree<RootState>
  > extends Omit<
      Store<RootState>,
      "state" | "getters" | "dispatch" | "commit"
    > {
    readonly state: StoreState<RootState, RootState, Modules>;
    readonly getters: StoreGetters<RootState, RootState, Getters, Modules>;

    dispatch: StricterDispatch<RootState, RootState, Actions, Modules>;
    commit: StricterCommit<RootState, Mutations, Modules>;
  }
  type StoreState<
    State,
    RootState,
    Modules extends ModuleTree<RootState>
  > = State &
    {
      [Name in keyof Modules]: Modules[Name]["state"] &
        (Modules[Name]["modules"] extends ModuleTree<RootState>
          ? StoreState<
              Modules[Name]["state"],
              RootState,
              Modules[Name]["modules"]
            >
          : {});
    };

  type StoreGetters<
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

  interface StricterDispatch<
    State = any,
    RootState = any,
    Actions extends ActionTree<State, RootState> = any,
    Modules extends ModuleTree<RootState> = any
  > {
    <Type extends DispatchType<State, RootState, Actions, Modules>>(
      type: Type,
      payload?: ExtractPayloadType<
        DispatchAction<State, RootState, Actions, Modules, Type>
      >,
      options?: DispatchOptions
    ): ReturnType<DispatchAction<State, RootState, Actions, Modules, Type>>;

    <Type extends DispatchType<State, RootState, Actions, Modules>>(
      payloadWithType: StricterPayload<Type> &
        ExtractPayloadType<
          DispatchAction<State, RootState, Actions, Modules, Type>
        >,
      options?: DispatchOptions
    ): Promise<any>;
  }
  type DispatchType<
    State,
    RootState,
    Actions extends ActionTree<State, RootState>,
    Modules extends ModuleTree<RootState>
  > =
    | (string & keyof Actions)
    | ExtractNamespacedPaths<RootState, Modules, "actions">;
  type DispatchAction<
    State,
    RootState,
    Actions extends ActionTree<State, RootState>,
    Modules extends ModuleTree<RootState>,
    Type extends DispatchType<State, RootState, Actions, Modules>
  > = Type extends string & keyof Actions
    ? EnsureActionHandler<State, RootState, Actions[Type]>
    : Type extends ExtractNamespacedPaths<RootState, Modules, "actions">
    ? ResolveNamespacedPath<
        Type,
        "actions",
        RootState,
        Modules
      > extends infer ActionType
      ? ActionType extends Action<State, RootState>
        ? EnsureActionHandler<State, RootState, ActionType>
        : never
      : never
    : never;
  type EnsureActionHandler<
    State,
    RootState,
    ActionType extends Action<State, RootState>
  > = ActionType extends ActionObject<State, RootState>
    ? ActionType["handler"]
    : ActionType;

  interface StricterCommit<
    RootState = any,
    Mutations extends MutationTree<RootState> = any,
    Modules extends ModuleTree<RootState> = any
  > {
    <Type extends CommitType<RootState, Mutations, Modules>>(
      type: Type,
      payload?: ExtractPayloadType<
        CommitMutation<RootState, Mutations, Modules, Type>
      >,
      options?: CommitOptions
    ): void;

    <Type extends CommitType<RootState, Mutations, Modules>>(
      payloadWithType: StricterPayload<Type> &
        ExtractPayloadType<CommitMutation<RootState, Mutations, Modules, Type>>,
      options?: CommitOptions
    ): void;
  }
  type CommitType<
    RootState,
    Mutations extends MutationTree<RootState>,
    Modules extends ModuleTree<RootState>
  > =
    | (string & keyof Mutations)
    | ExtractNamespacedPaths<RootState, Modules, "mutations">;
  type CommitMutation<
    RootState,
    Mutations extends MutationTree<RootState>,
    Modules extends ModuleTree<RootState>,
    Type extends CommitType<RootState, Mutations, Modules>
  > = Type extends string & keyof Mutations
    ? Mutations[Type]
    : Type extends ExtractNamespacedPaths<RootState, Modules, "mutations">
    ? ResolveNamespacedPath<
        Type,
        "mutations",
        RootState,
        Modules
      > extends infer MutationType
      ? MutationType extends Mutation<any>
        ? MutationType
        : never
      : never
    : never;

  type ExtractPayloadType<
    T extends (_: any, payload: any, ...args: any[]) => any
  > = Parameters<T>[1];

  type ExtractNamespacedPaths<
    RootState,
    Modules extends ModuleTree<RootState>,
    KeysFrom extends keyof Module<unknown, unknown>
  > = {
    [Name in string & keyof Modules]: Modules[Name]["namespaced"] extends true
      ?
          | `${Name}/${string & keyof Modules[Name][KeysFrom]}`
          | `${Name}/${Modules[Name]["modules"] extends ModuleTree<RootState>
              ? ExtractNamespacedPaths<
                  RootState,
                  Modules[Name]["modules"],
                  KeysFrom
                >
              : never}`
      : never;
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
