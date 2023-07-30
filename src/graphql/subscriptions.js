/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateConversation = /* GraphQL */ `
  subscription OnCreateConversation(
    $filter: ModelSubscriptionConversationFilterInput
    $owner: String
  ) {
    onCreateConversation(filter: $filter, owner: $owner) {
      id
      name
      messages
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateConversation = /* GraphQL */ `
  subscription OnUpdateConversation(
    $filter: ModelSubscriptionConversationFilterInput
    $owner: String
  ) {
    onUpdateConversation(filter: $filter, owner: $owner) {
      id
      name
      messages
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteConversation = /* GraphQL */ `
  subscription OnDeleteConversation(
    $filter: ModelSubscriptionConversationFilterInput
    $owner: String
  ) {
    onDeleteConversation(filter: $filter, owner: $owner) {
      id
      name
      messages
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
