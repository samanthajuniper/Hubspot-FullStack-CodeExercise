import buildFetchMediaEndpoint from '.'

describe('buildFetchMediaEndpoint', () => {
  it('should not add query params when no props are passed', () => {
    const result = buildFetchMediaEndpoint({})

    expect(result).toBe(`${process.env.REACT_APP_API_BASE_URL}`)
  })

  it('should include n years in the URL when years.length > 1', () => {
    const props = {
      years: ['2022', '2023'],
    }

    const result = buildFetchMediaEndpoint(props)

    expect(result).toBe(
      `${process.env.REACT_APP_API_BASE_URL}?years=2022%2C2023`,
    )
  })

  it('should include n genres in the URL when genre.length > 1', () => {
    const props = {
      genres: ['Action', 'Drama'],
    }

    const result = buildFetchMediaEndpoint(props)

    expect(result).toBe(
      `${process.env.REACT_APP_API_BASE_URL}?genres=Action%2CDrama`,
    )
  })

  it('should include years in the URL when provided', () => {
    const props = {
      years: ['2022'],
    }

    const result = buildFetchMediaEndpoint(props)

    expect(result).toBe(`${process.env.REACT_APP_API_BASE_URL}?years=2022`)
  })

  it('should include genres in the URL when provided', () => {
    const props = {
      genres: ['Action'],
    }

    const result = buildFetchMediaEndpoint(props)

    expect(result).toBe(`${process.env.REACT_APP_API_BASE_URL}?genres=Action`)
  })

  it('should include searchText in the URL when provided', () => {
    const props = {
      searchText: 'test',
    }

    const result = buildFetchMediaEndpoint(props)

    expect(result).toBe(`${process.env.REACT_APP_API_BASE_URL}?searchText=test`)
  })

  it('should include type in the URL when provided', () => {
    const props = {
      type: 'movie',
    }

    const result = buildFetchMediaEndpoint(props)

    expect(result).toBe(`${process.env.REACT_APP_API_BASE_URL}?type=movie`)
  })

  it('should include limit in the URL when provided', () => {
    const props = {
      limit: 5,
    }

    const result = buildFetchMediaEndpoint(props)

    expect(result).toBe(`${process.env.REACT_APP_API_BASE_URL}?limit=5`)
  })

  it('should include currentPage in the URL when provided', () => {
    const props = {
      currentPage: 5,
    }

    const result = buildFetchMediaEndpoint(props)

    expect(result).toBe(`${process.env.REACT_APP_API_BASE_URL}?currentPage=5`)
  })

  it('should handle undefined values', () => {
    const props = {
      years: undefined,
      genres: undefined,
      searchText: undefined,
      type: undefined,
      limit: undefined,
      currentPage: undefined,
    }

    const result = buildFetchMediaEndpoint(props)

    expect(result).toBe(`${process.env.REACT_APP_API_BASE_URL}`)
  })
})
