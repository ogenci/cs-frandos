import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'aedToGhsRate',
      title: 'AED → GHS Exchange Rate',
      description: 'Used for 24h to convert AED salaries to GHS. Refreshed automatically daily at 12:00 UTC.',
      type: 'number',
      validation: (rule) => rule.positive().precision(6),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Rate Updated At',
      type: 'datetime',
      options: {dateFormat: 'YYYY-MM-DD', timeFormat: 'HH:mm'},
    }),
    defineField({
      name: 'rateSource',
      title: 'Rate Source',
      type: 'string',
    }),
  ],
  preview: {
    select: {rate: 'aedToGhsRate', updated: 'updatedAt'},
    prepare: ({rate, updated}) => ({
      title: rate ? `AED → GHS ${rate}` : 'AED → GHS (not set)',
      subtitle: updated ? `Updated ${updated}` : 'No rate yet',
    }),
  },
})