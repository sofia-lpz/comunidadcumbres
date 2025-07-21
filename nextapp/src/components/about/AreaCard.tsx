type Area = {
  title: string;
  description: string;
  image?: string;
};

type Props = {
  area: Area;
};

const AreaCard = ({ area }: Props) => {
  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-md transition bg-white">
      <h3 className="text-xl font-semibold mb-2">{area.title}</h3>
      <p className="text-gray-600">{area.description}</p>
      {area.image && (
        <img
          src={area.image}
          alt={area.title}
          className="mt-4 w-full h-40 object-cover rounded"
        />
      )}
    </div>
  );
};

export default AreaCard;
