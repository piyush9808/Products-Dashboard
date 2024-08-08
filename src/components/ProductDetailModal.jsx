// components/ProductDetailModal.js
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // For accessibility

const ProductDetailModal = ({ isOpen, onRequestClose, product }) => {
    if (!product) return null;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Product Details"
            className="modal-content"
            overlayClassName="modal-overlay"
        >
            <div className="p-6">
            <button
                    onClick={onRequestClose}
                    className="absolute top-4 right-0 h-16 w-16 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Close
                </button>
                <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
                <p className="text-lg mb-2"><strong>Price:</strong> {product.price}💰</p>
                <p className="text-lg mb-2"><strong>Popularity:</strong> {product.popularity}🔥</p>
                <p className="text-lg"><strong>Description:</strong> {product.description ||'You can answer calls or messages from your iPhone directly on your Mac. Copy images, video or text from your iPhone, then paste into another app on your nearby Mac. And with iCloud, you can access your favourite files from either your iPhone or Mac.'}</p>
               
            </div>
        </Modal>
    );
};

export default ProductDetailModal;
