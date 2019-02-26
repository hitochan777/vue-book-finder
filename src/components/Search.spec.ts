import { shallowMount, mount, MountOptions } from '@vue/test-utils'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import Search from './Search.vue'
import { MockSearchService } from '../service/mock_search_service'
import { HttpSearchService } from '@/service/http_search_service'

const options: MountOptions<Search> = {
  provide: {
    searchService: new MockSearchService(),
  },
}
describe('search with internet connection', () => {
  it('renders searching... when waiting for the query response', async () => {
    const wrapper = shallowMount(Search, options)
    const done = (wrapper.vm as any).search('query')
    expect(wrapper.html()).toContain('Searching...')
    await done
  })

  it('renders searching... when waiting for the query response', async () => {
    const wrapper = shallowMount(Search, options)
    await (wrapper.vm as any).search('query')
    expect((wrapper.vm as any).books.length).toBe(10)
  })

  it('does not send query request when the button is clicked, if the inputbox is empty', async () => {
    const wrapper = shallowMount(Search, options)
    const done = (wrapper.vm as any).search('')
    expect(wrapper.html()).not.toContain('Searching...')
    expect(wrapper.find('.error').exists()).toBe(true)
    expect(wrapper.find('.error').text()).toContain(
      'You need to type something to query!'
    )
    await done
  })
})

describe('search without internet connection', () => {
  it('shows `There was some error during the query`', async () => {
    const client = axios.create()
    const mock = new MockAdapter(client)
    mock.onGet('').networkError()
    const wrapper = shallowMount(Search, {
      provide: {
        searchService: new HttpSearchService('API KEY', 'ENDPOINT', client),
      },
    })
    await (wrapper.vm as any).search('query')
    expect(wrapper.find('.error').exists()).toBe(true)
    expect(wrapper.find('.error').text()).toContain(
      'There was some error during the query'
    )
  })
})
