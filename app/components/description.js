const Description = ({ description }) => {
  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Description</h2>
      <p className="text-sm text-gray-300">{description}</p>
    </div>
  );
};

export default Description;