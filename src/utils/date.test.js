import { formatDate } from './date';

describe('date.utils', () => {
    it('should format date proeprty 1', () => {
        expect(formatDate('2016-01-24T12:59:34Z')).toBe('Jan 24, 2016')
    })
})
