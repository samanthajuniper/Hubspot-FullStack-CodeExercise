import fetchMedia from './'
import { FetchMediaResponse } from '../../../../../types/interfaces/MediaData'

describe('fetchMedia', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  const mockFetchSuccess = (data: Partial<FetchMediaResponse['data']> = {}) =>
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

  it('should fetch media successfully', async () => {
    const mockResponse = {
      media: [
        {
          id: 1,
          title: 'Movie 1',
          year: '2022',
          genre: 'Action',
          type: 'Movie',
          poster: 'poster.jpg',
        },
      ],
      paginationInfo: {
        totalRecords: 1,
        totalPages: 1,
        currentPage: 1,
        pageSize: 10,
      },
    }

    mockFetchSuccess(mockResponse)

    const result = await fetchMedia()

    expect(result.error).toBeNull()
    expect(result.data).toEqual(mockResponse)
  })

  it('should handle API error and return an error message', async () => {
    mockFetchError(500)

    const result = await fetchMedia()

    expect(result.error).toEqual('Failed to fetch data. Status: 500')
    expect(result.data).toBeNull()
  })

  it('should handle network error and return a generic error message', async () => {
    mockFetchNetworkError()

    const result = await fetchMedia()

    expect(result.error).toEqual('Network error')
    expect(result.data).toBeNull()
  })
})
