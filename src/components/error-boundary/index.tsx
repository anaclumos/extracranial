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
    console.error('ErrorBoundary caught an error:', error, errorInfo)
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
            border: '1px solid var(--ifm-color-danger)',
            borderRadius: '4px',
            backgroundColor: 'var(--ifm-color-danger-contrast-background)',
          }}
        >
          <h3
            style={{ color: 'var(--ifm-color-danger)', margin: '0 0 0.5rem 0' }}
          >
            Something went wrong
          </h3>
          <p style={{ margin: 0, color: 'var(--ifm-color-content-secondary)' }}>
            {this.state.error?.message ?? 'An unexpected error occurred'}
          </p>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
