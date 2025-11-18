export default function GetStarted() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black dark:text-white mb-4">Get Started</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Begin your journey with our platform today. Follow these simple steps to get up and running.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-800">
            <div className="text-3xl font-bold text-black dark:text-white mb-4">1</div>
            <h3 className="text-xl font-semibold text-black dark:text-white mb-3">Create an Account</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Sign up for a free account to access all our features and services.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-800">
            <div className="text-3xl font-bold text-black dark:text-white mb-4">2</div>
            <h3 className="text-xl font-semibold text-black dark:text-white mb-3">Configure Your Profile</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Set up your profile and customize your preferences to suit your needs.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-800">
            <div className="text-3xl font-bold text-black dark:text-white mb-4">3</div>
            <h3 className="text-xl font-semibold text-black dark:text-white mb-3">Start Using Our Services</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Explore our features and start benefiting from our platform immediately.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied users who have already transformed their workflow with our platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/signup" 
              className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
            >
              Create Account
            </a>
            <a 
              href="/login" 
              className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}