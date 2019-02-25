import { Book } from '../book'

export interface SearchService {
  search: (query: string) => Promise<Book[]>
}
