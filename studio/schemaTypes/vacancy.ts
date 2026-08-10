import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'vacancy',
  title: 'Vacancy',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'country',
      title: 'Country of Work',
      type: 'string',
      options: {
        list: [
          {title: 'Ghana', value: 'Ghana'},
          {title: 'Canada', value: 'Canada'},
          {title: 'United States', value: 'United States'},
          {title: 'United Kingdom', value: 'United Kingdom'},
          {title: 'Germany', value: 'Germany'},
          {title: 'Serbia', value: 'Serbia'},
          {title: 'UAE', value: 'UAE'},
          {title: 'Australia', value: 'Australia'},
          {title: 'Other', value: 'Other'},
        ],
      },
    }),
    defineField({
      name: 'type',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          {title: 'Full-time', value: 'Full-time'},
          {title: 'Full-time (International Placement)', value: 'Full-time (International Placement)'},
          {title: 'Full-time Contract (2 Years)', value: 'Full-time Contract (2 Years)'},
          {title: 'Full-time (Overtime available)', value: 'Full-time (Overtime available)'},
          {title: 'Part-time', value: 'Part-time'},
          {title: 'Contract', value: 'Contract'},
          {title: 'Remote', value: 'Remote'},
          {title: 'Hybrid', value: 'Hybrid'},
        ],
      },
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'blockContent',
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'blockContent',
    }),
    defineField({
      name: 'salaryCurrency',
      title: 'Salary Currency',
      type: 'string',
      options: {
        list: [
          {title: 'GHS (Ghana Cedi)', value: 'GHS'},
          {title: 'AED (UAE Dirham)', value: 'AED'},
        ],
      },
      initialValue: 'GHS',
    }),
    defineField({
      name: 'salaryAmount',
      title: 'Salary Amount',
      description: 'Base salary figure in the selected currency (e.g. 3600). AED amounts are auto-converted to GHS on the site using the daily rate.',
      type: 'number',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'salaryPrefix',
      title: 'Salary Prefix',
      description: 'Shown inline before the figure, e.g. "From".',
      type: 'string',
    }),
    defineField({
      name: 'salarySuffix',
      title: 'Salary Suffix (sub-line)',
      description: 'Shown smaller under the salary figure, e.g. "+ Overtime", "+ Trip Allowance", "(Commission-based...)".',
      type: 'string',
    }),
    defineField({
      name: 'salary',
      title: 'Salary (legacy free-text fallback)',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'deadline',
      title: 'Application Deadline',
      type: 'date',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Open', value: 'Open'},
          {title: 'Closed', value: 'Closed'},
          {title: 'Draft', value: 'Draft'},
        ],
      },
      initialValue: 'Open',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'location'},
  },
})