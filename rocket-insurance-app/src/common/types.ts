export interface IRatingsInfoProps {
    onQuoteRequested(newQuote: quote): void,
}

export interface IQuotePageProps {
    onQuoteUpdated(newQuote: quote): void,
    quote: quote
}

export type quote = Record<string, any>