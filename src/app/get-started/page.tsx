export default function GetStarted() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 tracking-tight">
            Get Started
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Begin your journey with our platform today. Follow these simple steps to get up and running.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-elegant-gray-dark rounded-lg shadow-luxury-lg p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-luxury-xl">
            <div className="text-4xl font-bold text-black dark:text-white mb-6">1</div>
            <h3 className="text-2xl font-semibold text-black dark:text-white mb-4">Create an Account</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Sign up for a free account to access all our premium features and services.
            </p>
          </div>
          
          <div className="bg-white dark:bg-elegant-gray-dark rounded-lg shadow-luxury-lg p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-luxury-xl">
            <div className="text-4xl font-bold text-black dark:text-white mb-6">2</div>
            <h3 className="text-2xl font-semibold text-black dark:text-white mb-4">Configure Your Profile</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Set up your profile and customize your preferences to suit your needs.
            </p>
          </div>
          
          <div className="bg-white dark:bg-elegant-gray-dark rounded-lg shadow-luxury-lg p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-luxury-xl">
            <div className="text-4xl font-bold text-black dark:text-white mb-6">3</div>
            <h3 className="text-2xl font-semibold text-black dark:text-white mb-4">Start Using Our Services</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Explore our features and start benefiting from our platform immediately.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-elegant-gray-dark rounded-lg shadow-luxury-lg p-10 text-center border border-gray-200 dark:border-gray-800">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied users who have already transformed their workflow with our platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a 
              href="/signup" 
              className="px-8 py-4 text-base font-medium rounded-md text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 shadow-luxury hover:shadow-luxury-lg border border-black dark:border-white"
            >
              Create Account
            </a>
            <a 
              href="/login" 
              className="px-8 py-4 text-base font-medium rounded-md text-black dark:text-white bg-transparent hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-300 border border-gray-300 dark:border-gray-700"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}