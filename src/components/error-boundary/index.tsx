import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.props.onError?.(error, errorInfo)
  }

  override render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div
          style={{
            padding: '1rem',
            borderRadius: '0.25rem',
            border: '1px solid var(--ifm-color-danger)',
            backgroundColor: 'var(--ifm-color-danger-lightest)',
          }}
        >
          <h3
            style={{
              margin: '0 0 0.5rem 0',
              color: 'var(--ifm-color-danger)',
            }}
          >
            Something went wrong
          </h3>
          <p
            style={{
              margin: 0,
              color: 'var(--ifm-color-emphasis-700)',
            }}
          >
            {this.state.error?.message ?? 'An unexpected error occurred'}
          </p>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
