import React, { useState } from "react";

const products = [
    { id: 1, name: "Продукт 1", category: "Категория 1", price: 10, available: true },
    { id: 2, name: "Продукт 2", category: "Категория 2", price: 20, available: false },
    { id: 3, name: "Продукт 3", category: "Категория 1", price: 15, available: true },
    { id: 4, name: "Продукт 4", category: "Категория 2", price: 25, available: true },
    { id: 5, name: "Продукт 5", category: "Категория 1", price: 12, available: false },
];

export default function ProductTable() {
    const [searchTerm, setSearchTerm] = useState("");
    const [showAvailableOnly, setShowAvailableOnly] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCheckboxChange = () => {
        setShowAvailableOnly(!showAvailableOnly);
    };

    const handleAddToCart = (product) => {
        setCartItems([...cartItems, product]);
    };

    const filteredProducts = products.filter((product) => {
        const productName = product.name.toLowerCase();
        const search = searchTerm.toLocaleLowerCase();
        return (
            productName.includes(search) &&
            (!showAvailableOnly || product.available)
        );
    });

    const total = cartItems.reduce((acc, item) => acc + item.price, 0);

    function Cart({ items, total }) {

        return (
            <div>
                <h2>Количка</h2>
                <ul>
                    {items.map((item) => (
                        <li key={item.id}>
                            {item.name} - {item.price}
                        </li>
                    ))}
                </ul>
                <p>Обща цена: {total}</p>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row mt-2 mb-2">
                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Търси по име на продукт"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="col">
                    <label>
                        <input
                            type="checkbox"
                            checked={showAvailableOnly}
                            onChange={handleCheckboxChange}
                        />
                        Само налични продукти
                    </label>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Име на продукта</th>
                                <th>Категория</th>
                                <th>Цена</th>
                                <th>Наличност</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product, index) => (
                                <tr>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>{product.price}</td>
                                    <td>{product.available ? "Да" : "Не"}</td>
                                    <td>
                                        <button onClick={() => handleAddToCart(product)}>
                                            Добави към количката
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Cart items={cartItems} total={total} />
        </div>
    );
}