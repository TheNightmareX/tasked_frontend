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
  classroom: Classroom;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isCompleted: Scalars['Boolean'];
  isImportant: Scalars['Boolean'];
  isPublic: Scalars['Boolean'];
  recipient: User;
  task: Task;
  updatedAt: Scalars['DateTime'];
};

export type AssignmentCreateInput = {
  classroom: Scalars['ID'];
  isImportant?: Maybe<Scalars['Boolean']>;
  isPublic?: Maybe<Scalars['Boolean']>;
  recipient: Scalars['ID'];
  task: Scalars['ID'];
};

export type AssignmentUpdateInput = {
  isCompleted?: Maybe<Scalars['Boolean']>;
  isImportant?: Maybe<Scalars['Boolean']>;
  isPublic?: Maybe<Scalars['Boolean']>;
};

export type AuthResult = {
  __typename?: 'AuthResult';
  token: Scalars['String'];
  user: User;
};

export type Classroom = {
  __typename?: 'Classroom';
  assignments: PaginatedAssignments;
  createdAt: Scalars['DateTime'];
  creator: User;
  deletedAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isOpen: Scalars['Boolean'];
  joinApplications: PaginatedJoinApplications;
  membership: Membership;
  memberships: PaginatedMemberships;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ClassroomAssignmentsArgs = {
  isCompleted?: Maybe<Scalars['Boolean']>;
  isOwn?: Maybe<Scalars['Boolean']>;
  isPublic?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type ClassroomJoinApplicationsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type ClassroomMembershipsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type ClassroomCreateInput = {
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type ClassroomUpdateInput = {
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
  classroom: Classroom;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  message?: Maybe<Scalars['String']>;
  owner: User;
  status: ApplicationStatus;
  updatedAt: Scalars['DateTime'];
};

export type JoinApplicationCreateInput = {
  classroom: Scalars['ID'];
  message?: Maybe<Scalars['String']>;
};

export type Membership = {
  __typename?: 'Membership';
  classroom: Classroom;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  owner: User;
  role: Role;
  updatedAt: Scalars['DateTime'];
};

export type MembershipUpdateInput = {
  role?: Maybe<Role>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptJoinApplication: AcceptJoinApplicationResult;
  auth: AuthResult;
  createAssignment: Assignment;
  createClassroom: Classroom;
  createJoinApplication: JoinApplication;
  createTask: Task;
  createUser: User;
  deleteAssignment: Assignment;
  deleteClassroom: Classroom;
  deleteMembership: Membership;
  deleteTask: Task;
  rejectJoinApplication: JoinApplication;
  updateAssignment: Assignment;
  updateClassroom: Classroom;
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

export type MutationCreateClassroomArgs = {
  data: ClassroomCreateInput;
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

export type MutationDeleteClassroomArgs = {
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

export type MutationUpdateClassroomArgs = {
  data: ClassroomUpdateInput;
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

export type PaginatedClassrooms = {
  __typename?: 'PaginatedClassrooms';
  results: Array<Classroom>;
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
  classroom: Classroom;
  classrooms: PaginatedClassrooms;
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
  isPublic?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type QueryClassroomArgs = {
  id: Scalars['ID'];
};

export type QueryClassroomsArgs = {
  isOpen?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type QueryJoinApplicationArgs = {
  id: Scalars['ID'];
};

export type QueryJoinApplicationsArgs = {
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
  assignments: Assignment;
  createdAt: Scalars['DateTime'];
  creator: User;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type TaskAssignmentsArgs = {
  isCompleted?: Maybe<Scalars['Boolean']>;
  isOwn?: Maybe<Scalars['Boolean']>;
  isPublic?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type TaskCreateInput = {
  description?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type TaskUpdateInput = {
  description?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  assignments: PaginatedAssignments;
  classrooms: PaginatedClassrooms;
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
  isPublic?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type UserClassroomsArgs = {
  isOpen?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type UserJoinApplicationsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type UserMembershipsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type UserTasksArgs = {
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
    isPublic: boolean;
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

export type ClassroomAssignmentListQueryVariables = Exact<{
  id: Scalars['ID'];
  isCompleted?: Maybe<Scalars['Boolean']>;
  isPublic?: Maybe<Scalars['Boolean']>;
  isOwn?: Maybe<Scalars['Boolean']>;
}>;

export type ClassroomAssignmentListQuery = {
  __typename?: 'Query';
  classroom: {
    __typename?: 'Classroom';
    id: string;
    assignments: {
      __typename?: 'PaginatedAssignments';
      total: number;
      results: Array<{
        __typename?: 'Assignment';
        id: string;
        isPublic: boolean;
        isCompleted: boolean;
        isImportant: boolean;
        createdAt: any;
        recipient: { __typename?: 'User'; id: string };
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

export type ClassroomCreateMutationVariables = Exact<{
  data: ClassroomCreateInput;
}>;

export type ClassroomCreateMutation = {
  __typename?: 'Mutation';
  createClassroom: { __typename?: 'Classroom'; id: string };
};

export type ClassroomDetailQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type ClassroomDetailQuery = {
  __typename?: 'Query';
  classroom: {
    __typename?: 'Classroom';
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
    membership: { __typename?: 'Membership'; id: string; role: Role };
  };
};

export type ClassroomListQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
}>;

export type ClassroomListQuery = {
  __typename?: 'Query';
  classrooms: {
    __typename?: 'PaginatedClassrooms';
    results: Array<{
      __typename?: 'Classroom';
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
      membership: { __typename?: 'Membership'; id: string; role: Role };
    }>;
  };
};

export type ClassroomMembershipListQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type ClassroomMembershipListQuery = {
  __typename?: 'Query';
  classroom: {
    __typename?: 'Classroom';
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

export type ClassroomUpdateMutationVariables = Exact<{
  id: Scalars['ID'];
  data: ClassroomUpdateInput;
}>;

export type ClassroomUpdateMutation = {
  __typename?: 'Mutation';
  updateClassroom: {
    __typename?: 'Classroom';
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
    membership: { __typename?: 'Membership'; id: string; role: Role };
  };
};

export type ClassroomFragment = {
  __typename?: 'Classroom';
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
  membership: { __typename?: 'Membership'; id: string; role: Role };
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

export const ClassroomFragmentDoc = gql`
  fragment Classroom on Classroom {
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
export const UserFragmentDoc = gql`
  fragment User on User {
    id
    username
    nickname
    gender
    updatedAt
  }
`;
export const AssignmentUpdateDocument = gql`
  mutation AssignmentUpdate($id: ID!, $data: AssignmentUpdateInput!) {
    updateAssignment(id: $id, data: $data) {
      id
      isCompleted
      isImportant
      isPublic
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
export const ClassroomAssignmentListDocument = gql`
  query ClassroomAssignmentList(
    $id: ID!
    $isCompleted: Boolean
    $isPublic: Boolean
    $isOwn: Boolean
  ) {
    classroom(id: $id) {
      id
      assignments(
        isCompleted: $isCompleted
        isPublic: $isPublic
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
          isPublic
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
export class ClassroomAssignmentListGQL extends Apollo.Query<
  ClassroomAssignmentListQuery,
  ClassroomAssignmentListQueryVariables
> {
  document = ClassroomAssignmentListDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const ClassroomCreateDocument = gql`
  mutation ClassroomCreate($data: ClassroomCreateInput!) {
    createClassroom(data: $data) {
      id
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class ClassroomCreateGQL extends Apollo.Mutation<
  ClassroomCreateMutation,
  ClassroomCreateMutationVariables
> {
  document = ClassroomCreateDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const ClassroomDetailDocument = gql`
  query ClassroomDetail($id: ID!) {
    classroom(id: $id) {
      ...Classroom
    }
  }
  ${ClassroomFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class ClassroomDetailGQL extends Apollo.Query<
  ClassroomDetailQuery,
  ClassroomDetailQueryVariables
> {
  document = ClassroomDetailDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const ClassroomListDocument = gql`
  query ClassroomList($limit: Int, $offset: Int) {
    classrooms(limit: $limit, offset: $offset) {
      results {
        ...Classroom
      }
    }
  }
  ${ClassroomFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class ClassroomListGQL extends Apollo.Query<
  ClassroomListQuery,
  ClassroomListQueryVariables
> {
  document = ClassroomListDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const ClassroomMembershipListDocument = gql`
  query ClassroomMembershipList($id: ID!) {
    classroom(id: $id) {
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
export class ClassroomMembershipListGQL extends Apollo.Query<
  ClassroomMembershipListQuery,
  ClassroomMembershipListQueryVariables
> {
  document = ClassroomMembershipListDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const ClassroomUpdateDocument = gql`
  mutation ClassroomUpdate($id: ID!, $data: ClassroomUpdateInput!) {
    updateClassroom(id: $id, data: $data) {
      ...Classroom
    }
  }
  ${ClassroomFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class ClassroomUpdateGQL extends Apollo.Mutation<
  ClassroomUpdateMutation,
  ClassroomUpdateMutationVariables
> {
  document = ClassroomUpdateDocument;

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
