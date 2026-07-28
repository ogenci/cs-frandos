import {Component} from 'react'

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<{children: React.ReactNode}, State> {
  state: State = {hasError: false, error: null}

  static getDerivedStateFromError(error: Error) {
    return {hasError: true, error}
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-black p-8">
          <div className="max-w-md text-center">
            <h1 className="mb-4 text-2xl font-bold text-white">Something went wrong</h1>
            <p className="mb-6 text-gray-400">
              An unexpected error occurred. Please try refreshing the page.
            </p>
            <pre className="mb-6 overflow-auto rounded bg-gray-900 p-4 text-left text-sm text-red-400">
              {this.state.error?.message}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="rounded bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
