import axios, { AxiosInstance } from 'axios'

import { Book } from '../book'
import { mockData } from '../mock_books'

export interface SearchService {
  search: (query: string) => Promise<Book[]>
}

export class HttpSearchService implements SearchService {
  private client: AxiosInstance
  constructor(
    private apiKey: string,
    endpoint: string = 'https://www.googleapis.com/books/v1/volumes'
  ) {
    this.client = axios.create({
      baseURL: endpoint,
      timeout: 2000,
    })
  }

  public async search(query: string): Promise<Book[]> {
    const result = await this.client.get('', {
      params: { key: this.apiKey, q: query },
    })
    console.log(result)
    return HttpSearchService.convertRawData2Books(result.data)
  }

  public static convertRawData2Books(rawData: any): Book[] {
    return rawData.items.map((item: any) => {
      return {
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        publisher: item.volumeInfo.publisher,
        thumbnail:
          item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail,
        infoLink: item.volumeInfo.infoLink,
      }
    })
  }
}

export class MockSearchService implements SearchService {
  public async search(query: string): Promise<Book[]> {
    await new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })
    const books = await Promise.resolve(mockData)
    // return books.filter(book => book.title.includes(query))
    return books
  }
}
