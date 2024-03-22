import { FetchMediaMetadataResponse } from '../../../../../types/interfaces/MediaData'
import fetchMediaMetadata from './'

describe('fetchMediaMetadata', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  const mockFetchSuccess = (
    data: Partial<FetchMediaMetadataResponse['data']> = {},
  ) =>
    //   @ts-ignore
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(data),
    })

  const mockFetchError = (status: number) =>
    //   @ts-ignore
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      status,
      json: () =>
        Promise.resolve({
          error: `Failed to fetch data. Status: ${status}`,
          data: null,
        }),
    })

  const mockFetchNetworkError = () =>
    jest
      .spyOn(global, 'fetch')
      .mockRejectedValueOnce(new Error('Network error'))

  it('should fetch media metadata successfully', async () => {
    const mockResponse = {
      genres: ['Action'],
      years: ['2020', '2021'],
    }
    mockFetchSuccess(mockResponse)

    const result = await fetchMediaMetadata()

    expect(result.error).toBeNull()
    expect(result.data).toStrictEqual(mockResponse)
  })

  it('should handle API error and return an error message', async () => {
    mockFetchError(500)

    const result = await fetchMediaMetadata()

    expect(result.error).toEqual('Failed to fetch data. Status: 500')
    expect(result.data).toBeNull()
  })

  it('should handle network error and return a generic error message', async () => {
    mockFetchNetworkError()

    const result = await fetchMediaMetadata()

    expect(result.error).toEqual('Network error')
    expect(result.data).toBeNull()
  })
})
