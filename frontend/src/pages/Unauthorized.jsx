import React from 'react'
import { AlertCircle, ArrowLeft, LogIn } from 'lucide-react'
import { Link } from 'react-router-dom'

function Unauthorized() {
  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md shadow-lg bg-white rounded border-yellow-500 border-2 p-10">
        <div className="text-center pb-4">
          <div className="mx-auto bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mb-2">
            <AlertCircle className="h-8 w-8 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-yellow-800">Access Denied</div>
          <div className="text-yellow-700">
            You don't have permission to access this page.
          </div>
        </div>
        <div className="text-center">
          <p className="text-yellow-800">
            If you believe this is an error, please contact the administrator or try logging in with a different account.
          </p>
        </div>
        <div className="flex justify-center space-x-4 pt-4">
          <Link to='/'>
          <button
            className="flex items-center justify-center px-4 py-2 border-2 border-yellow-500 text-yellow-700 font-semibold rounded-lg transition-all duration-300 hover:bg-yellow-100 hover:scale-105 focus:ring-2 focus:ring-yellow-400"
            >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </button>
            </Link>

          {/* Log In Button */}
          <Link to='/login'>
          <button
            className="flex items-center justify-center px-4 py-2 bg-yellow-600 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-yellow-700 hover:scale-105 focus:ring-2 focus:ring-yellow-500"
            >
            <LogIn className="mr-2 h-5 w-5" />
            Log In
          </button>
            </Link>

        </div>
      </div>
    </div>
  )
}

export default Unauthorized