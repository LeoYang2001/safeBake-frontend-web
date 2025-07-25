function ProductsPage() {
  const products = [
    {
      id: 1,
      name: "SafeBake Pro Oven",
      price: "$1,299",
      image: "Image Placeholder",
      description:
        "Professional-grade smart oven with advanced safety features and precision temperature control.",
      features: [
        "Smart Temperature Control",
        "Auto Safety Shutoff",
        "Mobile App Integration",
        "Energy Efficient",
      ],
    },
    {
      id: 2,
      name: "SafeBake Mixer Elite",
      price: "$599",
      image: "Image Placeholder",
      description:
        "Heavy-duty stand mixer with safety lock mechanism and multiple speed settings.",
      features: [
        "Safety Lock System",
        "10 Speed Settings",
        "5L Capacity",
        "Anti-Slip Base",
      ],
    },
    {
      id: 3,
      name: "SafeBake Smart Scale",
      price: "$149",
      image: "Image Placeholder",
      description:
        "Digital kitchen scale with app connectivity for precise measurements and recipe tracking.",
      features: [
        "Bluetooth Connectivity",
        "Recipe Database",
        "Nutritional Tracking",
        "Waterproof Design",
      ],
    },
    {
      id: 4,
      name: "SafeBake Bread Maker",
      price: "$299",
      image: "Image Placeholder",
      description:
        "Automated bread maker with safety sensors and customizable programs.",
      features: [
        "15 Pre-Programs",
        "Safety Sensors",
        "Gluten-Free Options",
        "Delay Timer",
      ],
    },
    {
      id: 5,
      name: "SafeBake Thermometer Pro",
      price: "$89",
      image: "Image Placeholder",
      description:
        "Wireless meat thermometer with smartphone alerts and temperature monitoring.",
      features: [
        "Wireless Range 100ft",
        "Smart Alerts",
        "Multiple Probes",
        "Magnetic Design",
      ],
    },
    {
      id: 6,
      name: "SafeBake Starter Kit",
      price: "$199",
      image: "Image Placeholder",
      description:
        "Complete baking starter kit with essential tools and safety equipment.",
      features: [
        "Heat-Resistant Gloves",
        "Digital Timer",
        "Measuring Tools",
        "Safety Guide",
      ],
    },
  ];

  const categories = [
    "All Products",
    "Ovens",
    "Mixers",
    "Accessories",
    "Starter Kits",
  ];

  return (
    <div className="py-12">
      {/* Header Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">Our Products</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our complete range of innovative baking equipment designed
            with safety and quality in mind.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">{product.image}</span>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <span className="text-2xl font-bold text-blue-600">
                      {product.price}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{product.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Key Features:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <svg
                            className="w-4 h-4 text-green-500 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                      Add to Cart
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Help Choosing?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our baking experts are here to help you find the perfect equipment
            for your needs.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Contact Our Experts
          </button>
        </div>
      </section>
    </div>
  );
}

export default ProductsPage;
