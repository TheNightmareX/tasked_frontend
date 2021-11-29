import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type AcceptJoinApplicationResult = {
  __typename?: 'AcceptJoinApplicationResult';
  application: JoinApplication;
  membership: Membership;
};

export enum ApplicationStatus {
  Accepted = 'Accepted',
  Pending = 'Pending',
  Rejected = 'Rejected',
}

export type Assignment = {
  __typename?: 'Assignment';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isCompleted: Scalars['Boolean'];
  isImportant: Scalars['Boolean'];
  recipient: Membership;
  task: Task;
  updatedAt: Scalars['DateTime'];
};

export type AssignmentCreateInput = {
  isImportant?: Maybe<Scalars['Boolean']>;
  recipient: Scalars['ID'];
  task: Scalars['ID'];
};

export type AssignmentUpdateInput = {
  isCompleted?: Maybe<Scalars['Boolean']>;
  isImportant?: Maybe<Scalars['Boolean']>;
};

export type AuthResult = {
  __typename?: 'AuthResult';
  token: Scalars['String'];
  user: User;
};

export type Room = {
  __typename?: 'Room';
  assignments: PaginatedAssignments;
  createdAt: Scalars['DateTime'];
  creator: User;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isOpen: Scalars['Boolean'];
  joinApplications: PaginatedJoinApplications;
  membership?: Maybe<Membership>;
  memberships: PaginatedMemberships;
  name: Scalars['String'];
  tasks: PaginatedTasks;
  updatedAt: Scalars['DateTime'];
};

export type RoomAssignmentsArgs = {
  isCompleted?: Maybe<Scalars['Boolean']>;
  isOwn?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type RoomJoinApplicationsArgs = {
  isPending?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type RoomMembershipsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type RoomTasksArgs = {
  isOwn?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type RoomCreateInput = {
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type RoomUpdateInput = {
  description?: Maybe<Scalars['String']>;
  isOpen?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
};

export enum Gender {
  Female = 'Female',
  Male = 'Male',
  Unknown = 'Unknown',
}

export type JoinApplication = {
  __typename?: 'JoinApplication';
  room: Room;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  message?: Maybe<Scalars['String']>;
  owner: User;
  status: ApplicationStatus;
  updatedAt: Scalars['DateTime'];
};

export type JoinApplicationCreateInput = {
  room: Scalars['ID'];
  message?: Maybe<Scalars['String']>;
};

export type Membership = {
  __typename?: 'Membership';
  assignments: PaginatedAssignments;
  room: Room;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  owner: User;
  role: Role;
  updatedAt: Scalars['DateTime'];
};

export type MembershipAssignmentsArgs = {
  isCompleted?: Maybe<Scalars['Boolean']>;
  isOwn?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type MembershipUpdateInput = {
  role?: Maybe<Role>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptJoinApplication: AcceptJoinApplicationResult;
  auth: AuthResult;
  createAssignment: Assignment;
  createRoom: Room;
  createJoinApplication: JoinApplication;
  createTask: Task;
  createUser: User;
  deleteAssignment: Assignment;
  deleteRoom: Room;
  deleteMembership: Membership;
  deleteTask: Task;
  rejectJoinApplication: JoinApplication;
  updateAssignment: Assignment;
  updateRoom: Room;
  updateMembership: Membership;
  updateTask: Task;
  updateUser: User;
};

export type MutationAcceptJoinApplicationArgs = {
  id: Scalars['ID'];
};

export type MutationAuthArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type MutationCreateAssignmentArgs = {
  data: AssignmentCreateInput;
};

export type MutationCreateRoomArgs = {
  data: RoomCreateInput;
};

export type MutationCreateJoinApplicationArgs = {
  data: JoinApplicationCreateInput;
};

export type MutationCreateTaskArgs = {
  data: TaskCreateInput;
};

export type MutationCreateUserArgs = {
  data: UserCreateInput;
};

export type MutationDeleteAssignmentArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteRoomArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteMembershipArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteTaskArgs = {
  id: Scalars['ID'];
};

export type MutationRejectJoinApplicationArgs = {
  id: Scalars['ID'];
};

export type MutationUpdateAssignmentArgs = {
  data: AssignmentUpdateInput;
  id: Scalars['ID'];
};

export type MutationUpdateRoomArgs = {
  data: RoomUpdateInput;
  id: Scalars['ID'];
};

export type MutationUpdateMembershipArgs = {
  data: MembershipUpdateInput;
  id: Scalars['ID'];
};

export type MutationUpdateTaskArgs = {
  data: TaskUpdateInput;
  id: Scalars['ID'];
};

export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  id: Scalars['ID'];
};

export type PaginatedAssignments = {
  __typename?: 'PaginatedAssignments';
  results: Array<Assignment>;
  total: Scalars['Int'];
};

export type PaginatedRooms = {
  __typename?: 'PaginatedRooms';
  results: Array<Room>;
  total: Scalars['Int'];
};

export type PaginatedJoinApplications = {
  __typename?: 'PaginatedJoinApplications';
  results: Array<JoinApplication>;
  total: Scalars['Int'];
};

export type PaginatedMemberships = {
  __typename?: 'PaginatedMemberships';
  results: Array<Membership>;
  total: Scalars['Int'];
};

export type PaginatedTasks = {
  __typename?: 'PaginatedTasks';
  results: Array<Task>;
  total: Scalars['Int'];
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  results: Array<User>;
  total: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  assignment: Assignment;
  assignments: PaginatedAssignments;
  room: Room;
  rooms: PaginatedRooms;
  joinApplication: JoinApplication;
  joinApplications: PaginatedJoinApplications;
  me: User;
  membership: Membership;
  memberships: PaginatedMemberships;
  task: Task;
  tasks: PaginatedTasks;
  user: User;
  users: PaginatedUsers;
};

export type QueryAssignmentArgs = {
  id: Scalars['ID'];
};

export type QueryAssignmentsArgs = {
  isCompleted?: Maybe<Scalars['Boolean']>;
  isOwn?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type QueryRoomArgs = {
  id: Scalars['ID'];
};

export type QueryRoomsArgs = {
  isJoined?: Maybe<Scalars['Boolean']>;
  isOpen?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type QueryJoinApplicationArgs = {
  id: Scalars['ID'];
};

export type QueryJoinApplicationsArgs = {
  isPending?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type QueryMembershipArgs = {
  id: Scalars['ID'];
};

export type QueryMembershipsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type QueryTaskArgs = {
  id: Scalars['ID'];
};

export type QueryTasksArgs = {
  isOwn?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type QueryUsersArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export enum Role {
  Student = 'Student',
  Teacher = 'Teacher',
}

export type Task = {
  __typename?: 'Task';
  assignments: PaginatedAssignments;
  room: Room;
  createdAt: Scalars['DateTime'];
  creator: User;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type TaskAssignmentsArgs = {
  isCompleted?: Maybe<Scalars['Boolean']>;
  isOwn?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type TaskCreateInput = {
  room: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type TaskUpdateInput = {
  room?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  assignments: PaginatedAssignments;
  rooms: PaginatedRooms;
  createdAt: Scalars['DateTime'];
  gender: Gender;
  id: Scalars['ID'];
  joinApplications: PaginatedJoinApplications;
  memberships: PaginatedMemberships;
  nickname?: Maybe<Scalars['String']>;
  tasks: PaginatedTasks;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserAssignmentsArgs = {
  isCompleted?: Maybe<Scalars['Boolean']>;
  isOwn?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type UserRoomsArgs = {
  isJoined?: Maybe<Scalars['Boolean']>;
  isOpen?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type UserJoinApplicationsArgs = {
  isPending?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type UserMembershipsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type UserTasksArgs = {
  isOwn?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type UserCreateInput = {
  gender?: Maybe<Gender>;
  nickname?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserUpdateInput = {
  gender?: Maybe<Gender>;
  nickname?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type AssignmentCreateMutationVariables = Exact<{
  data: AssignmentCreateInput;
}>;

export type AssignmentCreateMutation = {
  __typename?: 'Mutation';
  createAssignment: {
    __typename?: 'Assignment';
    id: string;
    recipient: { __typename?: 'Membership'; id: string };
  };
};

export type AssignmentDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type AssignmentDeleteMutation = {
  __typename?: 'Mutation';
  deleteAssignment: { __typename?: 'Assignment'; id: string };
};

export type AssignmentUpdateMutationVariables = Exact<{
  id: Scalars['ID'];
  data: AssignmentUpdateInput;
}>;

export type AssignmentUpdateMutation = {
  __typename?: 'Mutation';
  updateAssignment: {
    __typename?: 'Assignment';
    id: string;
    isCompleted: boolean;
    isImportant: boolean;
  };
};

export type AuthMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;

export type AuthMutation = {
  __typename?: 'Mutation';
  auth: { __typename?: 'AuthResult'; token: string };
};

export type RoomAssignmentListQueryVariables = Exact<{
  id: Scalars['ID'];
  offset?: Maybe<Scalars['Int']>;
  isCompleted?: Maybe<Scalars['Boolean']>;
  isOwn?: Maybe<Scalars['Boolean']>;
}>;

export type RoomAssignmentListQuery = {
  __typename?: 'Query';
  room: {
    __typename?: 'Room';
    id: string;
    assignments: {
      __typename?: 'PaginatedAssignments';
      total: number;
      results: Array<{
        __typename?: 'Assignment';
        id: string;
        isCompleted: boolean;
        isImportant: boolean;
        createdAt: any;
        recipient: { __typename?: 'Membership'; id: string };
        task: {
          __typename?: 'Task';
          id: string;
          title: string;
          description?: string | null | undefined;
          creator: {
            __typename?: 'User';
            id: string;
            username: string;
            nickname?: string | null | undefined;
          };
        };
      }>;
    };
  };
};

export type RoomCreateMutationVariables = Exact<{
  data: RoomCreateInput;
}>;

export type RoomCreateMutation = {
  __typename?: 'Mutation';
  createRoom: {
    __typename?: 'Room';
    id: string;
    name: string;
    description?: string | null | undefined;
    isOpen: boolean;
    creator: {
      __typename?: 'User';
      id: string;
      username: string;
      nickname?: string | null | undefined;
    };
    membership?:
      | { __typename?: 'Membership'; id: string; role: Role }
      | null
      | undefined;
  };
};

export type RoomDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type RoomDeleteMutation = {
  __typename?: 'Mutation';
  deleteRoom: { __typename?: 'Room'; id: string };
};

export type RoomDetailQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type RoomDetailQuery = {
  __typename?: 'Query';
  room: {
    __typename?: 'Room';
    id: string;
    name: string;
    description?: string | null | undefined;
    isOpen: boolean;
    creator: {
      __typename?: 'User';
      id: string;
      username: string;
      nickname?: string | null | undefined;
    };
    membership?:
      | { __typename?: 'Membership'; id: string; role: Role }
      | null
      | undefined;
  };
};

export type RoomListQueryVariables = Exact<{
  offset?: Maybe<Scalars['Int']>;
}>;

export type RoomListQuery = {
  __typename?: 'Query';
  rooms: {
    __typename?: 'PaginatedRooms';
    total: number;
    results: Array<{
      __typename?: 'Room';
      id: string;
      name: string;
      description?: string | null | undefined;
      isOpen: boolean;
      creator: {
        __typename?: 'User';
        id: string;
        username: string;
        nickname?: string | null | undefined;
      };
      membership?:
        | { __typename?: 'Membership'; id: string; role: Role }
        | null
        | undefined;
    }>;
  };
};

export type RoomMembershipListQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type RoomMembershipListQuery = {
  __typename?: 'Query';
  room: {
    __typename?: 'Room';
    id: string;
    memberships: {
      __typename?: 'PaginatedMemberships';
      total: number;
      results: Array<{
        __typename?: 'Membership';
        id: string;
        role: Role;
        owner: {
          __typename?: 'User';
          id: string;
          username: string;
          nickname?: string | null | undefined;
          gender: Gender;
        };
      }>;
    };
  };
};

export type RoomTaskListQueryVariables = Exact<{
  id: Scalars['ID'];
  offset?: Maybe<Scalars['Int']>;
}>;

export type RoomTaskListQuery = {
  __typename?: 'Query';
  room: {
    __typename?: 'Room';
    id: string;
    tasks: {
      __typename?: 'PaginatedTasks';
      total: number;
      results: Array<{
        __typename?: 'Task';
        id: string;
        title: string;
        description?: string | null | undefined;
        createdAt: any;
        assignments: { __typename?: 'PaginatedAssignments'; total: number };
      }>;
    };
  };
};

export type RoomUpdateMutationVariables = Exact<{
  id: Scalars['ID'];
  data: RoomUpdateInput;
}>;

export type RoomUpdateMutation = {
  __typename?: 'Mutation';
  updateRoom: {
    __typename?: 'Room';
    id: string;
    name: string;
    description?: string | null | undefined;
    isOpen: boolean;
    creator: {
      __typename?: 'User';
      id: string;
      username: string;
      nickname?: string | null | undefined;
    };
    membership?:
      | { __typename?: 'Membership'; id: string; role: Role }
      | null
      | undefined;
  };
};

export type RoomFragment = {
  __typename?: 'Room';
  id: string;
  name: string;
  description?: string | null | undefined;
  isOpen: boolean;
  creator: {
    __typename?: 'User';
    id: string;
    username: string;
    nickname?: string | null | undefined;
  };
  membership?:
    | { __typename?: 'Membership'; id: string; role: Role }
    | null
    | undefined;
};

export type JoinApplicationAcceptMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type JoinApplicationAcceptMutation = {
  __typename?: 'Mutation';
  acceptJoinApplication: {
    __typename?: 'AcceptJoinApplicationResult';
    application: {
      __typename?: 'JoinApplication';
      id: string;
      message?: string | null | undefined;
      status: ApplicationStatus;
      createdAt: any;
      owner: {
        __typename?: 'User';
        id: string;
        username: string;
        nickname?: string | null | undefined;
        gender: Gender;
        updatedAt: any;
      };
      room: { __typename?: 'Room'; id: string; name: string };
    };
    membership: {
      __typename?: 'Membership';
      id: string;
      role: Role;
      owner: {
        __typename?: 'User';
        id: string;
        username: string;
        nickname?: string | null | undefined;
        gender: Gender;
      };
    };
  };
};

export type JoinApplicationCreateMutationVariables = Exact<{
  data: JoinApplicationCreateInput;
}>;

export type JoinApplicationCreateMutation = {
  __typename?: 'Mutation';
  createJoinApplication: {
    __typename?: 'JoinApplication';
    id: string;
    message?: string | null | undefined;
    status: ApplicationStatus;
    createdAt: any;
    owner: {
      __typename?: 'User';
      id: string;
      username: string;
      nickname?: string | null | undefined;
      gender: Gender;
      updatedAt: any;
    };
    room: { __typename?: 'Room'; id: string; name: string };
  };
};

export type JoinApplicationListQueryVariables = Exact<{
  offset?: Maybe<Scalars['Int']>;
  isPending?: Maybe<Scalars['Boolean']>;
}>;

export type JoinApplicationListQuery = {
  __typename?: 'Query';
  joinApplications: {
    __typename?: 'PaginatedJoinApplications';
    total: number;
    results: Array<{
      __typename?: 'JoinApplication';
      id: string;
      message?: string | null | undefined;
      status: ApplicationStatus;
      createdAt: any;
      owner: {
        __typename?: 'User';
        id: string;
        username: string;
        nickname?: string | null | undefined;
        gender: Gender;
        updatedAt: any;
      };
      room: { __typename?: 'Room'; id: string; name: string };
    }>;
  };
};

export type JoinApplicationRejectMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type JoinApplicationRejectMutation = {
  __typename?: 'Mutation';
  rejectJoinApplication: {
    __typename?: 'JoinApplication';
    id: string;
    message?: string | null | undefined;
    status: ApplicationStatus;
    createdAt: any;
    owner: {
      __typename?: 'User';
      id: string;
      username: string;
      nickname?: string | null | undefined;
      gender: Gender;
      updatedAt: any;
    };
    room: { __typename?: 'Room'; id: string; name: string };
  };
};

export type JoinApplicationFragment = {
  __typename?: 'JoinApplication';
  id: string;
  message?: string | null | undefined;
  status: ApplicationStatus;
  createdAt: any;
  owner: {
    __typename?: 'User';
    id: string;
    username: string;
    nickname?: string | null | undefined;
    gender: Gender;
    updatedAt: any;
  };
  room: { __typename?: 'Room'; id: string; name: string };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me: {
    __typename?: 'User';
    id: string;
    username: string;
    nickname?: string | null | undefined;
    gender: Gender;
    updatedAt: any;
  };
};

export type MembershipDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type MembershipDeleteMutation = {
  __typename?: 'Mutation';
  deleteMembership: { __typename?: 'Membership'; id: string };
};

export type MembershipUpdateMutationVariables = Exact<{
  id: Scalars['ID'];
  data: MembershipUpdateInput;
}>;

export type MembershipUpdateMutation = {
  __typename?: 'Mutation';
  updateMembership: {
    __typename?: 'Membership';
    id: string;
    role: Role;
    owner: {
      __typename?: 'User';
      id: string;
      username: string;
      nickname?: string | null | undefined;
      gender: Gender;
    };
  };
};

export type MembershipFragment = {
  __typename?: 'Membership';
  id: string;
  role: Role;
  owner: {
    __typename?: 'User';
    id: string;
    username: string;
    nickname?: string | null | undefined;
    gender: Gender;
  };
};

export type TaskAssignmentListAssignmentFragment = {
  __typename?: 'Assignment';
  id: string;
  recipient: { __typename?: 'Membership'; id: string };
};

export type TaskAssignmentListQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type TaskAssignmentListQuery = {
  __typename?: 'Query';
  task: {
    __typename?: 'Task';
    id: string;
    assignments: {
      __typename?: 'PaginatedAssignments';
      total: number;
      results: Array<{
        __typename?: 'Assignment';
        id: string;
        recipient: { __typename?: 'Membership'; id: string };
      }>;
    };
  };
};

export type TaskCreateMutationVariables = Exact<{
  data: TaskCreateInput;
}>;

export type TaskCreateMutation = {
  __typename?: 'Mutation';
  createTask: {
    __typename?: 'Task';
    id: string;
    title: string;
    description?: string | null | undefined;
    createdAt: any;
    assignments: { __typename?: 'PaginatedAssignments'; total: number };
  };
};

export type TaskDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type TaskDeleteMutation = {
  __typename?: 'Mutation';
  deleteTask: { __typename?: 'Task'; id: string };
};

export type TaskUpdateMutationVariables = Exact<{
  id: Scalars['ID'];
  data: TaskUpdateInput;
}>;

export type TaskUpdateMutation = {
  __typename?: 'Mutation';
  updateTask: {
    __typename?: 'Task';
    id: string;
    title: string;
    description?: string | null | undefined;
    createdAt: any;
    assignments: { __typename?: 'PaginatedAssignments'; total: number };
  };
};

export type TaskFragment = {
  __typename?: 'Task';
  id: string;
  title: string;
  description?: string | null | undefined;
  createdAt: any;
  assignments: { __typename?: 'PaginatedAssignments'; total: number };
};

export type UserCreateMutationVariables = Exact<{
  data: UserCreateInput;
}>;

export type UserCreateMutation = {
  __typename?: 'Mutation';
  createUser: {
    __typename?: 'User';
    id: string;
    username: string;
    nickname?: string | null | undefined;
    gender: Gender;
    updatedAt: any;
  };
};

export type UserUpdateMutationVariables = Exact<{
  id: Scalars['ID'];
  data: UserUpdateInput;
}>;

export type UserUpdateMutation = {
  __typename?: 'Mutation';
  updateUser: {
    __typename?: 'User';
    id: string;
    username: string;
    nickname?: string | null | undefined;
    gender: Gender;
    updatedAt: any;
  };
};

export type UserFragment = {
  __typename?: 'User';
  id: string;
  username: string;
  nickname?: string | null | undefined;
  gender: Gender;
  updatedAt: any;
};

export const RoomFragmentDoc = gql`
  fragment Room on Room {
    id
    name
    description
    isOpen
    creator {
      id
      username
      nickname
    }
    membership {
      id
      role
    }
  }
`;
export const UserFragmentDoc = gql`
  fragment User on User {
    id
    username
    nickname
    gender
    updatedAt
  }
`;
export const JoinApplicationFragmentDoc = gql`
  fragment JoinApplication on JoinApplication {
    id
    owner {
      ...User
    }
    room {
      id
      name
    }
    message
    status
    createdAt
  }
  ${UserFragmentDoc}
`;
export const MembershipFragmentDoc = gql`
  fragment Membership on Membership {
    id
    owner {
      id
      username
      nickname
      gender
    }
    role
  }
`;
export const TaskAssignmentListAssignmentFragmentDoc = gql`
  fragment TaskAssignmentListAssignment on Assignment {
    id
    recipient {
      id
    }
  }
`;
export const TaskFragmentDoc = gql`
  fragment Task on Task {
    id
    title
    description
    assignments {
      total
    }
    createdAt
  }
`;
export const AssignmentCreateDocument = gql`
  mutation AssignmentCreate($data: AssignmentCreateInput!) {
    createAssignment(data: $data) {
      ...TaskAssignmentListAssignment
    }
  }
  ${TaskAssignmentListAssignmentFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class AssignmentCreateGQL extends Apollo.Mutation<
  AssignmentCreateMutation,
  AssignmentCreateMutationVariables
> {
  document = AssignmentCreateDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const AssignmentDeleteDocument = gql`
  mutation AssignmentDelete($id: ID!) {
    deleteAssignment(id: $id) {
      id
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class AssignmentDeleteGQL extends Apollo.Mutation<
  AssignmentDeleteMutation,
  AssignmentDeleteMutationVariables
> {
  document = AssignmentDeleteDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const AssignmentUpdateDocument = gql`
  mutation AssignmentUpdate($id: ID!, $data: AssignmentUpdateInput!) {
    updateAssignment(id: $id, data: $data) {
      id
      isCompleted
      isImportant
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class AssignmentUpdateGQL extends Apollo.Mutation<
  AssignmentUpdateMutation,
  AssignmentUpdateMutationVariables
> {
  document = AssignmentUpdateDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const AuthDocument = gql`
  mutation Auth($username: String!, $password: String!) {
    auth(username: $username, password: $password) {
      token
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class AuthGQL extends Apollo.Mutation<
  AuthMutation,
  AuthMutationVariables
> {
  document = AuthDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const RoomAssignmentListDocument = gql`
  query RoomAssignmentList(
    $id: ID!
    $offset: Int
    $isCompleted: Boolean
    $isOwn: Boolean
  ) {
    room(id: $id) {
      id
      assignments(
        limit: 20
        offset: $offset
        isCompleted: $isCompleted
        isOwn: $isOwn
      ) {
        total
        results {
          id
          recipient {
            id
          }
          task {
            id
            title
            description
            creator {
              id
              username
              nickname
            }
          }
          isCompleted
          isImportant
          createdAt
        }
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class RoomAssignmentListGQL extends Apollo.Query<
  RoomAssignmentListQuery,
  RoomAssignmentListQueryVariables
> {
  document = RoomAssignmentListDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const RoomCreateDocument = gql`
  mutation RoomCreate($data: RoomCreateInput!) {
    createRoom(data: $data) {
      ...Room
    }
  }
  ${RoomFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class RoomCreateGQL extends Apollo.Mutation<
  RoomCreateMutation,
  RoomCreateMutationVariables
> {
  document = RoomCreateDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const RoomDeleteDocument = gql`
  mutation RoomDelete($id: ID!) {
    deleteRoom(id: $id) {
      id
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class RoomDeleteGQL extends Apollo.Mutation<
  RoomDeleteMutation,
  RoomDeleteMutationVariables
> {
  document = RoomDeleteDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const RoomDetailDocument = gql`
  query RoomDetail($id: ID!) {
    room(id: $id) {
      ...Room
    }
  }
  ${RoomFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class RoomDetailGQL extends Apollo.Query<
  RoomDetailQuery,
  RoomDetailQueryVariables
> {
  document = RoomDetailDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const RoomListDocument = gql`
  query RoomList($offset: Int) {
    rooms(limit: 20, offset: $offset, isJoined: true) {
      total
      results {
        ...Room
      }
    }
  }
  ${RoomFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class RoomListGQL extends Apollo.Query<
  RoomListQuery,
  RoomListQueryVariables
> {
  document = RoomListDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const RoomMembershipListDocument = gql`
  query RoomMembershipList($id: ID!) {
    room(id: $id) {
      id
      memberships {
        total
        results {
          ...Membership
        }
      }
    }
  }
  ${MembershipFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class RoomMembershipListGQL extends Apollo.Query<
  RoomMembershipListQuery,
  RoomMembershipListQueryVariables
> {
  document = RoomMembershipListDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const RoomTaskListDocument = gql`
  query RoomTaskList($id: ID!, $offset: Int) {
    room(id: $id) {
      id
      tasks(limit: 20, offset: $offset, isOwn: true) {
        total
        results {
          ...Task
        }
      }
    }
  }
  ${TaskFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class RoomTaskListGQL extends Apollo.Query<
  RoomTaskListQuery,
  RoomTaskListQueryVariables
> {
  document = RoomTaskListDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const RoomUpdateDocument = gql`
  mutation RoomUpdate($id: ID!, $data: RoomUpdateInput!) {
    updateRoom(id: $id, data: $data) {
      ...Room
    }
  }
  ${RoomFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class RoomUpdateGQL extends Apollo.Mutation<
  RoomUpdateMutation,
  RoomUpdateMutationVariables
> {
  document = RoomUpdateDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const JoinApplicationAcceptDocument = gql`
  mutation JoinApplicationAccept($id: ID!) {
    acceptJoinApplication(id: $id) {
      application {
        ...JoinApplication
      }
      membership {
        ...Membership
      }
    }
  }
  ${JoinApplicationFragmentDoc}
  ${MembershipFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class JoinApplicationAcceptGQL extends Apollo.Mutation<
  JoinApplicationAcceptMutation,
  JoinApplicationAcceptMutationVariables
> {
  document = JoinApplicationAcceptDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const JoinApplicationCreateDocument = gql`
  mutation JoinApplicationCreate($data: JoinApplicationCreateInput!) {
    createJoinApplication(data: $data) {
      ...JoinApplication
    }
  }
  ${JoinApplicationFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class JoinApplicationCreateGQL extends Apollo.Mutation<
  JoinApplicationCreateMutation,
  JoinApplicationCreateMutationVariables
> {
  document = JoinApplicationCreateDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const JoinApplicationListDocument = gql`
  query JoinApplicationList($offset: Int, $isPending: Boolean) {
    joinApplications(limit: 20, offset: $offset, isPending: $isPending) {
      total
      results {
        ...JoinApplication
      }
    }
  }
  ${JoinApplicationFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class JoinApplicationListGQL extends Apollo.Query<
  JoinApplicationListQuery,
  JoinApplicationListQueryVariables
> {
  document = JoinApplicationListDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const JoinApplicationRejectDocument = gql`
  mutation JoinApplicationReject($id: ID!) {
    rejectJoinApplication(id: $id) {
      ...JoinApplication
    }
  }
  ${JoinApplicationFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class JoinApplicationRejectGQL extends Apollo.Mutation<
  JoinApplicationRejectMutation,
  JoinApplicationRejectMutationVariables
> {
  document = JoinApplicationRejectDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const MeDocument = gql`
  query Me {
    me {
      ...User
    }
  }
  ${UserFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class MeGQL extends Apollo.Query<MeQuery, MeQueryVariables> {
  document = MeDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const MembershipDeleteDocument = gql`
  mutation MembershipDelete($id: ID!) {
    deleteMembership(id: $id) {
      id
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class MembershipDeleteGQL extends Apollo.Mutation<
  MembershipDeleteMutation,
  MembershipDeleteMutationVariables
> {
  document = MembershipDeleteDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const MembershipUpdateDocument = gql`
  mutation MembershipUpdate($id: ID!, $data: MembershipUpdateInput!) {
    updateMembership(id: $id, data: $data) {
      ...Membership
    }
  }
  ${MembershipFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class MembershipUpdateGQL extends Apollo.Mutation<
  MembershipUpdateMutation,
  MembershipUpdateMutationVariables
> {
  document = MembershipUpdateDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const TaskAssignmentListDocument = gql`
  query TaskAssignmentList($id: ID!) {
    task(id: $id) {
      id
      assignments {
        total
        results {
          ...TaskAssignmentListAssignment
        }
      }
    }
  }
  ${TaskAssignmentListAssignmentFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class TaskAssignmentListGQL extends Apollo.Query<
  TaskAssignmentListQuery,
  TaskAssignmentListQueryVariables
> {
  document = TaskAssignmentListDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const TaskCreateDocument = gql`
  mutation TaskCreate($data: TaskCreateInput!) {
    createTask(data: $data) {
      ...Task
    }
  }
  ${TaskFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class TaskCreateGQL extends Apollo.Mutation<
  TaskCreateMutation,
  TaskCreateMutationVariables
> {
  document = TaskCreateDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const TaskDeleteDocument = gql`
  mutation TaskDelete($id: ID!) {
    deleteTask(id: $id) {
      id
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class TaskDeleteGQL extends Apollo.Mutation<
  TaskDeleteMutation,
  TaskDeleteMutationVariables
> {
  document = TaskDeleteDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const TaskUpdateDocument = gql`
  mutation TaskUpdate($id: ID!, $data: TaskUpdateInput!) {
    updateTask(id: $id, data: $data) {
      ...Task
    }
  }
  ${TaskFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class TaskUpdateGQL extends Apollo.Mutation<
  TaskUpdateMutation,
  TaskUpdateMutationVariables
> {
  document = TaskUpdateDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const UserCreateDocument = gql`
  mutation UserCreate($data: UserCreateInput!) {
    createUser(data: $data) {
      ...User
    }
  }
  ${UserFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class UserCreateGQL extends Apollo.Mutation<
  UserCreateMutation,
  UserCreateMutationVariables
> {
  document = UserCreateDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const UserUpdateDocument = gql`
  mutation UserUpdate($id: ID!, $data: UserUpdateInput!) {
    updateUser(id: $id, data: $data) {
      ...User
    }
  }
  ${UserFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class UserUpdateGQL extends Apollo.Mutation<
  UserUpdateMutation,
  UserUpdateMutationVariables
> {
  document = UserUpdateDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
