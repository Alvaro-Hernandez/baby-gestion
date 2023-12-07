// En un archivo separado, por ejemplo, __mocks__/firestoreMock.js
const getMock = jest.fn();
const docMock = jest.fn(() => ({get: getMock}));
const collectionMock = jest.fn(() => ({doc: docMock}));

const firestoreMock = {
  collection: collectionMock,
};

export default firestoreMock;
