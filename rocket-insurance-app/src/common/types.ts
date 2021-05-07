export interface IProps {
    onQuoteReceived(newQuote: quote): void,
    quote?: quote
}

export type quote = Record<string, any>