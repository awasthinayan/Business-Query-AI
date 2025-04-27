import { useState, useEffect } from 'react';

function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user details from localStorage (or from backend later)
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <p className="text-2xl font-semibold text-gray-700">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-400 to-blue-500 flex flex-col items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-teal-600 mb-4">Profile Details</h1>

        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-teal-100 flex items-center justify-center text-4xl font-bold text-teal-600">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div className="text-gray-700 text-lg">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        </div>

        <button
          className="mt-8 bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600 transition"
          onClick={() => {
            localStorage.removeItem('user');
            window.location.href = '/auth';
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
