import sanityClient from '@sanity/client'

export const client = sanityClient({
    projectId: '6zbb4gqv',
    dataset: 'production',
    apiVersion: '2021-03-25',
    token: 'skcQiAcGv9U3TuPPDBhuT7yVtQQNTGkrgQa7IWa6LfaE0nDhYINO5Ap8kLdC3nYk6ZIc8v2yVeDQWKCWfnqVwRQisAofWKQSJqb3LjSivphmHigTwnP54kZN0UYavQ3cnywepmCw74sKwB6oh93biFB1RUs1F56vgKPpBHdweMLWwv9cevJz',
    useCdn: false,
    ignoreBrowserTokenWarning: true,
})