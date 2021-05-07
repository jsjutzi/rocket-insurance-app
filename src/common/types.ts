export interface IRatingsInfoProps {
    onQuoteRequested(newQuote: quote): void,
    isFetching: boolean
}

export interface IQuotePageProps {
    onQuoteUpdated(newQuote: quote): void,
    quote: quote,
    isFetching: boolean
}

export type quote = Record<string, any>