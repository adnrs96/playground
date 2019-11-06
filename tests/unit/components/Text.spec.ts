import Text from '@/components/Text.vue'
import { mount, Wrapper } from '@vue/test-utils'

describe('Text.vue', () => {
  describe('should handle h1 to h2', () => {
    let h1: Wrapper<Text>
    let h2: Wrapper<Text>

    beforeAll(() => {
      h1 = mount(Text, { propsData: { head: '1' } })
      h2 = mount(Text, { propsData: { head: '2' } })
    })

    afterAll(() => {
      h1.destroy()
      h2.destroy()
    })

    it('should contains proper tags', () => {
      expect(h1.contains('h1')).toBeTruthy()
      expect(h2.contains('h2')).toBeTruthy()
    })

    it('should contains proper font sizes', () => {
      expect(h1.classes('text-5xl')).toBeTruthy()
      expect(h2.classes('text-2xl')).toBeTruthy()
    })

    it('should contains proper line height', () => {
      expect(h1.classes('leading-normal')).toBeTruthy()
      expect(h2.classes('leading-normal')).toBeTruthy()
    })
  })

  describe('should handle p1 to p6', () => {
    let p1: Wrapper<Text>
    let p2: Wrapper<Text>
    let p2Medium: Wrapper<Text>
    let p3: Wrapper<Text>
    let p4: Wrapper<Text>
    let p5: Wrapper<Text>
    let p6: Wrapper<Text>

    beforeAll(() => {
      p1 = mount(Text, { propsData: { p: '1' } })
      p2 = mount(Text, { propsData: { p: '2' } })
      p2Medium = mount(Text, { propsData: { p: '2', weight: 'medium' } })
      p3 = mount(Text, { propsData: { p: '3' } })
      p4 = mount(Text, { propsData: { p: '4' } })
      p5 = mount(Text, { propsData: { p: '5' } })
      p6 = mount(Text, { propsData: { p: '6' } })
    })

    afterAll(() => {
      p1.destroy()
      p2.destroy()
      p2Medium.destroy()
      p3.destroy()
      p4.destroy()
      p5.destroy()
      p6.destroy()
    })

    it('should contains proper tags', () => {
      expect(p1.contains('p')).toBeTruthy()
      expect(p2.contains('p')).toBeTruthy()
      expect(p3.contains('p')).toBeTruthy()
      expect(p4.contains('p')).toBeTruthy()
      expect(p5.contains('p')).toBeTruthy()
      expect(p6.contains('p')).toBeTruthy()
    })

    it('should contains proper font sizes', () => {
      expect(p1.classes('text-lg')).toBeTruthy()
      expect(p2.classes('text-base')).toBeTruthy()
      expect(p3.classes('text-sm')).toBeTruthy()
      expect(p4.classes('text-xs')).toBeTruthy()
      expect(p5.classes('text-xs')).toBeTruthy()
      expect(p6.classes('text-xs')).toBeTruthy()
    })

    it('should contains proper line height', () => {
      expect(p1.classes('leading-normal')).toBeTruthy()
      expect(p2.classes('leading-normal')).toBeTruthy()
      expect(p2Medium.classes('leading-normal')).toBeTruthy()
      expect(p3.classes('leading-normal')).toBeTruthy()
      expect(p4.classes('leading-normal')).toBeTruthy()
      expect(p5.classes('leading-normal')).toBeTruthy()
      expect(p6.classes('leading-normal')).toBeTruthy()
    })
  })

  it('should have the good font-weight', () => {
    const regular = mount(Text, { propsData: { weight: 'regular' } })
    const bold = mount(Text, { propsData: { weight: 'bold' } })
    const semibold = mount(Text, { propsData: { weight: 'semibold' } })
    const medium = mount(Text, { propsData: { weight: 'medium' } })

    expect(regular.classes('font-normal')).toBeTruthy()
    expect(bold.classes('font-bold')).toBeTruthy()
    expect(semibold.classes('font-semibold')).toBeTruthy()
    expect(medium.classes('font-medium')).toBeTruthy()

    regular.destroy()
    bold.destroy()
    semibold.destroy()
    medium.destroy()
  })
})
