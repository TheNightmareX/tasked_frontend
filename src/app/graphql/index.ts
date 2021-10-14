import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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

export type Affair = {
  __typename?: 'Affair';
  classroom: Classroom;
  createdAt: Scalars['DateTime'];
  date: Scalars['DateTime'];
  duration: Scalars['Int'];
  id: Scalars['ID'];
  isActivated: Scalars['Boolean'];
  remark: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type AffairCreateInput = {
  classroom: Scalars['Int'];
  date: Scalars['DateTime'];
  duration: Scalars['Int'];
  isActivated?: Maybe<Scalars['Boolean']>;
  remark?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export enum ApplicationStatus {
  Accepted = 'Accepted',
  Pending = 'Pending',
  Rejected = 'Rejected'
}

export type Assignment = {
  __typename?: 'Assignment';
  classroom: Classroom;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isCompleted: Scalars['Boolean'];
  isPublic: Scalars['Boolean'];
  recipient: User;
  task: Task;
  updatedAt: Scalars['DateTime'];
};

export type AssignmentCreateInput = {
  classroom: Scalars['ID'];
  isPublic?: Maybe<Scalars['Boolean']>;
  recipient: Scalars['ID'];
  task: Scalars['ID'];
};

export type AssignmentUpdateInput = {
  isPublic?: Maybe<Scalars['Boolean']>;
};

export type AuthResult = {
  __typename?: 'AuthResult';
  token: Scalars['String'];
  user: User;
};

export type Classroom = {
  __typename?: 'Classroom';
  affairs: PaginatedAffairs;
  createdAt: Scalars['DateTime'];
  creator: User;
  deletedAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  joinApplications: PaginatedJoinApplications;
  memberships: PaginatedMemberships;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};


export type ClassroomAffairsArgs = {
  isActivated?: Maybe<Scalars['Boolean']>;
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
  name?: Maybe<Scalars['String']>;
};

export enum Gender {
  Female = 'Female',
  Male = 'Male',
  Unknown = 'Unknown'
}

export type JoinApplication = {
  __typename?: 'JoinApplication';
  classroom: Classroom;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  message?: Maybe<Scalars['String']>;
  owner: User;
  role: Role;
  status: ApplicationStatus;
  updatedAt: Scalars['DateTime'];
};

export type JoinApplicationCreateInput = {
  classroom: Scalars['ID'];
  message?: Maybe<Scalars['String']>;
  role: Role;
};

export type JoinApplicationUpdateInput = {
  role?: Maybe<Role>;
};

export type Membership = {
  __typename?: 'Membership';
  classroom: Classroom;
  createdAt: Scalars['DateTime'];
  displayName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  owner: User;
  role: Role;
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptJoinApplication: AcceptJoinApplicationResult;
  auth: AuthResult;
  completeAssignment: Assignment;
  createAffair: Affair;
  createAssignment: Assignment;
  createClassroom: Classroom;
  createJoinApplication: JoinApplication;
  createTask: Task;
  createUser: User;
  deleteAffair: Affair;
  deleteAssignment: Assignment;
  deleteClassroom: Classroom;
  deleteMembership: Membership;
  deleteTask: Task;
  rejectJoinApplication: JoinApplication;
  updateAffair: Affair;
  updateAssignment: Assignment;
  updateClassroom: Classroom;
  updateJoinApplication: JoinApplication;
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


export type MutationCompleteAssignmentArgs = {
  id: Scalars['ID'];
};


export type MutationCreateAffairArgs = {
  data: AffairCreateInput;
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


export type MutationDeleteAffairArgs = {
  id: Scalars['ID'];
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


export type MutationUpdateAffairArgs = {
  data: AffairCreateInput;
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


export type MutationUpdateJoinApplicationArgs = {
  data: JoinApplicationUpdateInput;
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

export type PaginatedAffairs = {
  __typename?: 'PaginatedAffairs';
  results: Array<Affair>;
  total: Scalars['Int'];
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
  affair: Affair;
  affairs: PaginatedAffairs;
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


export type QueryAffairArgs = {
  id: Scalars['ID'];
};


export type QueryAffairsArgs = {
  isActivated?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryAssignmentArgs = {
  id: Scalars['ID'];
};


export type QueryAssignmentsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryClassroomArgs = {
  id: Scalars['ID'];
};


export type QueryClassroomsArgs = {
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
  Teacher = 'Teacher'
}

export type Task = {
  __typename?: 'Task';
  assignments: Assignment;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};


export type TaskAssignmentsArgs = {
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
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type UserClassroomsArgs = {
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

export type AuthMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type AuthMutation = { __typename?: 'Mutation', auth: { __typename?: 'AuthResult', token: string, user: { __typename?: 'User', id: string, username: string, nickname?: string | null | undefined, gender: Gender, createdAt: any, updatedAt: any } } };

export type ClassroomDetailQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ClassroomDetailQuery = { __typename?: 'Query', classroom: { __typename?: 'Classroom', id: string, name: string, description?: string | null | undefined } };

export type ClassroomListQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
}>;


export type ClassroomListQuery = { __typename?: 'Query', classrooms: { __typename?: 'PaginatedClassrooms', results: Array<{ __typename?: 'Classroom', id: string, name: string, creator: { __typename?: 'User', id: string, username: string, nickname?: string | null | undefined } }> } };

export type ClassroomMembershipListQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ClassroomMembershipListQuery = { __typename?: 'Query', classroom: { __typename?: 'Classroom', creator: { __typename?: 'User', id: string, username: string }, memberships: { __typename?: 'PaginatedMemberships', total: number, results: Array<{ __typename?: 'Membership', displayName?: string | null | undefined, role: Role, owner: { __typename?: 'User', id: string, username: string, nickname?: string | null | undefined, gender: Gender } }> } } };

export type CreateUserMutationVariables = Exact<{
  data: UserCreateInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, username: string, nickname?: string | null | undefined, gender: Gender, createdAt: any, updatedAt: any } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, username: string, nickname?: string | null | undefined, gender: Gender, createdAt: any, updatedAt: any } };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['ID'];
  data: UserUpdateInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, username: string, nickname?: string | null | undefined, gender: Gender, createdAt: any, updatedAt: any } };

export type CommonUserFragment = { __typename?: 'User', id: string, username: string, nickname?: string | null | undefined, gender: Gender, createdAt: any, updatedAt: any };

export const CommonUserFragmentDoc = gql`
    fragment CommonUser on User {
  id
  username
  nickname
  gender
  createdAt
  updatedAt
}
    `;
export const AuthDocument = gql`
    mutation Auth($username: String!, $password: String!) {
  auth(username: $username, password: $password) {
    token
    user {
      ...CommonUser
    }
  }
}
    ${CommonUserFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class AuthGQL extends Apollo.Mutation<AuthMutation, AuthMutationVariables> {
    document = AuthDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ClassroomDetailDocument = gql`
    query ClassroomDetail($id: ID!) {
  classroom(id: $id) {
    id
    name
    description
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ClassroomDetailGQL extends Apollo.Query<ClassroomDetailQuery, ClassroomDetailQueryVariables> {
    document = ClassroomDetailDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ClassroomListDocument = gql`
    query ClassroomList($limit: Int, $offset: Int) {
  classrooms(limit: $limit, offset: $offset) {
    results {
      id
      name
      creator {
        id
        username
        nickname
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ClassroomListGQL extends Apollo.Query<ClassroomListQuery, ClassroomListQueryVariables> {
    document = ClassroomListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ClassroomMembershipListDocument = gql`
    query ClassroomMembershipList($id: ID!) {
  classroom(id: $id) {
    creator {
      id
      username
    }
    memberships {
      total
      results {
        owner {
          id
          username
          nickname
          gender
        }
        displayName
        role
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ClassroomMembershipListGQL extends Apollo.Query<ClassroomMembershipListQuery, ClassroomMembershipListQueryVariables> {
    document = ClassroomMembershipListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateUserDocument = gql`
    mutation CreateUser($data: UserCreateInput!) {
  createUser(data: $data) {
    ...CommonUser
  }
}
    ${CommonUserFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateUserGQL extends Apollo.Mutation<CreateUserMutation, CreateUserMutationVariables> {
    document = CreateUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const MeDocument = gql`
    query Me {
  me {
    ...CommonUser
  }
}
    ${CommonUserFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class MeGQL extends Apollo.Query<MeQuery, MeQueryVariables> {
    document = MeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateUserDocument = gql`
    mutation UpdateUser($id: ID!, $data: UserUpdateInput!) {
  updateUser(id: $id, data: $data) {
    ...CommonUser
  }
}
    ${CommonUserFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateUserGQL extends Apollo.Mutation<UpdateUserMutation, UpdateUserMutationVariables> {
    document = UpdateUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }