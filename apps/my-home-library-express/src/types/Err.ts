export default class Err extends Error {
  constructor(...args) {
    super(...args);
  }

  status: number
}
