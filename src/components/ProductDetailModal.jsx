import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); 

const ProductDetailModal = ({ isOpen, onRequestClose, product }) => {
    if (!product) return null;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Product Details"
            className="modal-content text-white border-2"
            overlayClassName="modal-overlay"
        >
            <div className="p-6 flex flex-col">
                <button
                    onClick={onRequestClose}
                    className="absolute top-0  right-4"
                >
                    <div class="close-container">
                        <div class="leftright"></div>
                        <div class="rightleft"></div>
                        
                    </div>
                </button>
               
                <h2 className="text-2xl font-bold mb-4 flex justify-center">{product.title}</h2>
                <div className='mt-[40px]'>
                <p className="text-lg mb-2"><strong>Price:</strong> {product.price}💰</p>
                <p className="text-lg mb-2"><strong>Popularity:</strong> {product.popularity}🔥</p>
                <p className="text-lg"><strong>Description:</strong> <p className ='gap-2'> Experience cutting-edge technology with the{product.title}.With its competitive price of {product.price}, it offers excellent value.The {product.title} has gained widespread popularity, earning a huge fanbase of {product.popularity} worldwide.</p></p>
                </div>
            </div>
        </Modal>
    );
};

export default ProductDetailModal;
