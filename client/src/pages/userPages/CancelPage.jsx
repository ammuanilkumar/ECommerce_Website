export const CancelPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-red-600">Payment Canceled</h1>
        <p className="mt-4 text-gray-600">Your payment has been canceled. You can return to the cart and try again.</p>
      </div>
    </div>
  );
};
