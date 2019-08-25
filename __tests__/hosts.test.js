'use strict';

describe('Host names', () => {
  /** @type {import('../index')} */
  let isLocal;
  beforeAll(() => {
    process.on('unhandledRejection', up => {
      throw up;
    });
    process.once('warning', e => {
      throw e;
    });
    // load like here to catch any experimental warning
    isLocal = require('../index');
  });
  afterAll(() => {
    process.removeAllListeners('warning');
    process.removeAllListeners('unhandledRejection');
  });

  // we work with DNS resolver and it can be slow on CI
  beforeAll(() => jest.setTimeout(20000));

  it('works with `localhost`', async () =>
    expect(await isLocal('localhost')).toBeTruthy());

  it('works with `google.com`', async () =>
    expect(await isLocal('google.com')).toBeFalsy());

  it('works with some bad names', async () =>
    expect(await isLocal('definitely123.not.a.good.domain.name')).toBeFalsy());
});
