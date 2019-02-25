import { mockData } from '../mock_books'
import { SearchService } from './search_service'
import { Book } from '../book'

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
