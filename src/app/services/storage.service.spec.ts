import { TestBed } from '@angular/core/testing'
import { StorageService } from './storage.service'

describe('StorageService', () => {
  let service: StorageService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.get(StorageService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('#isToolOpen should work as expected', () => {
    const toolId = 'hn9h48hv9wveubhowebf'
    expect(service.isToolOpen(toolId)).toBe(false)

    service.tools[toolId] = { meta: { watching: true }}
    expect(service.isToolOpen(toolId)).toBe(true)
  })
})
