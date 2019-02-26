import deepmerge from 'deepmerge'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { HttpSearchService } from './http_search_service'
import { Book } from '../book'

const createFixture = (data: any = {}): { input: any; expected: Book[] } => ({
  input: deepmerge(
    {
      items: [
        {
          id: 'book1',
          volumeInfo: {
            title: 'superhero',
            authors: ['author1', 'author2'],
            publisher: 'abc publisher',
            imageLinks: {
              thumbnail: 'https://link.to.thumbnail',
            },
            infoLink: 'https://link.to.infolink',
          },
        },
      ],
    },
    data
  ),
  expected: [
    {
      id: 'book1',
      title: 'superhero',
      authors: ['author1', 'author2'],
      publisher: 'abc publisher',
      thumbnail: 'https://link.to.thumbnail',
      infoLink: 'https://link.to.infolink',
    },
  ],
})

describe('convertRawData2Books', () => {
  it('outputs empty array when the give data is empty', () => {
    const input = { items: [] }
    expect(HttpSearchService.convertRawData2Books(input)).toEqual([])
  })

  it('parses fully filled data', () => {
    const { input, expected } = createFixture()
    expect(HttpSearchService.convertRawData2Books(input)).toEqual(expected)
  })

  it('works even when imageLinks and infoLink are undefined in the raw data', () => {
    let { input, expected } = createFixture()
    delete input.items[0].volumeInfo.imageLinks
    delete input.items[0].volumeInfo.publisher
    delete expected[0].thumbnail
    delete expected[0].publisher
    expect(HttpSearchService.convertRawData2Books(input)).toEqual(expected)
  })
})

describe('search', () => {
  const client = axios.create()
  const mock = new MockAdapter(client)
  mock.onGet('').reply(200, createFixture().input)

  it('retuns array of books', async () => {
    const searchService = new HttpSearchService('API KEY', 'ENDPOINT', client)
    const book = await searchService.search('query')
    expect(book).toEqual(createFixture().expected)
  })
})
