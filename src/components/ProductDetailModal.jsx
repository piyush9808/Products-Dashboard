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
            className="modal-content bg-zinc-300"
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
                <p className="text-lg"><strong>Description:</strong> {product.description || 'You can answer calls or messages from your iPhone directly on your Mac. Copy images, video or text from your iPhone, then paste into another app on your nearby Mac. And with iCloud, you can access your favourite files from either your iPhone or Mac.'}</p>
                </div>
            </div>
        </Modal>
    );
};

export default ProductDetailModal;
