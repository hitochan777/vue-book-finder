import axios, { AxiosInstance } from 'axios'

import { SearchService } from './search_service'
import { Book } from '../book'

export class HttpSearchService implements SearchService {
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

  private client: AxiosInstance
  constructor(
    private apiKey: string,
    endpoint: string = 'https://www.googleapis.com/books/v1/volumes',
    client?: AxiosInstance
  ) {
    this.client = client
      ? client
      : axios.create({
          baseURL: endpoint,
          timeout: 2000,
        })
  }

  public async search(query: string): Promise<Book[]> {
    const result = await this.client.get('', {
      params: { key: this.apiKey, q: query },
    })
    return HttpSearchService.convertRawData2Books(result.data)
  }
}
